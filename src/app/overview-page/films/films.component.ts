import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { Categories } from '../categories.model';
import { CategoriesService } from 'src/app/service/categories.service';
import { Film } from './films.model';
import { FilmsService } from 'src/app/service/films.service';
import { FuzzySearchService } from 'src/app/service/fuzzy-search.service';
import { PeopleService } from 'src/app/service/people.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit, OnDestroy {
  isLoading = true;
  viewAll: boolean = true;
  idList: string[];
  searchValue: string = '';
  listOfFilmsToView = [];
  listOfFilmsToView1;
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
              private router: Router,
              private route: ActivatedRoute) { 
                if(this.router.getCurrentNavigation()){
                  this.idList =  this.router.getCurrentNavigation().extras.state.films;
  
                 }
              }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('related')){
          this.viewAll = false ;
          this.getRelatedFilms(this.idList); 
      }
    });
    this.filmsService.getFilmList();
    // this.filmSub = this.filmsService.getFilmUpdateListener().subscribe( filmList =>{
    //   this.listOfFilmsToView = filmList;
    // });
    this.listOfFilmsToView1 = this.filmsService.getFilmUpdateListener();
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
    if(this.filmsSub){
      this.filmsSub.unsubscribe();
    }
    if( this.filmSub){
      this.filmSub.unsubscribe();
    }
  
  }

  getFilms(url: string){
    this.filmsService.getFilms(url);
    this.filmsSub = this.filmsService.getFilmsUpdateListener().subscribe((films: Film[])=>{
      this.films = films;
     
    });
  
  }

  getRelatedFilms(idList: string[]){
    idList.map(id=>{
      this.filmsService.getFilm(id);
    });
  }
}
