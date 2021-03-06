import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Species, Specimen } from '../overview-page/species/species.model';
import { Planet } from '../overview-page/planets/planets.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {
  private specimenList: Specimen[] = [];
  private specimen: Specimen;
  private species: Specimen[];
  private specimenListUpdated = new BehaviorSubject<Specimen[]>([]);
  private speciesUpdated = new Subject<Specimen[]>();
  constructor(private http: HttpClient) { }

  getSpecimenUpdateListener(){
    return this.specimenListUpdated.asObservable();
  }

  getSpecimenList(){
    this.specimenListUpdated.next(this.specimenList)
  }

  getSpecimen(id: string){
    const uri = id;
    this.http.get<Specimen>(uri).subscribe( specimen =>{
      this.specimenList.push(specimen);
    })
  }

  getSpeciesUpdateListener() {
    return this.speciesUpdated.asObservable();
  }
  getSpecies(url: string) {
    const uri = url.substring(16,url.length);
    this.http.get<Species>(uri).pipe(map((species: Species)=>{
      return {
        species: species.results.map(specimen=>{
          return {
              ... specimen,
              films: specimen.films.map( el => {
                let id = el.substring(21, el.length-1);
                return id;
              }),
              people: specimen.people.map(el => {
                let id = el.substring(21, el.length-1);                
                return id;
              })
            }
        })
      }
    }))
      .subscribe((species)=>{
        this.species = species.species;
        this.speciesUpdated.next(species.species);
      });
  }

}
