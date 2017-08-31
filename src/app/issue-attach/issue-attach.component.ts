import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IssueAttachService } from '../shared/issue/issue-attach.service';  
import { UploadService } from '../shared/user/upload.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-issue-attach',
  templateUrl: './issue-attach.component.html',
  styleUrls: ['./issue-attach.component.css'],
  providers:[IssueAttachService,UploadService]
})

export class IssueAttachComponent implements OnInit {
  imgUrl;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private issueAttachService: IssueAttachService,
    private uploadService: UploadService
  ) { }
  filesToUpload: Array<File>;
fileData=[];
  issueno:string;
  id:string="";
 
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      
       if (params['id']) {
         let id = params["id"];
         this.id = id;
         this.listFile();
       }
     });
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
    this.uploadService.makeFileRequest("attach",
      environment.apiUrl + "/issue/attach/" + this.id, 
      [], this.filesToUpload).subscribe((res) => {

        Materialize.toast('upload complete.', 1000);
        this.listFile();
        
        //this.router.navigate(['support', 'user-list']);
    });
  }
  listFile(){
    this.issueAttachService.listFile(this.id).subscribe( 
      (fileData)=>{
        this.fileData = fileData;
    } )
  }

  viewFile(fileName){
    window.open(
      `${environment.apiUrl}/issue/attach/${this.id}/${fileName}`
    )
  }
}
