import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/class/customer';
import { AdvertiserService } from './advertiser.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(public http:HttpClient, public advs:AdvertiserService) {  }
  currentUser:Customer = new Customer('', '', '', '')
  allAdvertiser:Array<Customer> = new Array<Customer>();
  url:string = "http://localhost:3001/customer";
  isSign:boolean = false

  getAll():Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(this.url);
  }
  register(cus:Customer):Observable<Customer>{
    this.isSign = true
    this.advs.isAdv = false
    return this.http.post<Customer>(this.url + "/register", cus);
  }
  login(cus:Customer):Observable<Customer>{
    this.isSign = true
    this.advs.isAdv = false
    return this.http.post<Customer>(this.url + "/login", cus)
  }
}
