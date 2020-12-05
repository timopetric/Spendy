import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

import { HtmlBreakLinesPipe } from "./shared/pipes/html-break-lines.pipe";
import { FirstPageComponent } from "./shared/components/first-page/first-page.component";
import { FirstPageNavbarComponent } from "./shared/components/first-page-navbar/first-page-navbar.component";
import { ChartsModule } from "ng2-charts";

@NgModule({
    declarations: [HtmlBreakLinesPipe, FirstPageComponent, FirstPageNavbarComponent],
    imports: [BrowserModule, BrowserAnimationsModule, ChartsModule],
    providers: [],
    bootstrap: [FirstPageComponent, FirstPageNavbarComponent],
})
export class AppModule {}
