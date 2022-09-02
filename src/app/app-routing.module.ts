import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//------- Page Component Routes --------//
import { HomeComponent } from './routes/home/home.component';
import { MentorPageComponent } from './routes/mentor-page/mentor-page.component';
import { MentorSignUpComponent } from './routes/mentor-sign-up/mentor-sign-up.component';
import { ProfileComponent } from './routes/profile/profile.component';
import { SearchComponent } from './routes/search/search.component';
import { CheckoutComponent } from './routes/checkout/checkout/checkout.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search/:careerSearch', component: SearchComponent },
  { path: 'search', component: SearchComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'mentor-sign-up', component: MentorSignUpComponent},
  { path: 'mentor-page/:mentorId', component: MentorPageComponent},
  { path: 'mentor-page', component: MentorPageComponent},
  { path: 'checkout/:mentorId/:package', component: CheckoutComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: '**', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
