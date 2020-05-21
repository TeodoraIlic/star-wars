import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { Planet, Planets } from '../overview-page/planets/planets.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {
  private planetList: Planet[] = [];
  private planet: Planet;
  private planets: Planet[];
  private planetListUpdated : BehaviorSubject<Planet[]> = new BehaviorSubject<Planet[]>([]);
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
    this.http.get<Planets>(uri).pipe(map((planets: Planets)=>{
      return {
        planets: planets.results.map(planet=>{
          return {
              ... planet,
              films: planet.films.map( el => {
                let id = el.substring(21, el.length-1);
                return id;
              }),
              residents: planet.residents.map(el => {
                let id = el.substring(21, el.length-1);                
                return id;
              })
            }
        })
      }
    })).subscribe((planets)=>{
        this.planets = planets.planets;
        this.planetsUpdated.next(planets.planets);
      });
  }


}
