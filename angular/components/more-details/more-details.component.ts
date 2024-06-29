import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApartmentsService } from 'src/service/apartments.service';
import { Advertiser } from 'src/class/advertiser';
import { Apartment } from 'src/class/apartment';
import { City } from 'src/class/city';
import { Category } from 'src/class/category';
import { AdvertiserService } from 'src/service/advertiser.service';
import { CustomerService } from 'src/service/customer.service';

@Component({
  selector: 'app-more-details',
  templateUrl: './more-details.component.html',
  styleUrls: ['./more-details.component.css']
})
export class MoreDetailsComponent {

  constructor(public apt:ApartmentsService, public router:Router, public activeRouter:ActivatedRoute,
    public advs:AdvertiserService, public cus:CustomerService) {}
  city:City = new City('', '', [])
  cat:Category = new Category('', '')
  adv:Advertiser = new Advertiser('','', '', '', '', '')
  a:Apartment = new Apartment('','', '', [], this.cat, this.city, '', 0, '', 0, this.adv);
  public imageIndex = 0;
  public len = 0

  ngOnInit(){
    this.activeRouter.params.subscribe(
      (ap) => {
        console.log(this.advs.isAdv);
        
        this.a = this.apt.allApartments[this.apt.allApartments.findIndex(a1 => a1._id == [ap["_id"]] as unknown as string)];
        this.len = this.a.img.length
      }
    )    
  }
  interval(){

  }
  left(){
    if(this.imageIndex > 0)
      this.imageIndex --;
  }
  right(){
    if(this.imageIndex < this.len - 1)
    this.imageIndex ++;
  }
}