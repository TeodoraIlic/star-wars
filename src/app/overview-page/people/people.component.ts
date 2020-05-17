import { Component, OnInit } from '@angular/core';
import { Categories } from '../categories.model';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/service/categories.service';
import { PeopleService } from 'src/app/service/people.service';
import {  Person } from './person.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  isLoading = true;
  peopleUrl: string; 
  categories: Categories;
  categoriesSub: Subscription;
  people: Person[];
  peopleSub: Subscription;
  person: Person;
  personSub: Subscription;
  constructor(private categoriesService: CategoriesService, private peopleService: PeopleService) { }

  ngOnInit(): void {
    this.categoriesService.getCategories();
    this.categoriesSub = this.categoriesService.getCategoriesUpdateListener().subscribe((categories)=>{
      this.isLoading = false;
      this.categories = categories;
      this.peopleUrl = categories.people;
      this.getAllPeople(this.peopleUrl);
    
    });
  }

  getAllPeople(url: string){
    this.peopleService.getAllPeople(url);
    this.peopleSub = this.peopleService.getPeopleUpdateListener().subscribe((people)=>{
      this.people = people;
    });
    console.log(this.people);
    
  }

  getPerson(url: string){
    // this.filmsService.getFilm(url);
    // this.filmSub = this.filmsService.getFilmUpdateListener().subscribe((film: Film)=>{
    //   this.film = film;
    // });
  }

}
