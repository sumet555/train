import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IssueService } from '../issue.service'
@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css'],
  providers:[IssueService]

})
export class IssueComponent implements OnInit, AfterViewInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private issueService: IssueService,
  ) { }

  company:string="";
  customer:string="";
  title:string;
  desc:string;
  user:string="";
  status:string="";
  subtype:string="";
  _datetime:string="";

  custData = [];
  compData=[];
  userData=[];
  statusData = [{"status":"active"},{"status":"inactive"}];
  subtypeData = [{"id":"SubType A"},{"id":"SubType B"}];
  id: number = 0;
  mode: string = '';
  ngOnInit() {
    this.GetCompany();
    this.GetCust();
    this.GetUser();
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
        this.company = issue.company;
        this._datetime = issue.datetime;
        this.customer=issue.customer;
        this.title=issue.title;
        this.desc=issue.desc;
        this.user=issue.user;
        this.status=issue.status;
        this.subtype=issue.subtype
      },
      err => {
        console.log(err);
      });
  }
  onSave() {
    let issue = {
      company: this.company,
      datetime: this._datetime,
      customer:this.customer,
      title:this.title,
      desc:this.desc,
      user:this.user,
      status:this.status,
      subtype:this.subtype
    }
    //alert(this.usertype);
    if (this.mode === "EDIT") {
      this.issueService.UpdateItem(this.id, issue).subscribe(
        user => {
          this.router.navigate(['support', 'issue-list']);
          Materialize.toast("Update Complete", 3000);
        },
        err => {
          console.log(err);
        });
    }
    else {
      this.issueService.addItem(issue).subscribe(
        user => { 
          Materialize.toast('Add Item Complete', 3000);
          this.router.navigate(['support', 'issue-list']);
        },
        err => {
          console.log(err);
        });


    }

  }
  onBack() {
    this.router.navigate(['support', 'issue-list']);
  }

  ngAfterViewInit(){
    (function($){
      $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year,
        today: 'Today',
        clear: 'Clear',
        close: 'Ok',
        closeOnSelect: false // Close upon selecting a date,
      });
      $('input#input_text, textarea#textarea1').characterCounter();
    }); // end of jQuery name space
      
  }
}
