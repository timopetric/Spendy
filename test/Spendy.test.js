/**
 * Funkcionalni testi
 */
// import { getTestBed } from "@angular/core/testing";

(async function EduGeoCache() {
    // Knjižnice
    const { exec } = require("child_process");
    const { describe, it, after, before } = require("mocha");
    const { Builder, By, until } = require("selenium-webdriver");
    const chrome = require("selenium-webdriver/chrome");
    const expect = require("chai").expect;

    require("chromedriver");
    var webdriver = require("selenium-webdriver");
    var driver = new webdriver.Builder().forBrowser("chrome").build();

    // Parametri
    let aplikacijaUrl = "https://sp-spendy.herokuapp.com/";
    // let aplikacijaUrl = "https://localhost:3000/";
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
                // .setChromeOptions(
                //     new chrome.Options()
                //         .addArguments("start-maximized")
                //         .addArguments("disable-infobars")
                //         .addArguments("allow-insecure-localhost")
                //         .addArguments("allow-running-insecure-content")
                // )
                // .usingServer(seleniumStreznikUrl)
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

        describe("Registracija novega uporabnika", function () {
            // this.timeout(30 * 1000);
            // before(async function () {
            //     await brskalnik.get(aplikacijaUrl);
            // });

            it("izbriši uporabnika iz podatkovne baze", async function () {
                // let dockerAtlasBrisiUporabnika =
                //     "docker exec -i sp-spendy-mongodb bash -c " +
                //     '"mongo ' +
                //     '\\"mongodb+srv://spendy.3mzue.mongodb.net/SpendyDB?retryWrites=true&w=majority\\" ' +
                //     "--username spendy_admin --password a0dfeVEcg4F6rYIf --eval " +
                //     "'db.Users.remove({mail: \\\"janez@kranjski.net\\\"})'" +
                //     '"';
                // exec(dockerAtlasBrisiUporabnika).on("close", (koda) => {
                //     expect(koda).to.be.equal(0);
                // });
            });
            // docker exec -i sp-spendy-mongodb bash -c mongo mongodb+srv://spendy.3mzue.mongodb.net/SpendyDB?retryWrites=true&w=majority\\ --username spendy_admin --password a0dfeVEcg4F6rYIf --eval db.Users.remove({mail: "janez@kranjski.net\\\"})

            it("prijava uporabnika", async function () {
                // let povezava = await brskalnik.findElement(By.xpath("//a[contains(text(), 'Prijava')]"));
                let povezava = await brskalnik.findElement(
                    By.xpath("/html/body/app-frame/app-first-page/main/div/div[6]/a/img")
                );
                expect(povezava).to.not.be.empty;
                await povezava.click();
            });

            it("izbira registracije", async function () {
                await pocakajStranNalozena(brskalnik, 10, "//h1");
                // let povezava = await brskalnik.findElement(By.xpath("//a[contains(text(), 'registrirajte')]"));
                let povezava = await brskalnik.findElement(By.xpath('//*[@id="forma"]/a'));
                expect(povezava).to.not.be.empty;
                await povezava.click();
                // console.log(brskalnik.title());
            });

            let ime1 = "Janez";
            let priimek1 = "Kranjski";
            it("vnos podatkov uporabnika", async function () {
                await pocakajStranNalozena(brskalnik, 10, "//h1");
                let ime = await brskalnik.findElement(By.css("input[name='name']"));
                expect(ime).to.not.be.empty;
                ime.sendKeys(ime1);
                let priimek = await brskalnik.findElement(By.css("input[name='surname']"));
                expect(priimek).to.not.be.empty;
                priimek.sendKeys(priimek1);
                let email = await brskalnik.findElement(By.css("input[name='email']"));
                expect(email).to.not.be.empty;
                email.sendKeys("ime40@priimek.net");
                let geslo = await brskalnik.findElement(By.css("input[name='password']"));
                expect(geslo).to.not.be.empty;
                geslo.sendKeys("test");
                let geslo2 = await brskalnik.findElement(By.css("input[name='password1']"));
                expect(geslo).to.not.be.empty;
                geslo2.sendKeys("test");
                let gumb = await brskalnik.findElement(By.xpath("//button[contains(text(), 'Registracija')]"));
                await gumb.getText().then(function (vsebina) {
                    console.log(vsebina);
                });
                await gumb.click();
                // let gumb = await brskalnik.findElement(By.xpath("//button[contains(text(), 'Registracija')]")).click();
                // console.log(await brskalnik.findElement(By.xpath('//*[@id="registracijaGumb"]').getText()));
                // await gumb.getText().then(function (vsebina) {
                //     console.log(vsebina);
                // });
                // // await gumb.click();
                // let nekej = await brskalnik.findElement(By.xpath("//h6"));
                // await nekej.getText().then(function (vsebina) {
                //     console.log(vsebina);
                // });
            });

            it("preveri ali je uporabnik prijavljen", async function () {
                await pocakajStranNalozena(brskalnik, 10, '//*[@id="content"]/section[1]/div/div/div/h1');
                let uporabnik = await brskalnik
                    .findElement(By.xpath('//*[@id="content"]/section[1]/div/div/div/h1'))
                    .getText();
                console.log(uporabnik);
                expect(uporabnik).to.not.be.empty;
                // await uporabnik.getText().then(function (vsebina) {
                //     expect(vsebina).to.be.equal("Pozdravljeni " + ime1 + " " + priimek1);
                // });
                expect(uporabnik).to.be.equal("Pozdravljeni " + ime1 + " " + priimek1);
            });

            it("pridobi JWT žeton", async function () {
                jwtZeton = await brskalnik.executeScript(function () {
                    return localStorage.getItem("spendysp-zeton");
                });
                expect(jwtZeton).to.not.be.empty;
            });
        });

        describe("Expensi", function () {
            this.timeout(30 * 1000);

            it("premik na dodajanje", async function () {
                await pocakajStranNalozena(brskalnik, 10, '//*[@id="content"]/section[1]/div/div/div/h1');
                let gumb = await brskalnik
                    .findElement(By.xpath('//*[@id="content"]/section[3]/div/div/div[2]/div/div[2]/a[2]'))
                    .click();
            });

            it("preveri stran", async function () {
                await pocakajStranNalozena(brskalnik, 10, '//*[@id="content"]/section[1]/div/div/div/h1');
                let nekej = await brskalnik
                    .findElement(By.xpath('//*[@id="content"]/section[1]/div/div/div/h1'))
                    .getText();
                expect(nekej).to.not.be.empty;
                expect(nekej).to.be.equal("Dodaj stroške/prihodke");
            });

            let cost = 200.2;
            let date = 20122020;
            let category = "Podkupnina profesorju";
            let description = "Podkupnina za 10ko pri SP";
            context("dodaj prihodek", function () {
                it("vnosi", async function () {
                    let vnosVrednosti = await brskalnik.findElement(By.css("input[name='cost']"));
                    expect(vnosVrednosti).to.not.be.empty;
                    await vnosVrednosti.clear();
                    vnosVrednosti.sendKeys(cost);

                    let datum = await brskalnik.findElement(By.css("input[name='date']"));
                    expect(datum).to.not.be.empty;
                    datum.sendKeys(date);

                    // let tip = await brskalnik.findElement(By.css("input[name='category']"));
                    // expect(tip).to.not.be.empty;
                    // tip.sendKeys(category);

                    // let skupina = await brskalnik.findElement(By.css("input[name='group']"));
                    // expect(vnosVrednosti).to.not.be.empty;
                    // vnosVrednosti.sendKeys(cost);
                    let opis = await brskalnik.findElement(By.css("input[name='description']"));
                    expect(opis).to.not.be.empty;
                    opis.sendKeys(description);
                });

                it("pritisk na gumb shrani", async function () {
                    let gumb = await brskalnik
                        .findElement(By.xpath('//*[@id="content"]/section[2]/div/div/div/form/button'))
                        .click();
                });

                it("preglej dodajanje", function () {
                    // await setTimeout(() => {}, 1000);

                    brskalnik.wait(async function () {
                        let keks = await brskalnik.findElement(By.className("mat-simple-snackbar")).then(() => {
                            // expect(keks).to.not.be.empty;
                        });
                        expect(keks).to.not.be.empty;
                    }, 1000);
                    // await expect(keks).to.not.be.empty;
                });
            });

            // context("dodaj odhodek", function () {
            //     it("besedilo informacij o aplikaciji", async function () {
            //         let besedilo = await brskalnik.findElement(
            //             By.xpath("//div[contains(text(), 'lahko odpravite dolgčas')]")
            //         );
            //         expect(besedilo).to.not.be.empty;
            //         expect(await besedilo.getText()).to.have.string(
            //             "EduGeoCache se uporablja za " +
            //                 "iskanje zanimivih lokacij v bližini, kjer lahko " +
            //                 "odpravite dolgčas."
            //         );
            //     });
            // });
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
            // brskalnik.quit();
        });
    } catch (napaka) {
        console.log("Med testom je prišlo do napake!");
    }
})();
