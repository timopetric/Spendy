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
import { AddExpensesComponent } from "./shared/components/add-expenses/add-expenses.component";
import { AppRoutingModule } from "./modules/app-routing/app-routing.module";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { MapDictToArrayPipe } from "./shared/pipes/map-dict-to-array.pipe";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SettingsComponent } from "./shared/components/settings/settings.component";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCard, MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { NgToggleModule } from "@nth-cloud/ng-toggle";

import { MatSnackBarModule } from "@angular/material/snack-bar";

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
        MapDictToArrayPipe,
        SettingsComponent,
        AddExpensesComponent,
    ],
    imports: [
        BrowserModule,
        NgToggleModule,
        BrowserAnimationsModule,
        ChartsModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatDividerModule,
        ReactiveFormsModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
    ],
    providers: [],
    bootstrap: [FrameComponent],
})
export class AppModule {}
