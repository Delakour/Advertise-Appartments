import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Advertiser } from 'src/class/advertiser';
import { Apartment } from 'src/class/apartment';
import { Category } from 'src/class/category';
import { City } from 'src/class/city';
import { AdvertiserService } from 'src/service/advertiser.service';
import { ApartmentsService } from 'src/service/apartments.service';
import { CategoryService } from 'src/service/category.service';
import { CityService } from 'src/service/city.service';

@Component({
  selector: 'app-add-apartment',
  templateUrl: './add-apartment.component.html',
  styleUrls: ['./add-apartment.component.css']
})
export class AddApartmentComponent {
  constructor(
    public apts: ApartmentsService,
    public cits: CityService,
    public cats: CategoryService,
    public advs: AdvertiserService,
    public router: Router) { }

  apt: Apartment = new Apartment('', '', '', [], new Category('', ''),
             new City('', '', []), '', 0, '', 0, new Advertiser('','', '', '', '', ''))
  images = new Array<File>()
  selectedCat: any
  selectedCit: any
  apt_id:string = ""
  addApartmentForm: FormGroup = new FormGroup({})

  refreshForm() {
    this.addApartmentForm = new FormGroup({

      "name": new FormControl(null, [Validators.pattern("[ א-ת]*")]),
      "description": new FormControl(null, [Validators.required, Validators.pattern("[ א-ת]*")]),
      "category": new FormControl(null, [Validators.required]),
      "city": new FormControl(null, [Validators.required]),
      "address": new FormControl(null, [Validators.required, Validators.pattern("[א-ת 0-9]*")]),
      "beds": new FormControl(null, [Validators.required, Validators.min(2), Validators.max(50), Validators.pattern("[0-9]*")]),
      "additions": new FormControl(null, [Validators.pattern("[א-ת ]*")]),
      "price": new FormControl(null, [Validators.required, Validators.min(1000), Validators.max(50000), Validators.pattern("[0-9]*")]),
    })
  }

  ngOnInit() {
    this.refreshForm()
    this.apt_id = this.advs.currentUser._id
  }

  get getName() {
    return this.addApartmentForm.controls['name']
  }
  get getDescription() {
    return this.addApartmentForm.controls['description']
  }
  get getCategory() {
    return this.addApartmentForm.controls['category']
  }
  get getCity() {
    return this.addApartmentForm.controls['city']
  }
  get getAddress() {
    return this.addApartmentForm.controls['address']
  }
  get getBeds() {
    return this.addApartmentForm.controls['beds']
  }
  get getAdditions() {
    return this.addApartmentForm.controls['additions']
  }
  get getPrice() {
    return this.addApartmentForm.controls['price']
  }

  add() {
    
    if (!this.getName.invalid && !this.getDescription.invalid
      && !this.getCategory.invalid && !this.getCity.invalid
      && !this.getAddress.invalid && !this.getBeds.invalid
      && !this.getAdditions.invalid && !this.getPrice.invalid) {

        let apt = this.addApartmentForm.value;
        apt._id = this.apt_id
      this.apts.addApt(apt, this.images).subscribe(
        suc => {
          this.apts.getAll().subscribe(
            suc=>{
              this.apts.allApartments = suc
            },
            err=>{
              console.log(err);
            }
          )
          this.router.navigate([`showAll`])
        },
        err => {
          console.log(err)
        }
      )
    }

    else
      alert("טופס לא תקין")
  }
  chooseImgs(event: any) {
    if (event.target.files.length > 0) {
      const files = event.target.files
      this.images = files
    }
  }
}
