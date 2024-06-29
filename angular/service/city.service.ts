import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { City } from 'src/class/city';
import { Observable } from 'rxjs';
import { AdvertiserService } from './advertiser.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(public http:HttpClient, public advs:AdvertiserService) { }
  url:string = "http://localhost:3001/city"
  allCities:Array<City> = new Array<City>();

  getAll():Observable<Array<City>>{
    return this.http.get<Array<City>>(this.url)
  }

  addCity(city:City):Observable<City>{
    const headers = new HttpHeaders({'Authorization':'Bearer ' + this.advs.currentUser.token})
    return this.http.post<City>(this.url, city, {headers:headers})
  }
}
