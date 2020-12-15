import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { OverviewComponent } from "../../shared/components/overview/overview.component";
import { GraphsComponent } from "../../shared/components/graphs/graphs.component";
import { AnalysisComponent } from "../../shared/components/analysis/analysis.component";
import { SearchComponent } from "../../shared/components/search/search.component";
import { LoginComponent } from "../../shared/components/login/login.component";
import { SignupComponent } from "../../shared/components/signup/signup.component";
import { FirstPageComponent } from "../../shared/components/first-page/first-page.component";
import { GroupsComponent } from "../../shared/components/groups/groups.component";
import { SettingsComponent } from "../../shared/components/settings/settings.component";

const routes: Routes = [
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
        component: SettingsComponent,
    },
    {
        path: "login",
        component: LoginComponent,
    },
    {
        path: "signup",
        component: SignupComponent,
    },

    // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forRoot(routes, { enableTracing: true })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
