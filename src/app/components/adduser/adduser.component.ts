import { Component } from '@angular/core';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent {
  firstname: string = ''
  lastname: string = ''
  email: string = ''
  password: string = ''
  error: string = ''
  errorMsg: string = ''
}
