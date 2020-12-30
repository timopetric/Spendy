/**
 * Funkcionalni testi
 */
(async function EduGeoCache() {
    // Knjižnice
    const { exec } = require("child_process");
    const { describe, it, after, before } = require("mocha");
    const { Builder, By, until } = require("selenium-webdriver");
    const chrome = require("selenium-webdriver/chrome");
    const expect = require("chai").expect;

    // Parametri
    let aplikacijaUrl = "https://sp-spendy.herokuapp.com/";
    let seleniumStreznikUrl = "http://localhost:4445/wd/hub";
    let brskalnik, jwtZeton;

    const axios = require("axios").create({
        baseURL: aplikacijaUrl + "api/",
        timeout: 5000,
    });

    // Obvladovanje napak
    process.on("unhandledRejection", (napaka) => {
        console.log(napaka);
    });

    // Počakaj določeno število sekund na zahtevani element na strani
    let pocakajStranNalozena = async (brskalnik, casVS, xpath) => {
        await brskalnik.wait(
            () => {
                return brskalnik.findElements(By.xpath(xpath)).then((elementi) => {
                    return elementi[0];
                });
            },
            casVS * 1000,
            `Stran se ni naložila v ${casVS} s.`
        );
    };

    try {
        before(() => {
            brskalnik = new Builder()
                .forBrowser("chrome")
                .setChromeOptions(
                    new chrome.Options()
                        .addArguments("start-maximized")
                        .addArguments("disable-infobars")
                        .addArguments("allow-insecure-localhost")
                        .addArguments("allow-running-insecure-content")
                )
                .usingServer(seleniumStreznikUrl)
                .build();
        });

        describe("Začetna stran naslov", function () {
            this.timeout(30 * 1000);
            before(() => {
                brskalnik.get(aplikacijaUrl);
            });

            it("Pravilnost naslova", async () => {
                await pocakajStranNalozena(brskalnik, 60, "//h3");
                let naslov = await brskalnik.findElement(By.css("p"));

                expect(naslov).to.not.be.empty;
                await naslov.getText().then(function (vsebina) {
                    expect(vsebina).to.be.equal("Pozdravljeni na uvodni strani projekta Spendy!");
                });
            });
        });

        // describe("Informacije o aplikaciji", function () {
        //     this.timeout(30 * 1000);
        //     before(() => {
        //         brskalnik.get(aplikacijaUrl);
        //     });
        //
        //     it("izberi informacije o aplikaciji", async function () {
        //         await pocakajStranNalozena(brskalnik, 60, "//h1");
        //         let povezava = await brskalnik.findElement(
        //             By.xpath("//a[contains(text(), 'Informacije o aplikaciji')]")
        //         );
        //         expect(povezava).to.not.be.empty;
        //         await povezava.click();
        //     });
        //
        //     context("ustreznost podatkov na strani z informacijami", function () {
        //         it("naslov strani", async function () {
        //             await pocakajStranNalozena(brskalnik, 60, "//h1");
        //             let naslov = await brskalnik.findElement(By.css("h1"));
        //             expect(naslov).to.not.be.empty;
        //             await naslov.getText().then(function (vsebina) {
        //                 expect(vsebina).to.be.equal("Informacije o aplikaciji");
        //             });
        //         });
        //
        //         it("besedilo informacij o aplikaciji", async function () {
        //             let besedilo = await brskalnik.findElement(
        //                 By.xpath("//div[contains(text(), 'lahko odpravite dolgčas')]")
        //             );
        //             expect(besedilo).to.not.be.empty;
        //             expect(await besedilo.getText()).to.have.string(
        //                 "EduGeoCache se uporablja za " +
        //                     "iskanje zanimivih lokacij v bližini, kjer lahko " +
        //                     "odpravite dolgčas."
        //             );
        //         });
        //     });
        // });

        after(async () => {
            brskalnik.quit();
        });
    } catch (napaka) {
        console.log("Med testom je prišlo do napake!");
    }
})();
