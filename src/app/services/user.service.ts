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
