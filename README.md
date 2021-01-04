# Spletno programiranje 2020/2021

Lastni projekt pri predmetu **Spletno programiranje** v študijskem letu **2020/2021**.

## 1. LP

Osnutek aplikacije in wireframe model
APLIKACIJA SPENDY:
Pozdravljeni v aplikaciji Spendy, priročni aplikaciji, ki uporabnikom omogoča, da se povežejo v različne skupine in si v njih hranijo prihodke in odhodke.
Aplikacija je posebno uporabna za družine ter podjetja, saj lahko celotna skupina preprosto doda stroške in odhodke, ki se hranijo v aplikaciji in tako prihranijo veliko
časa na koncu meseca, ko se podjetje ali družina sprašuje, kam je šel ves denar. Aplikacija omogoča, da starš svoj denar v obliki žepnine nakaže otroku. S tem svojemu profilu poveča
strošek za recimo 30 €, otrok pa tako pridobi na svojem profilu 30 € dohodka. V njuni družini oziroma njuni skupni skupini se zadeva shrani kot 30 € stroška in 30 € dohodka, torej se stanje v družini
ne spremeni. Tako torej lahko hranimo osebne prihodke in odhodke in jih poleg tega še vstavimo v ustrezno skupino, kjer potem lahko lažje spremljamo stanje skupine.
Aplikacija je zelo preprosta za uporabo. Ob registraciji uporabnik vpiše svoje podatke in tako dobi dostop do aplikacije. V okviru svojega profila lahko potem kreira skupine oziroma ga
lahko doda kdo drug v svojo skupino z uporabo unikatne identifikacije (email).
Uporabniki potem lahko preverjajo in dodajajo stroške ter prihodke, hkrati pa jim zunanji vir omogoča nastavitev mej za opomnik za nakup delnic oziroma kriptovalut, v katere bi lahko
potem uporabnik investiral svoje prihranke, ki mu jih je aplikacija pomagala izboljšati!

## Prijava in registracija uporabnika

### [Prva stran](/public/first_page.html)

Vstopna stran, kjer uporabnik izve osnovne informacije o strani. Na dnu strani je povezava na prijavno stran.

[![alt text](/docs/first_page.png "Pregled")](#prva-stran)

### [Prijavna stran](public/login.html)

Stran za prijavit v sistem. V primeru, da uporabnik še nima svojega računa, lahko pritisne na gumb **Registrcija**, ki ga bo peljal na registrcijo.
Ko uporabnik vnese epoštni naslov, ter geslo se spritiskom na gumb premakne na pregledno ploščo spletene strani.

[![alt text](/docs/login.png "Prijava")](#prijavna-stran)

---

### [Registracija](public/signup.html)

Stran kjer se uporabnik lahko registrira v sistem. Za registracijo mora bodoči uporabnik vpisati svoje podatke:

-   Ime
-   Priimek
-   Epoštni naslov
-   Geslo(dvakrat, da ne pride do napake, če bi se uporanik pri pisanju tega zmotil)

Iz te strani je možno priti še na prvo stran spletne aplikacije, ter nazaj na prijavo.

[![alt text](/docs/registration.png "Registracija")](#registracija)

## Pregled in urejanje profila

### [Profil](public/profil.html)

Na profilu, lahko uporabnik pregleda svoje podatke, kot so Ime, Priimek, številko svojega telefona ter email naslov, če pa mu kaj ne ustreza te lahko spremeni s pritiskom na gumb **Nastavitve**.
Poleg tega, lahko spremeni sliko svojega avatarja s pritiskom nanj, nato pa naloži sliko iz svojega diska, ter lahko vidi še v koliko skupinah je. Iz te strani je možno priti na skupine, stroške, analizo, grafe, ter pregled.

[![alt text](/docs/profil.png "Profil")](#profil)

---

### [Nastavitve](public/settings.html)

Na strani **nastavitve** lahko uporabnik spreminja svoje podatke, ter tako kot pri profilu tudi tukaj lahko spremeni sliko svojega avatarja. Podatki ki jih lahko spremeni so:

-   Ime
-   Priimek
-   Telefon
-   Email
-   Geslo(tega mora vpisati dvakrat, da ne pride do napake, če bi se uporanik pri pisanju tega zmotil)

Od tu se uporabnik lahko premakne na skupine, stroške, analizo, grafe, pregled, ter nazaj na podatke svojega profila.

[![alt text](/docs/settings.png "Nastavitve")](#nastavitve)

## Seznam in kreiranje skupine

### [Skupine](public/groups.html)

Na strani **Skupin** lahko uporabnik pregleda seznam svojih skupin, ter že obstoječim doda novega člana s pritiskom na skupino, ter gumbom **Dodaj člana**,
nakar se mu odpre modalno okno z možnostjo dodajanja člana z njegovim uporabniškim imenom.
Poleg tega, lahko uporabnik tu ustvari skupino. To naredi z gumbom v spodnjem desnem kotu,
nakar se mu odpre modalno okno, kjer vpiše ime skupine, limit, ter člane. S kreiranjem tudi avtomatsko postane njen administrator, torej ima vse pravice do novo ustvarjene skupine.
Iz te strani se je možno prestaviti na profil, skupine, stroške, analizo, grafe, ter na pregledno stran svojega profila.
Od tu pa se lahko tudi odjavi.

[![alt text](/docs/skupine.png "Skupine")](#skupine)

---

### [Grafično](/public/graphs.html)

na tej strani lahko uporabnik preveri svoje odhodke in prihodke še v grafični obliki. Preprosto z nastavljanjem datumov
Od in Do doseže željen časovni razpon, v katerem so grafi prikazani. Med drugimi vidi graf PORABE, PRIHODKOV ter tudi tortni diagaram porabe/prihodkov.

[![alt text](/docs/graficno.png "Grafično")](#grafično)

---

### [Analiza](/public/analysis.html)

Analiza vsebuje tudi povezave na zunanji API (bitcoin, ehterium in nashdaq cene skozi čas).
Podobno kot pri grafih, lahko tudi pri analizi uporabnik nastavi časovni razpon z uporabo dveh datumskih izborov Od in Do. Uporabniku se nato prikažejo OPOMNIKI za možne investicije.
Uporabnik lahko nastavi Bitcoin mejo, pri kateri bi aplikacija ob primeru padca cene na nastavljeno mejo opozori na njegovo možnost investiranja svojih prihrankov v željena področja.
Poleg tega se uporabniku na podlagi trendov njegovega zapravljanja in prihodkov prikaže predikcija, ki je/bo realizirana na back-endu aplikacije. Prikaže se tudi skupni graf stroškov in dohodkov
ter ustrezni grafi za ceno Bitcoina, Etheriuma ter Nashdaqovih delnic skozi čas.

[![alt text](/docs/analiza.png "Analiza")](#analiza)

---

### [Dodajanje stroškov/prihodkov](/public/add_expenses.html)

Na tej strani lahko uporabnik doda bodisi stroške bodisi prihodke. Ko je preusmerjen na stran lahko na dolgem gumbu najprej označi, ali bo vpisal Odhodek ali Prihodek z pritiskom na gumb.
Nato označi vrednost tega prihodka oziroma odhodka. Označi še datum veljave. Nato izbere kategorijo, v katero sodi določen strošek oziroma odhodek (izbira lahko med različnimi, na primer za odhodek Avto ter za prihodek Plača). IMPORTANT: V primeru, da kategorija
še ne obstaja, je uporabniku (s pomočjo javaScripta, kasneje) omogočeno, da kategorijo preprosto doda med druge in jo lahko drugič izbere. Kategorija se doda šele, ko uporabnik shrani prihodek/odhodek. Kategorija se bo tudi izbrisala, če v njej ne bo nobenega vnosa (oziroma bo ta izbrisan).
Uporabnik tudi označi, v katero skupino naj se strošek vpiše. Če na primer strošek dodamo v družino Kovač, bodo ta strošek videli vsi člani družine Kovač. Uporabnik lahko na kratko tudi opiše dohodek/strošek v temu namenjenemu vnosnemu polju.
Na koncu lahko še označi, ali gre za mesečni strošek/dohodek in potrdi svoj vpis z gumbom na shrani. Important: vsa okna morajo biti obvezno izpolnjena!

[![alt text](/docs/dodajanje_stroskov.png "Dodajanje stroskov/prihodkov")](#dodajanje-stroškovprihodkov)

---

### [Prikaz štroškov/prihodkov in urejenje](/public/search.html)

Na tej strani lahko uporabnik pregleda odhodke in prihodke po njih išče in jih ureja.
Prikaz elementov lahko tudi sortira, ali pa prikazuje samo dnevne, tednenske ali mesečne aktivnosti. Posamezne elemente lahko ureja tako, da klikne na posamezen element kjer se mu prikaže modalno okno v katerem lahko element uredi ali izbriše. Gumb spodaj pa pelje na stran, kjer lahko uporabnik dodaja nove aktivnosti.

[![alt text](/docs/stroski.png "Prikaz štroškov/prihodkov in urejenje")](#prikaz-štroškovprihodkov-in-urejenje)

---

### [Pregled](/public/index.html)

Ta stran omogoča osnovni pregled nad aplikacijo. Torej kako gre trenutno uporabniku z varčevanjem oz zapravljanjem. Vidi se tudi Stanje na računu, zapravljen denar, tedenski budget. Ob strani so vidne tudi zadnje dejavnosti, ki jih je uporabnik zabeležil v aplikaciji. Na grafu pa je prikazan mesecni odhodek/prihodek.

[![alt text](/docs/pregled.png "Pregled")](#pregled)

---

## 2. LP

Dinamična spletna aplikacija z logiko na strani strežnika

Vsa dovoljena uporabniška vnosna polja:
Na strani /add_expenses je dovoljeno vnašanje:

-   Iizbira odhodek/dohodek z checkboxom (spreminjamo s pritiskom na gumb)
-   Vrednost v € (vnese se pozitivna vrednost zaokrožena na cente. Min je 0, maksimuma ni)
-   Datum (izberemo veljaven datum, dd-mm-yyyy)
-   Kategorija (izberemo eno od predefiniranih kategorij)
-   Skupina (izberemo eno izmed skupin, v katerih je trenutno prijavljeni uporabnik)
-   Kratek opis (vnesemo opis. Število znakov ni omejeno. Lahko številke in črke ter znaki)

Na strani /login
-Epoštni naslov (vnesemo veljaven epoštni naslov oblike zzzz@zzz.zzz, dovoljeni le veljavni emaili)
-Geslo (Vnesemo uporabniško geslo. Katerikoli znak, dolžina poljubna);

Na strani /signup

-   Ime (Vnesemo ime, poljubna dolžina zgolj črke)
-   Priimek (Vnesemo priimek, poljubna dolžina zgolj črke)
-   Epošta (veljaven Epoštni naslov, kot nekaj vrstic gor)
-   Uporabniško ime (Vnesemo username, poljubna dolžina poljubni znaki)
-   Geslo (Vnesemo geslo, poljubna dolžina poljubni znaki)
-   Ponovitev gesla (isto kot zgoraj)

Na strani /settings

-   Ime (Vnesemo ime, kot pri registraciji)
-   Priimek (Vnesemo priimek, kot pri registraciji)
-   Email (Vnesemo veljaven Email, kot pri registraciji )
-   Geslo (Vnesemo geslo, kot pri registraciji)
-   Ponovite geslo (Vnesemo geslo identicno prejsnjemu)
-   Limit (nastavimo limit v evrih, pozitivni število, poljubno veliko)

DELOVANJE APLIKACIJE NA TREH NAPRAVAH:
-Naša aplikacija deluje na osebnih računalnikih, tabličnih računalnikih (iPad air 4) ter telefonih(Galaxy s7).

UPORABA DODATNE KNJIŽNICE
Uporabili smo swagger-ui-express, ki nam je omogočal dokumentacijo apija, s tem smo dobili lažji pregled in razumevanje našega apija.
Z njim pa smo lahko tudi testirali api klice, in tako preverjali njihovo delovanje.

## 3. LP

Dinamična spletna aplikacija s podatkovno bazo

NAVODILA ZA NAMESTITEV IN ZAGON == glej točko LP4

## 4. LP

SPA aplikacija na eni strani

POVEZAVA NA HEROKU: [Delujoča povezava na Heroku](https://sp-spendy.herokuapp.com/login)

```bash
# Move to ./app_public, build angular app with one of the following:

# 1.) build production version for heroku (uses mongo atlas db - hosted online)
npm run build-heroku
# 2.) build production version for docker (uses local mongo db - run in docker)
npm run build-docker

# After building move to the project root and start docker compose:
docker-compose up --build

# If you want to stop docker containers use ctrl+c

# To remove the containers use:
docker-compose down
```

```bash
#to test you must have selenium docker:
docker run -d -p 4445:4444 --shm-size=2g selenium/standalone-chrome-debug
# if you have selenium docker you can run:
npm test
```
[comment]: <> (1. docker-compose up --no-start)

[comment]: <> (2. docker start sp-spendy-mongodb)

-poskrbeti moramo, da se prenesejo vse odvisnosti definirane v package.json.

1. premaknemo se v mapo, kjer se nahaja naš projekt in poženemo: npm install
2. npm start za zagon aplikacije (če imamo lahko tudi z nodemon)
   [Delujoča povezava na Heroku](https://sp-spendy.herokuapp.com/login)
   

## 5. LP

Varnostno zaščitena progresivna aplikacija

V aplikaciji imamo 3 vrste uporabnikov:
1. gost: gost ima zelo omejen dostop. Na voljo ima samo strani Prijava in Registracija, dostopati pa ne more do nobenih podatkov
2. prijavljen uporabnik: prijavljen uporabnik lahko dostopa do vseh svojih podatkov (skupine, expensi, kategorije skupin)....Izjema je le BRISANJE in DODAJANJE skupin.
3. prijavljen uporabnik-admin skupine: Kot admin ima dostop do vseh funkcij dodajanja, ažuriranja in brisanja v skupinah, v katerih je admin.

Argumentacija testov OWASP ZAP PO popravkih:
Cross-Domain Misconfiguration: Vse navedene povezave niso del naše aplikacije temveč so fonti
in zunanji apiji.

Cookie Without Secure Flag:
Tudi tu je povezava zunanji font, s katero naša aplikacija ni bolj ranljiva.

Cross Site Scripting Weakness (Reflected in JSON Response): 
S poskusom GET GROUPS {...isExpenditure: "<script>alert(1);</script>"} ne bo težav, saj naš api preveri
ali je isExpenditure boolean. Če ni, vrača napako, da vrednost ni boolean in izpiše sporočilo,
da tako vstavljanje v bazo ni mogoče, saj "<script>alert(1);</script>" ni boolean. (morda OWASP misli, da mu je uspelo)

Incomplete or No Cache-control and Pragma HTTP Header Set:
Ponovno zunanji apiji, ki naše aplikacije ne naredijo bolj ranljive.

X-Content-Type-Options Header Missing:
ponovno zunanji apiji, ne vplivajo na ranljivost.




