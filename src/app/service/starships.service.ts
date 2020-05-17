import { Injectable } from '@angular/core';
import { Starship, Starships } from '../overview-page/starships/starships.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StarshipsService {
  private starship: Starship;
  private starships: Starship[];
  private starshipUpdated= new Subject<Starship>();
  private starshipsUpdated= new Subject<Starship[]>();
  constructor(private http: HttpClient) { }

  getStarshipsUpdateListener() {
    return this.starshipsUpdated.asObservable();
  }

  getStarships(url: string) {
    const uri = url.substring(16,url.length);
    this.http.get<Starships>(uri)
      .subscribe((starships)=>{
        this.starships = starships.results;
        this.starshipsUpdated.next(starships.results);
        console.log(starships.results);
      });
  }
 
}
