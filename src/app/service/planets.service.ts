import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { Planet, Planets } from '../overview-page/planets/planets.model';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {
  private planetList: Planet[] = [];
  private planet: Planet;
  private planets: Planet[];
  planetListUpdated : BehaviorSubject<Planet[]> = new BehaviorSubject<Planet[]>([]);
  private planetsUpdated= new Subject<Planet[]>();
  constructor(private http: HttpClient) { }


  getPlanetUpdateListener(){
    return this.planetListUpdated.asObservable();
  }

  getPlanetList(){
    this.planetListUpdated.next(this.planetList);
  }

  getPlanetById(id: string) {
    const uri = id;
    this.http.get<Planet>(uri).subscribe( planet =>{
      this.planetList.push(planet);
    })
  }

  getPlanetsUpdateListener() {
    return this.planetsUpdated.asObservable();
  }
  getAllPlanets(url: string) {
    const uri = url.substring(16,url.length);
    this.http.get<Planets>(uri)
      .subscribe((planets)=>{
        this.planets = planets.results;
        this.planetsUpdated.next(planets.results);
      });
  }


}
