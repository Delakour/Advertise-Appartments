import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowApartmentsComponent } from '../components/show-apartments/show-apartments.component';
import { AddApartmentComponent } from '../components/add-apartment/add-apartment.component';
import { MoreDetailsComponent } from '../components/more-details/more-details.component';
import { NavComponent } from '../components/nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { PersonalDetailsComponent } from '../components/personal-details/personal-details.component';
import { MyApartmentsComponent } from '../components/my-apartments/my-apartments.component';
import { CitiesComponent } from '../components/cities/cities.component';
import { CategoriesComponent } from '../components/categories/categories.component';


@NgModule({
  declarations: [
    AppComponent,
    ShowApartmentsComponent,
    AddApartmentComponent,
    MoreDetailsComponent,
    NavComponent,
    PersonalDetailsComponent,
    MyApartmentsComponent,
    CitiesComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // כדי להשתמש במעבר דו כיווני 
    //FormsModule יש להוסיף את המודל
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
