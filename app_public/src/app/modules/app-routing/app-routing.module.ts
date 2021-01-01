import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { OverviewComponent } from "../../shared/components/overview/overview.component";
import { GraphsComponent } from "../../shared/components/graphs/graphs.component";
import { AnalysisComponent } from "../../shared/components/analysis/analysis.component";

import { LoginComponent } from "../../shared/components/login/login.component";
import { SignupComponent } from "../../shared/components/signup/signup.component";
import { FirstPageComponent } from "../../shared/components/first-page/first-page.component";
import { GroupsMainComponent } from "../../shared/components/groups/groups-main/groups-main.component";
import { ProfileComponent } from "../../shared/components/profile/profile.component";
import { SettingsComponent } from "../../shared/components/settings/settings.component";
import { AddExpensesComponent } from "../../shared/components/add-expenses/add-expenses.component";
import { SearchComponent } from "src/app/shared/components/search/search-main/search.component";
import { DbImportDropComponent } from "../../shared/components/db-import-drop/db-import-drop.component";
import { AuthGuard } from "./auth-guard";

const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "first-page",
    },
    {
        path: "first-page",
        component: FirstPageComponent,
    },
    {
        path: "login",
        component: LoginComponent,
    },
    {
        path: "signup",
        component: SignupComponent,
    },
    {
        path: "db",
        component: DbImportDropComponent,
    },
    {
        path: "overview",
        component: OverviewComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "graphs",
        component: GraphsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "analysis",
        component: AnalysisComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "search",
        component: SearchComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "groups",
        component: GroupsMainComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "profile",
        component: ProfileComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "settings",
        component: SettingsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "add_expenses",
        component: AddExpensesComponent,
        canActivate: [AuthGuard],
    },

    // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forRoot(routes, { enableTracing: false })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
