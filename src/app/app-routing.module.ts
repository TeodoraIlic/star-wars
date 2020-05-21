import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { AuthGuard } from './auth/auth.guard';
import { FilmsComponent } from './overview-page/films/films.component';
import { PeopleComponent } from './overview-page/people/people.component';
import { PlanetsComponent } from './overview-page/planets/planets.component';
import { SpeciesComponent } from './overview-page/species/species.component';
import { StarshipsComponent } from './overview-page/starships/starships.component';
import { VehiclesComponent } from './overview-page/vehicles/vehicles.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'overview-page', component: OverviewPageComponent, canActivate: [AuthGuard]},
  { path: 'films/:related', component: FilmsComponent, canActivate: [AuthGuard]},
  { path: 'people/:related', component: PeopleComponent, canActivate: [AuthGuard]},
  { path: 'planets/:related', component: PlanetsComponent, canActivate: [AuthGuard]},
  { path: 'species/:related', component: SpeciesComponent, canActivate: [AuthGuard]},
  { path: 'starships/:related', component: StarshipsComponent, canActivate: [AuthGuard]},
  { path: 'vehicles/:related', component: VehiclesComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
