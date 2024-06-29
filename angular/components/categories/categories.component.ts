import { Component } from '@angular/core';
import { Category } from 'src/class/category';
import { CategoryService } from 'src/service/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  constructor(
    public cats: CategoryService
  ) { }

  public hide:boolean = true
  public newCat:Category = new Category('', '')

  ngOnInit() {
    this.cats.getAll().subscribe(
      suc => {
        this.cats.allCategories = suc
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
    this.cats.addCat(this.newCat).subscribe(
      suc=>{
        this.cats.allCategories.push(suc)
      },
      err=>{
        console.log(err);        
      }
    )
  }
}
