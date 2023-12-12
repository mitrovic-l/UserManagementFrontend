import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

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
        this.router.navigate(['/']);
      }
      else {
        this.errorMsg = 'Neispravno uneti podaci!';
      }
    }, error => {
      this.errorMsg = error.error;
    })
  }
}
