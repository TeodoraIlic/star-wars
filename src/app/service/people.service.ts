import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Person, People } from '../overview-page/people/person.model';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private person;
  private people;
  private personUpdated= new Subject<Person>();
  private peopleUpdated= new Subject<Person[]>();
  constructor(private http: HttpClient) { }

  getPeopleUpdateListener() {
    return this.peopleUpdated.asObservable();
  }
  getAllPeople(url: string) {
    const uri = url.substring(16,url.length);
    this.http.get<People>(uri)
    .subscribe((people)=>{
      this.people = people.results;
      this.peopleUpdated.next(people.results);
      
    });
  }
}
