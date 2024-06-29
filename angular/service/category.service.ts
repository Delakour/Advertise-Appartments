import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from 'src/class/category';
import { Observable } from 'rxjs';
import { AdvertiserService } from './advertiser.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(public http:HttpClient, public advs:AdvertiserService) { }
  allCategories:Array<Category> = new Array<Category>();
  url:string = "http://localhost:3001/category"

  getAll():Observable<Array<Category>>{
    const headers = new HttpHeaders({'Authorization':'Bearer ' + this.advs.currentUser.token})
    return this.http.get<Array<Category>>(this.url, {headers:headers})
  }

  addCat(cat:Category):Observable<Category>{
    const headers = new HttpHeaders({'Authorization':'Bearer ' + this.advs.currentUser.token})
    return this.http.post<Category>(this.url, cat, {headers:headers})
  }
}
