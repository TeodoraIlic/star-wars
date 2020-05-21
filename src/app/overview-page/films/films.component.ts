import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { Categories } from '../categories.model';
import { CategoriesService } from 'src/app/service/categories.service';
import { Film } from './films.model';
import { FilmsService } from 'src/app/service/films.service';
import { FuzzySearchService } from 'src/app/service/fuzzy-search.service';
import { PeopleService } from 'src/app/service/people.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit, OnDestroy {
  isLoading = true;
  searchValue: string = '';
  
  filmsUrl: string; 
  categories: Categories;
  categoriesSub: Subscription;
  films: Film[];
  filmsSub: Subscription;
  film: Film;
  filmSub: Subscription;
  constructor(private categoriesService: CategoriesService, 
              private filmsService: FilmsService, 
              private fuzzySearchService: FuzzySearchService,
              private peopleService: PeopleService) { }

  ngOnInit(): void {
    this.categoriesService.getCategories();
    this.categoriesSub = this.categoriesService.getCategoriesUpdateListener().subscribe((categories)=>{
      this.isLoading = false;
      this.categories = categories;
      this.filmsUrl = categories.films;
      this.getFilms(this.filmsUrl);
    });
    this.fuzzySearchService.valueUpdateListener().subscribe(value=>{
      this.searchValue=value;
    })
  }
  ngOnDestroy(){
    this.categoriesSub.unsubscribe();
    this.filmsSub.unsubscribe();
  
  }

  getFilms(url: string){
    this.filmsService.getFilms(url);
    this.filmsSub = this.filmsService.getFilmsUpdateListener().subscribe((films: Film[])=>{
      this.films = films;
     
    });
  
  }

  getFilm(url: string){
    this.filmsService.getFilm(url);
    this.filmSub = this.filmsService.getFilmUpdateListener().subscribe((film: Film)=>{
      this.film = film;
      
    });
    
  }


}
