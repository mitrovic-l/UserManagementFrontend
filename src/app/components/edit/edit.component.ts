import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User, Permission } from 'src/app/model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{
  permissions = [
    { id: 1, role: 'can_create' },
    { id: 2, role: 'can_delete' },
    { id: 3, role: 'can_update' },
    { id: 4, role: 'can_read' }
  ]
  userForm: FormGroup
  errorMsg: string = ''
  error: string = ''
  roleIDs: number[] = []
  canCreate: boolean = false
  canDelete: boolean = false
  canUpdate: boolean = false
  canRead: boolean = false
  userPassword: string = ''
  userId: number = 0
  userEmail: string = ''

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder){
    this.userForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required]
    })
  }
  ngOnInit(): void {

    //this.userService.findUser()
    let url = this.router.url;

    let userEmail = '';
    //@ts-ignore
    userEmail = url.split('/').pop();
    this.userEmail = userEmail
    this.userService.findUser(userEmail).subscribe( data => {
      const user = data;
      const roles = user.roles
      for (let role of roles) {
        console.log(role.role);
        this.permissions.push(role);
        if (role.role === 'can_create'){
          this.canCreate = true;
        }
        if (role.role === 'can_update'){
          this.canUpdate = true;
        }
        if (role.role === 'can_read'){
          this.canRead = true;
        }
        if (role.role === 'can_delete'){
          this.canDelete = true;
        }
      }

      this.userForm.setValue({
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname
      })
      this.userPassword = user.password;
    })
    // console.log("this.user: " + JSON.stringify(this.email));
  }
  editUser(){
    console.log("STANJE: " +  JSON.stringify(this.permissions));
    for (let role in this.permissions){
      console.log(role);
      
    }
    let url = this.router.url;

    let userEmail = '';
    //@ts-ignore
    userEmail = url.split('/').pop();
    this.userService.findUser(userEmail).subscribe( data => {
      console.log(JSON.stringify(data));
      const user1 = data
      this.userId = user1.id;
      this.userService.updateUser(this.userForm.get('email')?.value, this.userPassword, this.userForm.get('firstname')?.value, this.userForm.get('lastname')?.value, this.permissions, this.userId).subscribe( data => {
        this.router.navigate(['/'])
      }, error => {
        alert(JSON.stringify(error))
      })
    });
    
  }
}
