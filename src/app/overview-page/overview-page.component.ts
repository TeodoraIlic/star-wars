import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../service/categories.service';
import { Subscription } from 'rxjs';
import { Categories } from './categories.model';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css']
})
export class OverviewPageComponent implements OnInit {
  filter = { people: false, films: false, starships: false, vehicles: false, species: false, planets: false };
  isActivated = !(this.filter.films || this.filter.people || this.filter.planets || this.filter.species || this.filter.starships || this.filter.vehicles);
  filterCategories = { people: true, films: true, starships: true, vehicles: true, species: true, planets: true };
  showAllCategories = !this.filter.films && !this.filter.people && !this.filter.planets && !this.filter.species && !this.filter.starships && !this.filter.vehicles;
  constructor() { }

  ngOnInit(): void {
    
  }
 
  activateChange(){
    this.showAllCategories = !this.filter.films && !this.filter.people && !this.filter.planets && !this.filter.species && !this.filter.starships && !this.filter.vehicles;
    
    for (var key in this.filter) {
      this.filterCategories[key] = this.filter[key];
      console.log(key +' '+this.filter[key] );
      
    }
    
    if(this.showAllCategories){
      for (var key in this.filter) {
        this.filterCategories[key] = true;
      }
    }
  }
}
