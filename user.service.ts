import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserModule } from '../model/user/user.module';
import { UserModule } from '../model/user/user.module';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  LoggedUserData!:IUserModule;

  constructor(private http:HttpClient) {

    const userloggedData = localStorage.getItem("parkuser");
    if(userloggedData)
    {
      this.LoggedUserData = JSON.parse(userloggedData);
    }
   }

  loginuser(user:UserModule):Observable<IUserModule>
  {
    return this.http.post<IUserModule>("https://api.freeprojectapi.com/api/SmartParking/login",user)
  }
}


