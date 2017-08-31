import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';  
import{User} from '../shared/user/user';
import { UploadService } from '../shared/user/upload.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers:[UserService,UploadService] //ตั้งให้ใช้คนเดียว
})

export class UserComponent implements OnInit {
user:User;
imgUrl;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private uploadService: UploadService
     ) { 
       this.user=new User();
     }
     id:object;
     filesToUpload = [];
    username: string;
    password: string;
    usertype:string="";
    level:string="";
    userData = [];
    userTypeData=[];
    mode: string = '';
    //levelData = [{"id":"1"},{"id":"2"}, {"id":"3"}];

  ngOnInit() {
      //url path have parameter
    //   this.GetUserType();
    this.activatedRoute.params.subscribe(params => {
     
      if (params['id']) {
        let id = params["id"];
        
        this.GetDataByID(id);
        this.imgUrl ="http://localhost:3000/user/profile/"+ id;
        this.id = id;
        this.mode = "EDIT";


      }
    });
    //  setTimeout(function () {
    //   Materialize.updateTextFields();
      
    //  }, 50);
    
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
        // this.username = user.username;
        // this.password = user.password;
        // this.usertype=user.type;
        // this.level=user.level;
        this.user = user;
      },
      err => {
        console.log(err);
      });
  }
 
  onSave() {
    // let usr = {
    //   username: this.username,
    //   password: this.password,
    //   type:this.usertype,
    //   level:this.level
    // }
    //alert(this.usertype);
    if (this.mode === "EDIT") {
      delete this.user._id;
      this.userService.UpdateItem(this.id, this.user).subscribe(
        user => {
          this.router.navigate(['support', 'user-list']);
          Materialize.toast("Update Complete", 3000);
        },
        err => {
          console.log(err);
        });
    }
    else {
      this.userService.addItem(this.user).subscribe(
        user => { 
          Materialize.toast('Add Item Complete', 3000);
          this.id = user.insertedIds;
          this.upload();
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
  fileChangeEvent(fileInput) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
  readUrl(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.onload = (event) => {
        this.imgUrl = event.target["result"];
      }
  
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  upload() {
    this.uploadService.makeFileRequest(
      "avatar",
      environment.apiUrl + "/user/profile/" + this.id, 
      [], this.filesToUpload).subscribe((res) => {
        Materialize.toast('save complete.', 1000);
        this.router.navigate(['support', 'user-list']);
    })
  }

}
