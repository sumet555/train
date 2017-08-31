import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IssueService } from '../issue.service';
import{Issue} from '../shared/issue/issue';
import { UploadService } from '../shared/user/upload.service';
import { environment } from '../../environments/environment';
import * as shortid from 'shortid';
@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css'],
  providers:[IssueService,UploadService]

})
export class IssueComponent implements OnInit, AfterViewInit {
issue:Issue;
imgUrl;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private issueService: IssueService,
    private uploadService: UploadService
  ) {
    this.issue=new Issue();
   }

 
  id:string;
  filesToUpload = [];
  custData = [];
  compData=[];
  userData=[];
  statusData = [{"status":"active"},{"status":"inactive"}];
  //id: number = 0;
  mode: string = '';
  ngOnInit() {
    this.GetCompany();
    this.GetCust();
    this.GetUser();
    this.issue.issueno=shortid.generate();
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        let id = params["id"];
        this.GetDataByID(id);
        this.id = id;
        this.mode = "EDIT";
      }
    });
    
  }
  ngAfterViewInit(){
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: false // Close upon selecting a date,
    });
    //$('#textarea1').val('New Text');
    $('#textarea1').trigger('autoresize');
  }
  GetCompany() {
    //Reactive
    this.issueService.loadCompany().subscribe(
      comp => {
        this.compData=comp;
      },
      err => {
        console.log(err);
        alert(err);
      });
  }
  GetCust() {
    //Reactive
    this.issueService.loadCustomer().subscribe(
      cust => {
        this.custData=cust;
      },
      err => {
        console.log(err);
        alert(err);
      });
  }
  GetUser() {
    //Reactive
    this.issueService.loadUser().subscribe(
      user => {
        this.userData=user;
      },
      err => {
        console.log(err);
        alert(err);
      });
  }
  GetDataByID(id) {
    //Reactive
    this.issueService.loadItemByID(id).subscribe(
      issue => {
      
        this.issue=issue;
      },
      err => {
        console.log(err);
      });
  }
  onSave() {
   
    if (this.mode === "EDIT") {
      delete this.issue._id;
      this.issueService.UpdateItem(this.id, this.issue).subscribe(
        data => {

          this.router.navigate(['support', 'issue-list']);
          Materialize.toast("Update Complete", 3000);
        },
        err => {
          console.log(err);
        });
    }
    else {
     
      this.issueService.addItem(this.issue).subscribe(
        data => { 
          //this.id = data.insertedIds;
          //this.upload();
          Materialize.toast('Add Item Complete', 3000);
          // let id=data.insertedIds;
          // this.issueService.loadItemByID(id).subscribe(
          //   issue => {
               this.router.navigate(['support', 'issue-attach',this.issue.issueno]);
          //   },
          //   err => {
          //     console.log(err);
          //   });
          
        },
        err => {
          console.log(err);
        });


    }

  }
  onBack() {
    this.router.navigate(['support', 'issue-list']);
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
