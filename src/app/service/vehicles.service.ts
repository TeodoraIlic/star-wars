import { Injectable } from '@angular/core';
import { Vehicle, Vehicles } from '../overview-page/vehicles/vehicles.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  private vehicle: Vehicle;
  private vehicles: Vehicle[];
  private vehicleUpdated= new Subject<Vehicle>();
  private vehiclesUpdated= new Subject<Vehicle[]>();
  constructor(private http: HttpClient) { }

  getVehiclesUpdateListener() {
    return this.vehiclesUpdated.asObservable();
  }

  getVehicles(url: string) {
    const uri = url.substring(16,url.length);
    this.http.get<Vehicles>(uri)
      .subscribe((vehicles)=>{
        this.vehicles = vehicles.results;
        this.vehiclesUpdated.next(vehicles.results);
        console.log(vehicles.results);
      });
    }
}
