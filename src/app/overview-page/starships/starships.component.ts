import { Component, OnInit, OnDestroy } from '@angular/core';
import { Categories } from '../categories.model';
import { Subscription } from 'rxjs';
import { Starship } from './starships.model';
import { CategoriesService } from 'src/app/service/categories.service';
import { StarshipsService } from 'src/app/service/starships.service';
import { FuzzySearchService } from 'src/app/service/fuzzy-search.service';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.css']
})
export class StarshipsComponent implements OnInit, OnDestroy {
  isLoading = true;
  starshipsUrl: string; 
  searchValue: string = '';
  categories: Categories;
  categoriesSub: Subscription;
  starships: Starship[];
  starshipsSub: Subscription;
  starship: Starship;
  sstarshipSub: Subscription;
  constructor(private categoriesService: CategoriesService, private starshipsService: StarshipsService, private fuzzySearchService: FuzzySearchService) { }

  ngOnInit(): void {
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
}
