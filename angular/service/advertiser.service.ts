import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Advertiser } from 'src/class/advertiser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdvertiserService {

  constructor(public http:HttpClient) {  }
  currentUser:Advertiser = new Advertiser('', '', '', '', '', '')
  allAdvertiser:Array<Advertiser> = new Array<Advertiser>();
  url:string = "http://localhost:3001/advertiser";
  isSign:boolean = false
  isAdv:boolean = false

  getAll():Observable<Array<Advertiser>>{
    return this.http.get<Array<Advertiser>>(this.url);
  }
  register(adv:Advertiser):Observable<Advertiser>{
    this.isSign = true
    this.isAdv = true
    return this.http.post<Advertiser>(this.url + "/register", adv);
  }
  login(adv:Advertiser):Observable<Advertiser>{
    this.isAdv = true
    this.isSign = true
    return this.http.post<Advertiser>(this.url + "/login", adv)
  }
}