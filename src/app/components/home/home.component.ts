import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model';
import { UserService } from 'src/app/services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  users: User[] = [];
  currentRoles: string[] = [];

  constructor(private userService: UserService, private router: Router){}

  ngOnInit(): void {
    if (localStorage.getItem('JWT') != null){
      const helper = new JwtHelperService();
      // @ts-ignore
      const roles = helper.decodeToken(localStorage.getItem('JWT'));
      console.log("OVO SU ROLES: " + roles.roles);
      this.currentRoles = roles.roles;
    }
    this.userService.getUsers().subscribe( data => {
      for (let d of data){
        d.password = '';
        this.users.push(d);
      }
      console.log("USERS: " + JSON.stringify(this.users));
    })
  }
  delete(id: number){
    
  }

}
