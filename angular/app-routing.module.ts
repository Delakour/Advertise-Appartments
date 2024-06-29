import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddApartmentComponent } from 'src/components/add-apartment/add-apartment.component';
import { CategoriesComponent } from 'src/components/categories/categories.component';
import { CitiesComponent } from 'src/components/cities/cities.component';
import { MoreDetailsComponent } from 'src/components/more-details/more-details.component';
import { MyApartmentsComponent } from 'src/components/my-apartments/my-apartments.component';
import { PersonalDetailsComponent } from 'src/components/personal-details/personal-details.component';
import { ShowApartmentsComponent } from 'src/components/show-apartments/show-apartments.component';

const routes: Routes = [
  {path:"", component:PersonalDetailsComponent},
  {path:"showAll", component:ShowApartmentsComponent},
  {path:"addApt", component:AddApartmentComponent},
  {path:"moreDetails/:_id", component:MoreDetailsComponent},
  {path:"personalDetails", component:PersonalDetailsComponent},
  {path:"myApartments", component:MyApartmentsComponent},
  {path:"cities", component:CitiesComponent},
  {path:"categories", component:CategoriesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
