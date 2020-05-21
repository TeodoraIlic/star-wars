import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Categories } from '../categories.model';
import { CategoriesService } from 'src/app/service/categories.service';
import { PlanetsService } from 'src/app/service/planets.service';
import { Planet } from './planets.model';
import { FuzzySearchService } from 'src/app/service/fuzzy-search.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css']
})
export class PlanetsComponent implements OnInit, OnDestroy {

  isLoading = true;
  viewAll: boolean = true;
  planetsUrl: string;
  idList: string[];
  listOfPlanetToView = [];
  searchValue: string = ''; 
  categories: Categories;
  categoriesSub: Subscription;
  planets: Planet[];
  planetsSub: Subscription;
  planet: Planet;
  planetSub: Subscription;
  constructor(private categoriesService: CategoriesService, 
              private planetsService: PlanetsService, 
              private fuzzySearchService: FuzzySearchService,
              private router: Router,
              private route: ActivatedRoute) {

                if(this.router.getCurrentNavigation()){
                  this.idList =  this.router.getCurrentNavigation().extras.state.planets;
  
                 }
                }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('related')){
          this.viewAll = false ;
          this.getRelatedPlanets(this.idList); 
      }
    });
    
   
    this.planetsService.getPlanetList();
    this.planetSub = this.planetsService.getPlanetUpdateListener().subscribe( planet =>{
      this.listOfPlanetToView = planet;
    })
    
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

  ngOnDestroy(){
    if(this.planetsSub){
      this.planetsSub.unsubscribe();
    }
    if(this.planetSub){
      this.planetSub.unsubscribe();
    }
    this.categoriesSub.unsubscribe();
  }

  getAllPlanets(url: string){
    this.planetsService.getAllPlanets(url);
    this.planetsSub = this.planetsService.getPlanetsUpdateListener().subscribe((planets)=>{
      this.planets = planets;
    });
   
  }

  getRelatedPlanets(idList: string[]){
    idList.map(id => {
      this.planetsService.getPlanetById(id);
    });
  }

}
