import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Films, Film } from '../overview-page/films/films.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  private film: Film;
  private films: Film[];
  private filmUpdated= new Subject<Film>();
  private filmsUpdated= new Subject<Film[]>();
  
  constructor(private http: HttpClient) { }

  getFilmsUpdateListener(){
    return this.filmsUpdated.asObservable();
  }

  getFilms(url: string){
    const uri = url.substring(16,url.length);
    this.http.get<Films>(uri)
    .pipe(map((films: Films)=>{
      return {
        films: films.results.map(film=>{
          return {
              ... film,
              characters: film.characters.map( el => {
                let id = el.substring(33, el.length-1);
                return id;
              }),
              planets: film.planets.map(el => {
                let id = el.substring(21, el.length-1);
                return id;
              }),
              species: film.species.map(el => {
                let id = el.substring(21, el.length-1);
                return id;
              }),
              starships: film.starships.map(el => {
                let id = el.substring(21, el.length-1);
                return id;
              }),
              vehicles: film.vehicles.map(el => {
                let id = el.substring(21, el.length-1);
                return id;
              }),
              release_date: new Date(film.release_date)
            }
        })
      }
    })).subscribe((films)=>{
      this.films = films.films;
      this.filmsUpdated.next(films.films);
      
    });
  }
  getFilmUpdateListener() {
    return this.filmUpdated.asObservable();
  }
  getFilm(url: string){
    const uri = url.substring(16,url.length);
    this.http.get<Film>(uri).subscribe((film)=>{
      this.film = film;
      this.filmUpdated.next(film);
      
    }); 
  }
}
