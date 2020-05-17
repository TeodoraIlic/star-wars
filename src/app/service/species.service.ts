import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Species, Specimen } from '../overview-page/species/species.model';
import { Planet } from '../overview-page/planets/planets.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {
  private specimen: Specimen;
  private species: Specimen[];
  private specimenUpdated= new Subject<Specimen>();
  private speciesUpdated= new Subject<Specimen[]>();
  constructor(private http: HttpClient) { }

  getSpeciesUpdateListener() {
    return this.speciesUpdated.asObservable();
  }
  getSpecies(url: string) {
    const uri = url.substring(16,url.length);
    this.http.get<Species>(uri)
      .subscribe((species)=>{
        this.species = species.results;
        this.speciesUpdated.next(species.results);
        console.log(species.results);
      });
  }

}
