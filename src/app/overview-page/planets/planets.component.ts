import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Categories } from '../categories.model';
import { CategoriesService } from 'src/app/service/categories.service';
import { PlanetsService } from 'src/app/service/planets.service';
import { Planet } from './planets.model';
import { FuzzySearchService } from 'src/app/service/fuzzy-search.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css']
})
export class PlanetsComponent implements OnInit {

  isLoading = true;
  planetsUrl: string;
  searchValue: string = ''; 
  categories: Categories;
  categoriesSub: Subscription;
  planets: Planet[];
  planetsSub: Subscription;
  planet: Planet;
  planetSub: Subscription;
  constructor(private categoriesService: CategoriesService, private planetsService: PlanetsService, private fuzzySearchService: FuzzySearchService) { }

  ngOnInit(): void {
    this.categoriesService.getCategories();
    this.categoriesSub = this.categoriesService.getCategoriesUpdateListener().subscribe((categories)=>{
      this.isLoading = false;
      this.categories = categories;
      this.planetsUrl = categories.planets;
      this.getAllPlanets(this.planetsUrl);
    });
    this.fuzzySearchService.valueUpdateListener().subscribe(value=>{
      this.searchValue=value;
    })
  }

  getAllPlanets(url: string){
    this.planetsService.getAllPlanets(url);
    this.planetsSub = this.planetsService.getPlanetsUpdateListener().subscribe((planets)=>{
      this.planets = planets;
    });
   
  }

}
