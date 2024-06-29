import { Injectable } from '@angular/core';
import { Apartment } from 'src/class/apartment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdvertiserService } from './advertiser.service';
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root'
})
export class ApartmentsService {

  constructor(public http:HttpClient, public advs:AdvertiserService, public cus:CustomerService){}

  allApartments:Array<Apartment> = new Array<Apartment>();
  url:string="http://localhost:3001/apartment"

  getAll():Observable<Array<Apartment>>{
    return this.http.get<Array<Apartment>>(this.url);
  }
  getById(id:String):Observable<Apartment>{
    var current = this.advs.currentUser.token
    if(current == ''){
      current = this.cus.currentUser.token
    }
    const headers = new HttpHeaders({'authorization':'Bearer ' + current})
    return this.http.get<Apartment>(this.url+`/${id}`, {headers:headers})
  }
  getByCategoryId(_id:string):Observable<Array<Apartment>>{
    var current = this.advs.currentUser.token
    if(current == ''){
      current = this.cus.currentUser.token
    }
    const headers = new HttpHeaders({'authorization':'Bearer ' + current})
    return this.http.get<Array<Apartment>>(this.url + "/getByCategoryId/" + _id, {headers:headers});
  }
  getByCityId(_id:string):Observable<Array<Apartment>>{
    var current = this.advs.currentUser.token
    if(current == ''){
      current = this.cus.currentUser.token
    }
    const headers = new HttpHeaders({'authorization':'Bearer ' + current})
    return this.http.get<Array<Apartment>>(this.url + "/getByCityId/" + _id, {headers:headers});
  }
  getByNumBedsEq(beds:number):Observable<Array<Apartment>>{
    var current = this.advs.currentUser.token
    if(current == ''){
      current = this.cus.currentUser.token
    }
    const headers = new HttpHeaders({'authorization':'Bearer ' + current})
    return this.http.get<Array<Apartment>>(this.url + "/getByNumBedsEq/" + beds, {headers:headers});
  }
  getByNumBedsBig(beds:number):Observable<Array<Apartment>>{
    var current = this.advs.currentUser.token
    if(current == ''){
      current = this.cus.currentUser.token
    }
    const headers = new HttpHeaders({'authorization':'Bearer ' + current})
    return this.http.get<Array<Apartment>>(this.url + "/getByNumBedsBig/" + beds, {headers:headers});
  }
  getByNumBedsLess(beds:number):Observable<Array<Apartment>>{
    var current = this.advs.currentUser.token
    if(current == ''){
      current = this.cus.currentUser.token
    }
    const headers = new HttpHeaders({'authorization':'Bearer ' + current})
    return this.http.get<Array<Apartment>>(this.url + "/getByNumBedsLess/" + beds, {headers:headers});
  }
  getByPriceBig(price:number):Observable<Array<Apartment>>{
    var current = this.advs.currentUser.token
    if(current == ''){
      current = this.cus.currentUser.token
    }
    const headers = new HttpHeaders({'authorization':'Bearer ' + current})
    return this.http.get<Array<Apartment>>(this.url + "/getByPriceBig/" + price, {headers:headers});
  }
  getByPriceLess(price:number):Observable<Array<Apartment>>{
    var current = this.advs.currentUser.token
    if(current == ''){
      current = this.cus.currentUser.token
    }
    const headers = new HttpHeaders({'authorization':'Bearer ' + current})
    return this.http.get<Array<Apartment>>(this.url + "/getByPriceLess/" + price, {headers:headers});
  }
  getByAdevrtiserId(_id:string):Observable<Array<Apartment>>{
    var current = this.advs.currentUser.token
    if(current == ''){
      current = this.cus.currentUser.token
    }
    const headers = new HttpHeaders({'authorization':'Bearer ' + current})
    return this.http.get<Array<Apartment>>(this.url + "/getByAdevrtiserId/" + _id, {headers:headers});
  }
  addApt(apt:Apartment, images:Array<File>):Observable<Apartment>{

    const headers = new HttpHeaders({'enctype':'multipart/form-data',
     'authorization':'Bearer ' + this.advs.currentUser.token})
    const formData = new FormData()

    formData.append('_id', apt._id)
    formData.append('name', apt.name)
    formData.append('description', apt.description)
    formData.append('category', String(apt.category))
    formData.append('city', String(apt.city))
    formData.append('address', String(apt.address))
    formData.append('beds', String(apt.beds))
    formData.append('additions',apt.additions)
    formData.append('price', String(apt.price))
    formData.append('advertiser', String(this.advs.currentUser._id))

    for(let i=0; i<images.length; i++)
      formData.append('files', images[i])
    
    console.log(formData.get('files'))

    return this.http.post<Apartment>(this.url, formData, {headers:headers});
  }
  update(_id:string, apt:FormData):Observable<Apartment>{
    var current = this.advs.currentUser.token
    if(current == ''){
      current = this.cus.currentUser.token
    }
    const headers = new HttpHeaders({'authorization':'Bearer ' + current})
    return this.http.patch<Apartment>(this.url + "/"+ _id, apt, {headers:headers});
  }
  remove(_id:string):Observable<Apartment>{
    var current = this.advs.currentUser.token
    if(current == ''){
      current = this.cus.currentUser.token
    }
    const headers = new HttpHeaders({'authorization':'Bearer ' + current})
    return this.http.delete<Apartment>(this.url + "/" +_id, {headers:headers});
  }
}