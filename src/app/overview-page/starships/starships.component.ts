import { Component, OnInit, OnDestroy } from '@angular/core';
import { Categories } from '../categories.model';
import { Subscription } from 'rxjs';
import { Starship } from './starships.model';
import { CategoriesService } from 'src/app/service/categories.service';
import { StarshipsService } from 'src/app/service/starships.service';
import { FuzzySearchService } from 'src/app/service/fuzzy-search.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.css']
})
export class StarshipsComponent implements OnInit, OnDestroy {
  isLoading = true;
  viewAll: boolean = true;
  idList: string[];
  listOfStarshipsToView = [];
  starshipsUrl: string; 
  searchValue: string = '';
  categories: Categories;
  categoriesSub: Subscription;
  starships: Starship[];
  starshipsSub: Subscription;
  starship: Starship;
  starshipSub: Subscription;
  constructor(private categoriesService: CategoriesService, 
              private starshipsService: StarshipsService, 
              private fuzzySearchService: FuzzySearchService,
              private router: Router,
              private route: ActivatedRoute) { 
                if(this.router.getCurrentNavigation()){
                  this.idList =  this.router.getCurrentNavigation().extras.state.starships;
  
                 }
              }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('related')){
          this.viewAll = false ;
          this.getRelatedStarships(this.idList); 
      }
    });
    this.starshipsService.getStarshipList();
    this.starshipSub = this.starshipsService.getStarshipUpdateListener().subscribe( starshipList => {
      this.listOfStarshipsToView = starshipList;
    })
    
    this.categoriesService.getCategories();
    this.categoriesSub = this.categoriesService.getCategoriesUpdateListener().subscribe((categories)=>{
      this.isLoading = false;
      this.categories = categories;
      this.starshipsUrl = categories.starships;
      this.getStarships(this.starshipsUrl);
    });
    this.fuzzySearchService.valueUpdateListener().subscribe(value=>{
      this.searchValue=value;
    })
  }

  ngOnDestroy(){
    this.categoriesSub.unsubscribe();
    this.starshipsSub.unsubscribe();
  }

  getStarships(url: string){
    this.starshipsService.getStarships(url);
    this.starshipsSub = this.starshipsService.getStarshipsUpdateListener().subscribe((starships)=>{
      this.starships = starships;
    });
  }

  getRelatedStarships(idList){
    idList.map(id => {
      this.starshipsService.getStarship(id);
    })
  }
}
