import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Person, People } from '../overview-page/people/person.model';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  
  private personList: Person[] = [];
  private people;
  personListUpdated : BehaviorSubject<Person[]> = new BehaviorSubject<Person[]>([]);
  private peopleUpdated= new Subject<Person[]>();
  constructor(private http: HttpClient) { }


  getPersonUpdateListener() {
    return this.personListUpdated.asObservable();
  }
  getPersonList(){
   this.personListUpdated.next(this.personList);
  }
  
  getPerson(id: string) {
    const uri = "/api/people/"+id+"/";
    this.http.get<Person>(uri).subscribe( person => {
      
      this.personList.push(person);
    })
  }

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
