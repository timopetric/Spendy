import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { HtmlBreakLinesPipe } from "./shared/pipes/html-break-lines.pipe";
import { FirstPageComponent } from "./shared/components/first-page/first-page.component";
import { ChartsModule } from "ng2-charts";
import { FrameComponent } from "./shared/components/frame/frame.component";
import { NavbarMainComponent } from "./shared/components/navbars/navbar-main/navbar-main.component";
import { NavbarLoginSignupComponent } from "./shared/components/navbars/navbar-login-signup/navbar-login-signup.component";
import { NavbarAvatarAndChooseGroupComponent } from "./shared/components/navbars/navbar-avatar-and-choose-group/navbar-avatar-and-choose-group.component";
import { HomepageComponent } from "./shared/components/homepage/homepage.component";
import { FirstPageNavbarComponent } from "./shared/components/navbars/navbar-first-page/navbar-first-page.component";
import { OverviewComponent } from "./shared/components/overview/overview.component";
import { GraphsComponent } from "./shared/components/graphs/graphs.component";
import { AnalysisComponent } from "./shared/components/analysis/analysis.component";
import { SearchComponent } from "./shared/components/search/search.component";
import { GroupsComponent } from "./shared/components/groups/groups.component";
import { LoginComponent } from "./shared/components/login/login.component";
import { SignupComponent } from "./shared/components/signup/signup.component";

@NgModule({
    declarations: [
        HtmlBreakLinesPipe,
        FirstPageComponent,
        FirstPageNavbarComponent,
        FrameComponent,
        NavbarMainComponent,
        NavbarLoginSignupComponent,
        NavbarAvatarAndChooseGroupComponent,
        HomepageComponent,
        OverviewComponent,
        GraphsComponent,
        AnalysisComponent,
        SearchComponent,
        GroupsComponent,
        LoginComponent,
        SignupComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ChartsModule,
        RouterModule.forRoot([
            {
                path: "",
                pathMatch: "full",
                redirectTo: "overview",
            },
            {
                path: "overview",
                component: OverviewComponent,
            },
            {
                path: "graphs",
                component: GraphsComponent,
            },
            {
                path: "analysis",
                component: AnalysisComponent,
            },
            {
                path: "search",
                component: SearchComponent,
            },
            {
                path: "groups",
                component: GroupsComponent,
            },
            {
                path: "first-page",
                component: FirstPageComponent,
            },
            {
                path: "profile",
                component: OverviewComponent,
            },
            {
                path: "settings",
                component: OverviewComponent,
            },
            {
                path: "login",
                component: LoginComponent,
            },
            {
                path: "signup",
                component: SignupComponent,
            },
        ]),
    ],
    providers: [],
    bootstrap: [FrameComponent],
})
export class AppModule {}
