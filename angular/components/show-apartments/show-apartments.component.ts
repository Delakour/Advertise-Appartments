import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { ApartmentsService } from 'src/service/apartments.service';
import { AdvertiserService } from 'src/service/advertiser.service';
import { CategoryService } from 'src/service/category.service';
import { CityService } from 'src/service/city.service';
import { CustomerService } from 'src/service/customer.service';

@Component({
  selector: 'app-show-apartments',
  templateUrl: './show-apartments.component.html',
  styleUrls: ['./show-apartments.component.css']
})
export class ShowApartmentsComponent {
    constructor(public apts:ApartmentsService, public advs:AdvertiserService, public cats:CategoryService,
     public cits:CityService, public cus:CustomerService, public router:Router){};
     public imageIndex = 0;
     public cityId = ""
     public catId = ""
     public maxPrice = 0

  ngOnInit(){
    if(this.apts.allApartments.length == 0){
      this.apts.getAll().subscribe(
        all=>{
          this.apts.allApartments = all
        },
        err=>{
          console.log(err);
        }
      )
    }
    
    if(this.advs.allAdvertiser.length == 0){
      this.advs.getAll().subscribe(
        all=>{
          this.advs.allAdvertiser = all
        },
        err=>{
          console.log(err);
        }
      )
    }

    if(this.cats.allCategories.length == 0){
      this.cats.getAll().subscribe(
        all=>{
          this.cats.allCategories = all
        },
        err=>{
          console.log(err);
          
        }
      )
    }

    if(this.cits.allCities.length == 0){
      this.cits.getAll().subscribe(
        all=>{
          this.cits.allCities = all
        },
        err=>{
          console.log(err);
          
        }
      )
    }
  }
  show(_id:string){
    this.router.navigate([`moreDetails/${_id}`])
  }
  filterByCityId(){
    this.apts.getByCityId(this.cityId).subscribe(
      suc => {
        this.apts.allApartments = suc
      },
      err => {
        console.log(err);
      }
    )
  }
  filterByCategoryId(){
    this.apts.getByCategoryId(this.catId).subscribe(
      suc => {
        this.apts.allApartments = suc
      },
      err => {
        console.log(err);
      }
    )
  }
  filterByPrice(){
    this.apts.getByPriceLess(this.maxPrice).subscribe(
      suc => {
        this.apts.allApartments = suc
      },
      err => {
        console.log(err);
      }
    )
  }
  all(){
    this.apts.getAll().subscribe(
      all=>{
        this.apts.allApartments = all
      },
      err=>{
        console.log(err);
      }
    )
  }
}