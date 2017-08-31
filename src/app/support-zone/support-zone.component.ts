import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-support-zone',
  templateUrl: './support-zone.component.html',
  styleUrls: ['./support-zone.component.css']
})
export class SupportZoneComponent implements OnInit {

  constructor(private tranService:TranslateService) { }
  language:string="th";
  ngOnInit() {
    $('.button-collapse').sideNav(
      {
        edge:'left',
        closeOnClick:true,
        draggable:true
      }
    );
  }
  changelang(){
     this.language=this.language=="th"?"en":"th";
     this.tranService.use(this.language);
  }
}
