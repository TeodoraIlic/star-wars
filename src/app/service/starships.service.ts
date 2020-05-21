import { Injectable } from '@angular/core';
import { Starship, Starships } from '../overview-page/starships/starships.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StarshipsService {
  private starshipList: Starship[] = [];
  private starship: Starship;
  private starships: Starship[];
  private starshipListUpdated: BehaviorSubject<Starship[]>= new BehaviorSubject<Starship[]>([]);
  private starshipsUpdated= new Subject<Starship[]>();
  constructor(private http: HttpClient) { }

  getStarshipUpdateListener(){
    return this.starshipListUpdated.asObservable();
  }
  getStarshipList(){
    this.starshipListUpdated.next(this.starshipList);
  }
  getStarship(id: string){
    const uri = id;
    this.http.get<Starship>(uri).subscribe( starship =>{
      this.starshipList.push(starship);
    });
  }

  getStarshipsUpdateListener() {
    return this.starshipsUpdated.asObservable();
  }

  getStarships(url: string) {
    const uri = url.substring(16,url.length);
    this.http.get<Starships>(uri).pipe(map((starships: Starships)=>{
      return {
        starships: starships.results.map(starship=>{
          return {
              ... starship,
              films: starship.films.map( el => {
                let id = el.substring(21, el.length-1);
                return id;
              }),
              pilots: starship.pilots.map(el => {
                let id = el.substring(21, el.length-1);                
                return id;
              })
            }
        })
      }
    }))
      .subscribe((starships)=>{
        this.starships = starships.starships;
        this.starshipsUpdated.next(starships.starships);
      });
  }
 
}
