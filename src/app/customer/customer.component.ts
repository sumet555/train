import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer.service'

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers:[CustomerService]
})
export class CustomerComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private custService: CustomerService,
   
  ) { }

    custCode: string;
    custName: string;
    company:string="";
    custData = [];
    compData=[];
    id: number = 0;
    mode: string = '';
  ngOnInit() {
    this.GetCompData();
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
  GetCompData() {
    
    this.custService.loadCompany().subscribe(
      comp => {
        this.compData=comp;
      },
      err => {
        console.log(err);
        alert(err);
      });
  }
  GetDataByID(id) {
    //Reactive
    this.custService.loadItemByID(id).subscribe(
      cust => {
        this.custCode = cust.customercode;
        this.custName = cust.customername;
        this.company=cust.company;
      },
      err => {
        console.log(err);
      });
  }

  onSave() {
    let cust = {
      customercode: this.custCode,
      customername: this.custName,
      company:this.company
    }
    if (this.mode === "EDIT") {
      this.custService.UpdateItem(this.id, cust).subscribe(
        user => {
          this.router.navigate(['support', 'customer-list']);
          Materialize.toast("Update Complete", 3000);
        },
        err => {
          console.log(err);
        });
    }
    else {
      this.custService.addItem(cust).subscribe(
        user => { 
          Materialize.toast('Add Item Complete', 3000);
          this.router.navigate(['support', 'customer-list']);
        },
        err => {
          console.log(err);
        });


    }

  }
  onBack() {
    this.router.navigate(['support', 'customer-list']);
  }

}
