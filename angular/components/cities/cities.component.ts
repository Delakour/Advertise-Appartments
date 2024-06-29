import { Component } from '@angular/core';
import { City } from 'src/class/city';
import { CityService } from 'src/service/city.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent {
  constructor(
    public cits:CityService
  ) { }

  public hide:boolean = true
  public newCity:City = new City('', '', [])

  ngOnInit() {
    this.cits.getAll().subscribe(
      suc => {
        this.cits.allCities = suc
      },
      err => {
        console.log(err);
      }
    )
  }
  showAdd(){
    this.hide = !this.hide
  }
  add(){
    this.cits.addCity(this.newCity).subscribe(
      suc=>{
        this.cits.allCities.push(suc)
      },
      err=>{
        console.log(err);        
      }
    )
  }
}
