import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JWT, User, Permission, RoleType} from "../model";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = environment.postApi
  currentPermissions: string[] = []
  private currentUser: User;

  constructor(private httpClient: HttpClient) {
    //@ts-ignore
    this.currentUser = null;
   }

   login(email: string, password: string){
    return this.httpClient.post<JWT>(`${this.apiUrl}/auth/login`, {
      email: email,
      password: password
    })
   }

   addUser(email: string, password: string, firstname: string, lastname: string, roles: Permission[], query: string){
    const headers = { 'Authorization': 'Bearer ' +  localStorage.getItem("JWT")};
    let reqParamString = '';
    if (roles.length > 0){
      console.log("IMAM ROLE DA DODAM");
      console.log(reqParamString);
      
      reqParamString = reqParamString.concat('&roleIDs=');
      for (let roleID of roles) {
        if (roles.indexOf(roleID)+1 != roles.length){
          reqParamString = reqParamString.concat(roleID.toString() + '&roleIDs=')
        } else {
          reqParamString = reqParamString.concat(roleID.toString());
        }
      }
    }
    let fullUrl = `${this.apiUrl}/user`.concat('?roleIDs=0')
    if (reqParamString !== ''){
      fullUrl = fullUrl.concat(reqParamString)
    }
    return this.httpClient.post<User>(fullUrl, {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      roles: []
    }, {headers});
   }

   getUser(email: string){
    const headers = { 'Authorization': 'Bearer ' +  localStorage.getItem("JWT")};
    return this.httpClient.get<User>(`${this.apiUrl}/user/find/`+email, {headers});
   }
   setUser(user: User){
    this.currentUser = user;
   }

   getUsers(): Observable<User[]> {
    const headers = { 'Authorization': 'Bearer ' +  localStorage.getItem("JWT")};
    return this.httpClient.get<User[]>(`${this.apiUrl}/user/all`, {headers});
   }
   getPermissionsForUser(userId: number){
    const headers = { 'Authorization': 'Bearer ' +  localStorage.getItem("JWT")};
    return this.httpClient.get<Permission[]>(`${this.apiUrl}/user/roles/`+userId, {headers});
   }
   deleteUser(userId: number): Observable<any>{
    const headers = { 'Authorization': 'Bearer ' +  localStorage.getItem("JWT")};
    return this.httpClient.delete<any>(`${this.apiUrl}/user/delete/`+userId, {headers});
    }
   
}
