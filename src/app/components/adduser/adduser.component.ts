import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User, Permission } from 'src/app/model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit{
  error: string = ''
  errorMsg: string = ''
  user: User = {
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    roles: []
  }
  roles = [
    { id: 1, role: 'can_create' },
    { id: 2, role: 'can_delete' },
    { id: 3, role: 'can_update' },
    { id: 4, role: 'can_read' }
  ];
  selectedRoles: {[key: number]: boolean} = {};
  userForm: FormGroup
  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder){
    this.userForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
    this.roles.forEach(role => {
      this.selectedRoles[role.id] = false;
    });
  }

  ngOnInit(): void {
    
  }
  addUser(){
    for (let role of this.user.roles){
      console.log(role);
    }
    let reqParamString = '';
    this.userService.addUser(this.userForm.get('email')?.value,this.userForm.get('password')?.value, this.userForm.get('firstname')?.value, this.userForm.get('lastname')?.value, this.user.roles, reqParamString)
    .subscribe( data => {
      //this.router.navigate(['/']);
    }, error => {
      alert(JSON.stringify("Korisnik sa tim emailom vec postoji."));
    })
  }
}
