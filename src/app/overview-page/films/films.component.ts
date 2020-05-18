import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Categories } from '../categories.model';
import { CategoriesService } from 'src/app/service/categories.service';
import { Film } from './films.model';
import { FilmsService } from 'src/app/service/films.service';
import { FuzzySearchService } from 'src/app/service/fuzzy-search.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  isLoading = true;
  filmsUrl: string; 
  categories: Categories;
  categoriesSub: Subscription;
  films: Film[];
  filmsSub: Subscription;
  film: Film;
  filmSub: Subscription;
  constructor(private categoriesService: CategoriesService, private filmsService: FilmsService, private fuzzySearch: FuzzySearchService) { }

  ngOnInit(): void {
    this.categoriesService.getCategories();
    this.categoriesSub = this.categoriesService.getCategoriesUpdateListener().subscribe((categories)=>{
      this.isLoading = false;
      this.categories = categories;
      this.filmsUrl = categories.films;
      this.getFilms(this.filmsUrl);
    });
    this.fuzzySearch.itemsUpdateListener().subscribe(res => {
      this.films = res;
    });
  }

  getFilms(url: string){
    this.filmsService.getFilms(url);
    this.filmsSub = this.filmsService.getFilmsUpdateListener().subscribe((films: Film[])=>{
      this.films = films;
      this.fuzzySearch.loadDataFromComponent(this.films);
    });
  }

  getFilm(url: string){
    this.filmsService.getFilm(url);
    this.filmSub = this.filmsService.getFilmUpdateListener().subscribe((film: Film)=>{
      this.film = film;
    });
  }

}
