import { Injectable,inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { ResponeModel } from '../model/user/user.module';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class MasterService {
   userservice = inject(UserService);
   apiURL:string = 'https://api.freeprojectapi.com/api/SmartParking/'

  constructor(private http:HttpClient) { }

  getsitesbyClientId(): Observable<ResponeModel>  {
    const clientId = this.userservice.LoggedUserData.extraId;
    return this.http.get<ResponeModel>(this.apiURL+'GetSitesByClientId?id='+clientId);
    
  }
   getBuildingsbysiteId(siteId:number): Observable<ResponeModel>  {
    return this.http.get<ResponeModel>(`${this.apiURL}GetBuildingBySiteId?id=${siteId}`);
   
  }
 
  getFloorsByBuildingId(buildingId:number): Observable<ResponeModel>  {
    return this.http.get<ResponeModel>(`${this.apiURL}GetFloorsByBuildingId?id=${buildingId}`);
   
  }

   getAllParkingByFloor(floorId:number): Observable<ResponeModel>  {
    return this.http.get<ResponeModel>(`${this.apiURL}GetAllParkingByFloor?id=${floorId}`);
   
  }

  bookSpot(Obj:any): Observable<ResponeModel>
  {
    return this.http.post<ResponeModel>(`${this.apiURL}AddParking`,Obj);
  }
}
