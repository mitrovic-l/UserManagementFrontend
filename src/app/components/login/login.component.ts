import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  email: string = ''
  password: string = ''
  errorMsg: string = ''
  error: string = ''
  constructor(private router: Router, private userService: UserService){ }
  
  ngOnInit(): void {
    
  }
  logIn(): void{
    const JWT = this.userService.login(this.email, this.password).subscribe( data => {
      if (JWT != null){
        localStorage.setItem('JWT', data.jwt);
        console.log("UBACEN TOKEN U LS");

        this.userService.getUser(this.email).subscribe( data => {
          this.userService.setUser(data);
        })
        if (localStorage.getItem('JWT') != null){
          const helper = new JwtHelperService();
          // @ts-ignore
          const roles = helper.decodeToken(localStorage.getItem('JWT'));
          console.log("OVO SU ROLES: " + roles.roles);
          this.userService.currentPermissions = roles.roles;
          if (roles.roles.length === 0){
            alert("Nemate ni jednu permisiju!");
          }
        }
        this.router.navigate(['/']);
      }
      else {
        this.errorMsg = 'Neispravno uneti podaci!';
      }
    }, error => {
      this.error = error.error;
    })
  }
}
