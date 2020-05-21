import { Injectable } from '@angular/core';
import { Vehicle, Vehicles } from '../overview-page/vehicles/vehicles.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  private vehicleList: Vehicle[] = [];
  private vehicle: Vehicle;
  private vehicles: Vehicle[];
  private vehicleListUpdated: BehaviorSubject<Vehicle[]> = new BehaviorSubject<Vehicle[]>([]);
  private vehiclesUpdated= new Subject<Vehicle[]>();
  constructor(private http: HttpClient) { }


  getVehicleUpdateListener(){
    return this.vehicleListUpdated.asObservable();
  }
  getVehicleList(){
    this.vehicleListUpdated.next(this.vehicleList);
  }
  getVehicle(id: string){
    const uri = id;
    this.http.get<Vehicle>(uri).subscribe( vehicle =>{
      this.vehicleList.push(vehicle);
    });
  }

  getVehiclesUpdateListener() {
    return this.vehiclesUpdated.asObservable();
  }

  getVehicles(url: string) {
    const uri = url.substring(16,url.length);
    this.http.get<Vehicles>(uri).pipe(map((vehicles: Vehicles)=>{
      return {
        vehicles: vehicles.results.map(vehicle=>{
          return {
              ... vehicle,
              films: vehicle.films.map( el => {
                let id = el.substring(21, el.length-1);
                return id;
              }),
              pilots: vehicle.pilots.map(el => {
                let id = el.substring(21, el.length-1);                
                return id;
              })
            }
        })
      }
    }))
      .subscribe((vehicles)=>{
        this.vehicles = vehicles.vehicles;
        this.vehiclesUpdated.next(vehicles.vehicles);
      });
    }
}
