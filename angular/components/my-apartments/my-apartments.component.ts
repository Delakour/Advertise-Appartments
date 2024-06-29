import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Advertiser } from 'src/class/advertiser';
import { Apartment } from 'src/class/apartment';
import { Category } from 'src/class/category';
import { City } from 'src/class/city';
import { AdvertiserService } from 'src/service/advertiser.service';
import { ApartmentsService } from 'src/service/apartments.service';
import { CategoryService } from 'src/service/category.service';
import { CityService } from 'src/service/city.service';
import { CustomerService } from 'src/service/customer.service';

@Component({
  selector: 'app-my-apartments',
  templateUrl: './my-apartments.component.html',
  styleUrls: ['./my-apartments.component.css']
})
export class MyApartmentsComponent {
  constructor(
    public activeRouter: ActivatedRoute,
    public router: Router,
    public apts: ApartmentsService,
    public advs: AdvertiserService,
    public cus: CustomerService,
    public cats: CategoryService,
    public cits: CityService
  ) { }

  myApartments: Array<Apartment> = new Array<Apartment>()

  updateApartmentForm: FormGroup = new FormGroup({})
  aptUp:Apartment = new Apartment('', '', '', [], new Category('', ''),
  new City('', '', []), '', 0, '', 0, new Advertiser('','', '', '', '', ''))

  images = new Array<File>()
  selectedCat: any
  selectedCit: any
  hide: boolean = true
  apt_id:string = ""

  refreshForm() {
    this.updateApartmentForm = new FormGroup({
      "name": new FormControl(this.aptUp.name, [Validators.pattern("[ א-ת]*")]),
      "description": new FormControl(this.aptUp.description, [Validators.required, Validators.pattern("[ א-ת]*")]),
      "category": new FormControl(this.selectedCat, [Validators.required]),
      "city": new FormControl(this.selectedCit, [Validators.required]),
      "address": new FormControl(this.aptUp.address, [Validators.required, Validators.pattern("[א-ת 0-9]*")]),
      "beds": new FormControl(this.aptUp.beds, [Validators.required, Validators.min(2), Validators.max(50), Validators.pattern("[0-9]*")]),
      "additions": new FormControl(this.aptUp.additions, [Validators.pattern("[א-ת ]*")]),
      "price": new FormControl(this.aptUp.price, [Validators.required, Validators.min(1000), Validators.max(50000), Validators.pattern("[0-9]*")]),
    })
  }
  ngOnInit() {
    this.myApartments = this.apts.allApartments.filter(ap => this.advs.currentUser._id == ap.advertiser._id)
  }
  show(_id: string) {
    this.router.navigate([`moreDetails/${_id}`])
  }
  showUpdate(_id:string) {
    this.aptUp = new Apartment('', '', '', [], new Category('', ''),
    new City('', '', []), '', 0, '', 0, new Advertiser('','', '', '', '', ''))
    this.apt_id = _id
      this.apts.getById(_id).subscribe(
        sub=>{
          this.aptUp = sub
          this.selectedCat = sub.category.name
          this.selectedCit = sub.city.name
          this.refreshForm()
          this.hide = !this.hide
        },
        err=>{
          console.log(err);
        }
      )
  }

  get getName() {
    return this.updateApartmentForm.controls['name']
  }
  get getDescription() {
    return this.updateApartmentForm.controls['description']
  }
  get getCategory() {
    return this.updateApartmentForm.controls['category']
  }
  get getCity() {
    return this.updateApartmentForm.controls['city']
  }
  get getAddress() {
    return this.updateApartmentForm.controls['address']
  }
  get getBeds() {
    return this.updateApartmentForm.controls['beds']
  }
  get getAdditions() {
    return this.updateApartmentForm.controls['additions']
  }
  get getPrice() {
    return this.updateApartmentForm.controls['price']
  }

  update() {
    if (!this.getName.invalid && !this.getDescription.invalid
      && !this.getCategory.invalid && !this.getCity.invalid
      && !this.getAddress.invalid && !this.getBeds.invalid
      && !this.getAdditions.invalid && !this.getPrice.invalid) {

      const apt = this.updateApartmentForm.value;
      
      const formData = new FormData()
      formData.append('_id', this.apt_id)
      formData.append('name', apt.name)
      formData.append('description', apt.description)
      formData.append('category', String(apt.category))
      formData.append('city', String(apt.city))
      formData.append('address', String(apt.address))
      formData.append('beds', String(apt.beds))
      formData.append('additions', apt.additions)
      formData.append('price', String(apt.price))
      formData.append('advertiser', String(this.advs.currentUser))

      this.apts.update(this.apt_id, apt).subscribe(
        suc => {
          this.apts.getAll().subscribe(
            suc => {
              this.apts.allApartments = suc
              this.myApartments = this.apts.allApartments.filter(ap => this.advs.currentUser._id == ap.advertiser._id)
            },
            err => {
              console.log(err);
            }
          )
        },
        err => {
          console.log(err)
        }
      )
    }

    else
      alert("טופס לא תקין")
  }
  delete(_id: string) {
    if(confirm("האם אתה בטוח שאתה רוצה למחוק את הדירה הזו?")){
      this.apts.remove(_id).subscribe(
        suc => {
          this.apts.getAll().subscribe(
            suc => {
              this.apts.allApartments = suc
              this.myApartments = this.apts.allApartments.filter(ap => this.advs.currentUser._id == ap.advertiser._id)
            },
            err => {
              console.log(err);
            }
          )
        }
      )
    }
  }
  chooseImgs(event: any) {
    if (event.target.files.length > 0) {
      const files = event.target.files
      this.images = files
      console.log(this.images);
    }

  }
}