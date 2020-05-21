import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, AsyncSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Person, People } from '../overview-page/people/person.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  
  private personList: Person[] = [];
  private people;
  personListUpdated : AsyncSubject<Person[]> = new AsyncSubject<Person[]>();
  private peopleUpdated= new Subject<Person[]>();
  constructor(private http: HttpClient) { }


  getPersonUpdateListener() {
    return this.personListUpdated.asObservable();
  }
  getPersonList(){
   this.personListUpdated.next(this.personList);
   this.personListUpdated.complete();
  }
  
  getPerson(id: string) {
    const uri = id;
    this.http.get<Person>(uri).subscribe( person => {
      
      this.personList.push(person);
    })
  }

  getPeopleUpdateListener() {
    return this.peopleUpdated.asObservable();
  }
  getAllPeople(url: string) {
    const uri = url.substring(16,url.length);
    this.http.get<People>(uri).pipe(map((people: People)=>{
      return {
        people: people.results.map(person=>{
          return {
              ... person,
              films: person.films.map( el => {
                let id = el.substring(21, el.length-1);
                return id;
              }),
              species: person.species.map(el => {
                let id = el.substring(21, el.length-1);
                return id;
              }),
              starships: person.starships.map(el => {
                let id = el.substring(21, el.length-1);
                return id;
              }),
              vehicles: person.vehicles.map(el => {
                let id = el.substring(21, el.length-1);
                return id;
              })
        }
      })
    }
    })).subscribe((people)=>{
      this.people = people.people;
      this.peopleUpdated.next(people.people);
      
    });
  }
}
