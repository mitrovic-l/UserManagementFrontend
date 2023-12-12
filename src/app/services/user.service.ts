import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JWT, User} from "../model";
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

   getUsers(): Observable<User[]> {
    const headers = { 'Authorization': 'Bearer ' +  localStorage.getItem("jwt")};
    return this.httpClient.get<User[]>(`${this.apiUrl}/user/all`, {headers});
   }
   
}
