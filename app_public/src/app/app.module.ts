import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HtmlBreakLinesPipe } from './html-break-lines.pipe';

@NgModule({
    declarations: [AppComponent, HtmlBreakLinesPipe],
    imports: [BrowserModule],
    providers: [],
    bootstrap: [AppComponent], // to komponento zaganjamo (mora biti izvožena (export class))
})
export class AppModule {}

// Trenutno smo aplikacijo pognali s pomočjo ukaza
// ng serve
// , ki poskrbi, da se proces generiranja Angular aplikacije
// v jezik JavaScript izvede v pomnilniku, zato JavaScript datotek ne bomo našli nikjer v mapah projekta.
// Če bi želeli generirati Angular aplikacijo v jeziku JavaScript bi uporabili ukaz
// ng build
// Za potrebe razvoja je uporaba ng serve idealna, saj se spremembe spletne strani samodejno
// naložijo ob spremembi izvorne kode.
