import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../environments/environment';

@Injectable()
export class IssueService {
options;
  constructor(private http:Http) { 
    let headers = new Headers({ 'Content-Type': 'application/json','Authorization':'bearer '+ localStorage.getItem('token')}); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); 
    this.options=options;
  }

  loadCompany(): Observable<any[]> {
    // let headers = new Headers({ 'Content-Type': 'application/json','Authorization':'bearer '+ localStorage.getItem('token')}); // ... Set content type to JSON
    // let options = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.get(`${environment.apiUrl}/company`,this.options)
      .map((res: Response) => {
        return   res.json();
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  loadCustomer(): Observable<any[]> {
    
    return this.http.get(`${environment.apiUrl}/customer`,this.options)
      .map((res: Response) => {
        return   res.json();
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  loadUser(): Observable<any[]> {
    return this.http.get(`${environment.apiUrl}/user`)
      .map((res: Response) => {
        return   res.json();
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  loadItem(): Observable<any[]> {
    return this.http.get(`${environment.apiUrl}/issue`)
      .map((res: Response) => {
        return   res.json();
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  loadItemByID(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/issue/findByID/${id}`)
      .map((res: Response) => {
        return   res.json();
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  addItem(body): Observable<any> {
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(`${environment.apiUrl}/issue`, body, options) // ...using post request
      .map((res: Response) => {
        return res.json()
      }) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any 
  }
  delItem(id): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/issue/${id}`) // ...using post request
      .map((res: Response) => {
        return res.json()
      }) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any 
  }
  UpdateItem(id,body): Observable<any> {
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.put(`${environment.apiUrl}/issue/${id}`, body, options) // ...using post request
      .map((res: Response) => {
        return res.json()
      }) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any 
  }
  SearchData(body){
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(`${environment.apiUrl}/issue/search`, bodyString, options) // ...using post request
      .map((res: Response) => {
        return res.json()
      }) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any 
  }  
}
