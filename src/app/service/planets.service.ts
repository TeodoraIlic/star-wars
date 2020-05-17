import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Planet, Planets } from '../overview-page/planets/planets.model';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {
  private planet;
  private planets;
  private planetUpdated= new Subject<Planet>();
  private planetsUpdated= new Subject<Planet[]>();
  constructor(private http: HttpClient) { }

  getPlanetsUpdateListener() {
    return this.planetsUpdated.asObservable();
  }
  getAllPlanets(url: string) {
    const uri = url.substring(16,url.length);
    this.http.get<Planets>(uri)
      .subscribe((planets)=>{
        this.planets = planets.results;
        this.planetsUpdated.next(planets.results);
        console.log(planets.results);
      });
  }

}
