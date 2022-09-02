import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//----------- Nav Bar -------------- //
import { MatToolbarModule } from '@angular/material/toolbar';

//----------- Search Bar ----------- //
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';

//---------- Button -------------- //
import {MatButtonModule} from '@angular/material/button';
import { HomeComponent } from './routes/home/home.component';
import { MainSectionComponent } from './home-page/main-section/main-section.component';
import { PopularCareersComponent } from './home-page/popular-careers/popular-careers.component';
import { AboutSectionComponent } from './home-page/about-section/about-section.component';
import { ExploreCareersComponent } from './home-page/explore-careers/explore-careers.component';
import { BottomNavigationComponent } from './home-page/bottom-navigation/bottom-navigation.component';
import { FooterComponent } from './home-page/footer/footer.component';

//-------- Toast! ------------ //
import { ToastrModule } from 'ngx-toastr';

//------- Dialog --------------//
import {MatDialogModule} from '@angular/material/dialog';

import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSortModule } from '@angular/material/sort';
import { MatRadioModule } from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './routes/search/search.component';
import { ProfileComponent } from './routes/profile/profile.component';
import { SignInComponent } from './nav-bar/sign-in/sign-in.component';
import { SignUpComponent } from './nav-bar/sign-up/sign-up.component';
import { SearchNavComponent } from './search-page/search-nav/search-nav.component';
import { MainSearchResultsComponent } from './search-page/main-search-results/main-search-results.component';
import { SearchSuggestionsComponent } from './search-page/search-suggestions/search-suggestions.component';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';

import { MentorCardsComponent } from './search-page/mentor-cards/mentor-cards.component';
import { ProfileContentComponent } from './profile-page/profile-content/profile-content.component';

import {MatTabsModule} from '@angular/material/tabs';
import { MentorSignUpComponent } from './routes/mentor-sign-up/mentor-sign-up.component';
import { MentorNavComponent } from './mentor-sign-up/mentor-nav/mentor-nav.component';
import { MentorSignUpContentComponent } from './mentor-sign-up/mentor-sign-up-content/mentor-sign-up-content.component';
import { MentorPageComponent } from './routes/mentor-page/mentor-page.component';
import { MentorPageContentComponent } from './mentor-page/mentor-page-content/mentor-page-content.component';
import { FormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import { LandingPageComponent } from './routes/landing-page/landing-page.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { HttpClientModule } from '@angular/common/http';
import { CheckoutComponent } from './routes/checkout/checkout/checkout.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    MainSectionComponent,
    PopularCareersComponent,
    AboutSectionComponent,
    ExploreCareersComponent,
    BottomNavigationComponent,
    FooterComponent,
    SearchComponent,
    ProfileComponent,
    SignInComponent,
    SignUpComponent,
    SearchNavComponent,
    MainSearchResultsComponent,
    SearchSuggestionsComponent,
    MentorCardsComponent,
    ProfileContentComponent,
    MentorSignUpComponent,
    MentorNavComponent,
    MentorSignUpContentComponent,
    MentorPageComponent,
    MentorPageContentComponent,
    LandingPageComponent,
    CheckoutComponent,
    CheckoutPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    MatDividerModule,
    MatButtonModule,
    MatDialogModule,
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatCardModule,
    MatTabsModule,
    FormsModule,
    MatMenuModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
