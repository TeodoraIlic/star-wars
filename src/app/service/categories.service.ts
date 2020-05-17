import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private categories: {};
  private categoriesUpdated = new Subject<any>();
  constructor(private http: HttpClient) { }

  getCategoriesUpdateListener(){
    return this.categoriesUpdated.asObservable();
  }

  getCategories(){
    this.http.get('https://swapi.dev/api/').subscribe((categories)=>{
      this.categories = categories;
      this.categoriesUpdated.next(categories);
    });
  }
 
}
