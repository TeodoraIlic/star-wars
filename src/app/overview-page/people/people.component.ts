import { Component, OnInit, OnDestroy } from '@angular/core';
import { Categories } from '../categories.model';
import { Subscription, Observable } from 'rxjs';
import { CategoriesService } from 'src/app/service/categories.service';
import { PeopleService } from 'src/app/service/people.service';
import {  Person } from './person.model';
import { FuzzySearchService } from 'src/app/service/fuzzy-search.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit, OnDestroy {
  isLoading = true;
  viewAll: boolean = true;
  idList: string[];
  peopleUrl: string; 
  listOfPeopleToView=[];
  searchValue: string = '';
  categories: Categories;
  categoriesSub: Subscription;
  people: Person[];
  peopleSub: Subscription;
  person: Person;
  personSub: Subscription;
  constructor(private categoriesService: CategoriesService, 
              private peopleService: PeopleService, 
              private fuzzySearchService: FuzzySearchService,
              private router: Router,
              private route: ActivatedRoute) {

               if(this.router.getCurrentNavigation()){
                this.idList =  this.router.getCurrentNavigation().extras.state.people;
                
               }

              }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('related')){
          this.viewAll = false ;
          this.getRelatedPeople(this.idList); 
      }
    });
    
   
    this.peopleService.getPersonList();
    this.personSub = this.peopleService.getPersonUpdateListener().subscribe(people=>{
      this.listOfPeopleToView = people;
    })
    

    
    this.categoriesService.getCategories();
    this.categoriesSub = this.categoriesService.getCategoriesUpdateListener().subscribe((categories)=>{
      this.isLoading = false;
      this.categories = categories;
      this.peopleUrl = categories.people;

      if(this.viewAll){
        this.getAllPeople(this.peopleUrl);
      }
    
    });
    this.fuzzySearchService.valueUpdateListener().subscribe(value=>{
      this.searchValue=value;
    })

  }

  ngOnDestroy(){
    if(this.peopleSub){
      this.peopleSub.unsubscribe();    
    }
    if(this.personSub){
      this.personSub.unsubscribe();
    }
    this.categoriesSub.unsubscribe();
  }

  getAllPeople(url: string){
    this.peopleService.getAllPeople(url);
    this.peopleSub = this.peopleService.getPeopleUpdateListener().subscribe((people)=>{
      this.people = people;
    });
    
  }

  getRelatedPeople(idList: string[]){
    idList.map( id => {
      this.peopleService.getPerson(id);
    });
    
  }

}
