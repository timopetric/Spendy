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
### [login.html](public/login.html)
Stran za prijavit v sistem. V primeru, da uporabnik še nima svojega računa, lahko pritisne na gumb **Registrcija**, ki ga bo peljal na registrcijo.
Ko uporabnik vnese epoštni naslov, ter geslo se spritiskom na gumb premakne na pregledno ploščo spletene strani.

### [signup.html](public/signup.html)
Stran kjer se uporabnik lahko registrira v sistem. Za registracijo mora bodoči uporabnik vpisati svoje podatke:

+ Ime
+ Priimek
+ Epoštni naslov
+ Geslo(dvakrat, da ne pride do napake, če bi se uporanik pri pisanju tega zmotil)

Iz te strani je možno priti še na prvo stran spletne aplikacije, ter nazaj na prijavo.

## Pregled in urejanje profila

### [profil.html](public/profil.html)
Na profilu, lahko uporabnik pregleda svoje podatke, kot so Ime, Priimek, številko svojega telefona ter email naslov, če pa mu kaj ne ustreza te lahko spremeni s pritiskom na gumb **Nastavitve**.
Poleg tega, lahko spremeni sliko svojega avatarja s pritiskom nanj, nato pa naloži sliko iz svojega diska, ter lahko vidi še v koliko skupinah je. Iz te strani je možno priti na skupine, stroške, analizo, grafe, ter pregled.

### [settings.html](public/settings.html)
Na strani **nastavitve** lahko uporabnik spreminja svoje podatke, ter tako kot pri profilu tudi tukaj lahko spremeni sliko svojega avatarja. Podatki ki jih lahko spremeni so:

+ Ime
+ Priimek
+ Telefon
+ Email
+ Geslo(tega mora vpisati dvakrat, da ne pride do napake, če bi se uporanik pri pisanju tega zmotil)

Od tu se uporabnik lahko premakne na skupine, stroške, analizo, grafe, pregled, ter nazaj na podatke svojega profila.

## Seznam in kreiranje skupine
### [groups.html](public/groups.html)
Na strani **Skupin** lahko uporabnik pregleda seznam svojih skupin, ter že obstoječim doda novega člana s pritiskom na skupino, ter gumbom **Dodaj člana**,
nakar se mu odpre modalno okno z možnostjo dodajanja člana z njegovim uporabniškim imenom.
Poleg tega, lahko uporabnik tu ustvari skupino. To naredi z gumbom v spodnjem desnem kotu,
nakar se mu odpre modalno okno, kjer vpiše ime skupine, limit, ter člane. S kreiranjem tudi avtomatsko postane njen administrator, torej ima vse pravice do novo ustvarjene skupine.
Iz te strani se je možno prestaviti na profil, skupine, stroške, analizo, grafe, ter na pregledno stran svojega profila.
Od tu pa se lahko tudi odjavi.
[![alt text](/docs/skupine.png "Skupine")](#)


[Grafično](/public/graphs.html): na tej strani lahko uporabnik preveri svoje odhodke in prihodke še v grafični obliki. Preprosto z nastavljanjem datumov
Od in Do doseže željen časovni razpon, v katerem so grafi prikazani. Med drugimi vidi graf PORABE, PRIHODKOV ter tudi tortni diagaram porabe/prihodkov.
[![alt text](/docs/graficno.png "Grafično")](#)


[Analiza](/public/analysis.html): Analiza vsebuje tudi povezave na zunanji API (bitcoin, ehterium in nashdaq cene skozi čas). 
Podobno kot pri grafih, lahko tudi pri analizi uporabnik nastavi časovni razpon z uporabo dveh datumskih izborov Od in Do. Uporabniku se nato prikažejo OPOMNIKI za možne investicije. 
Uporabnik lahko nastavi Bitcoin mejo, pri kateri bi aplikacija ob primeru padca cene na nastavljeno mejo opozori na njegovo možnost investiranja svojih prihrankov v željena področja. 
Poleg tega se uporabniku na podlagi trendov njegovega zapravljanja in prihodkov prikaže predikcija, ki je/bo realizirana na back-endu aplikacije. Prikaže se tudi skupni graf stroškov in dohodkov 
ter ustrezni grafi za ceno Bitcoina, Etheriuma ter Nashdaqovih delnic skozi čas.
[![alt text](/docs/analiza.png "Analiza")](#)


[Dodajanje štroškov/prihodkov](/public/add_expenses.html): Na tej strani lahko uporabnik doda bodisi stroške bodisi prihodke. Ko je preusmerjen na stran lahko na dolgem gumbu najprej označi, ali bo vpisal Odhodek ali Prihodek z pritiskom na gumb.
Nato označi vrednost tega prihodka oziroma odhodka. Označi še datum veljave. Nato izbere kategorijo, v katero sodi določen strošek oziroma odhodek (izbira lahko med različnimi, na primer za odhodek Avto ter za prihodek Plača). IMPORTANT: V primeru, da kategorija 
še ne obstaja, je uporabniku (s pomočjo javaScripta, kasneje) omogočeno, da kategorijo preprosto doda med druge in jo lahko drugič izbere. Kategorija se doda šele, ko uporabnik shrani prihodek/odhodek. Kategorija se bo tudi izbrisala, če v njej ne bo nobenega vnosa (oziroma bo ta izbrisan).
Uporabnik tudi označi, v katero skupino naj se strošek vpiše. Če na primer strošek dodamo v družino Kovač, bodo ta strošek videli vsi člani družine Kovač. Uporabnik lahko na kratko tudi opiše dohodek/strošek v temu namenjenemu vnosnemu polju.
Na koncu lahko še označi, ali gre za mesečni strošek/dohodek in potrdi svoj vpis z gumbom na shrani. Important: vsa okna morajo biti obvezno izpolnjena!
[![alt text](/docs/dodajanje_stroskov.png "Dodajanje stroskov/prihodkov")](#)


[Prva stran](/public/first_page.html): Vstopna stran, kjer uporabnik izve osnovne informacije o strani. Na dnu strani je povezava na prijavno stran.
[![alt text](/docs/first_page.png "Pregled")](#)


## 2. LP

Dinamična spletna aplikacija z logiko na strani strežnika


## 3. LP

Dinamična spletna aplikacija s podatkovno bazo


## 4. LP

SPA aplikacija na eni strani


## 5. LP

Varnostno zaščitena progresivna aplikacija
