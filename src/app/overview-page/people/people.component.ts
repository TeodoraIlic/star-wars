import { Component, OnInit, OnDestroy } from '@angular/core';
import { Categories } from '../categories.model';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/service/categories.service';
import { PeopleService } from 'src/app/service/people.service';
import {  Person } from './person.model';
import { FuzzySearchService } from 'src/app/service/fuzzy-search.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit, OnDestroy {
  isLoading = true;
  peopleUrl: string; 
  searchValue: string = '';
  categories: Categories;
  categoriesSub: Subscription;
  people: Person[];
  peopleSub: Subscription;
  person: Person;
  personSub: Subscription;
  constructor(private categoriesService: CategoriesService, private peopleService: PeopleService, private fuzzySearchService: FuzzySearchService) { }

  ngOnInit(): void {
    this.categoriesService.getCategories();
    this.categoriesSub = this.categoriesService.getCategoriesUpdateListener().subscribe((categories)=>{
      this.isLoading = false;
      this.categories = categories;
      this.peopleUrl = categories.people;
      this.getAllPeople(this.peopleUrl);
    
    });
    this.fuzzySearchService.valueUpdateListener().subscribe(value=>{
      this.searchValue=value;
    })
  }

  ngOnDestroy(){
    this.peopleSub.unsubscribe();
    this.categoriesSub.unsubscribe();
  }

  getAllPeople(url: string){
    this.peopleService.getAllPeople(url);
    this.peopleSub = this.peopleService.getPeopleUpdateListener().subscribe((people)=>{
      this.people = people;
    });
    
  }

  getPerson(url: string){
    // this.filmsService.getFilm(url);
    // this.filmSub = this.filmsService.getFilmUpdateListener().subscribe((film: Film)=>{
    //   this.film = film;
    // });
  }

}
