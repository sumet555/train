import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';  
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers:[UserService]
})

export class UserComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService) { }

    username: string;
    password: string;
    usertype:string="";
    level:string="";
    userData = [];
    userTypeData=[];
    id: number = 0;
    mode: string = '';
    levelData = [{"id":"1"},{"id":"2"}, {"id":"3"}];
  ngOnInit() {
      //url path have parameter
      this.GetUserType();
    this.activatedRoute.params.subscribe(params => {
     
      if (params['id']) {
        let id = params["id"];
        
        this.GetDataByID(id);

        this.id = id;
        this.mode = "EDIT";


      }
    });
     setTimeout(function () {
      Materialize.updateTextFields();
      
     }, 50);
  }
  GetUserType() {
    //Reactive
    this.userService.loadUserType().subscribe(
      user => {
        this.userTypeData=user;
        
      },
      err => {
        console.log(err);
        alert(err);
      });
  }
  GetUserTypeByID(id) {
    //Reactive
    this.userService.loadUserTypeByID(id).subscribe(
      user => {
        this.usertype=user.UserType;
      },
      err => {
        console.log(err);
      });
  }
  GetDataByID(id) {
    //Reactive
    this.userService.loadItemByID(id).subscribe(
      user => {
        this.username = user.username;
        this.password = user.password;
        this.usertype=user.type;
        this.level=user.level;
      },
      err => {
        console.log(err);
      });
  }
 
  onSave() {
    let usr = {
      username: this.username,
      password: this.password,
      type:this.usertype,
      level:this.level
    }
    //alert(this.usertype);
    if (this.mode === "EDIT") {
      this.userService.UpdateItem(this.id, usr).subscribe(
        user => {
          this.router.navigate(['support', 'user-list']);
          Materialize.toast("Update Complete", 3000);
        },
        err => {
          console.log(err);
        });
    }
    else {
      this.userService.addItem(usr).subscribe(
        user => { 
          Materialize.toast('Add Item Complete', 3000);
          this.router.navigate(['support', 'user-list']);
        },
        err => {
          console.log(err);
        });


    }

  }
  onBack() {
    this.router.navigate(['support', 'user-list']);
  }
  onChange(value) {
    //this.usertype=value;
    alert(value);
    alert(this.usertype);
  }
 valueChangeLevel(level){
  this.level=level;
 }
}
