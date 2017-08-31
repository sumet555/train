import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../environments/environment';

@Injectable()
export class CustomerService {

  constructor(private http: Http) { }

  loadItem(): Observable<any[]> {
    let headers = new Headers({ 'Content-Type': 'application/json','Authorization':'bearer '+ localStorage.getItem('token')}); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.get(`${environment.apiUrl}/customer`,options)
      .map((res: Response) => {
        return   res.json();
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  loadCompany(): Observable<any[]> {
    let headers = new Headers({ 'Content-Type': 'application/json','Authorization':'bearer '+ localStorage.getItem('token')}); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.get(`${environment.apiUrl}/company`,options)
      .map((res: Response) => {
        return   res.json();
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  loadItemByID(id): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json','Authorization':'bearer '+ localStorage.getItem('token')}); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.get(`${environment.apiUrl}/customer/findByID/${id}`,options)
      .map((res: Response) => {
        return   res.json();
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  addItem(body): Observable<any> {
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json','Authorization':'bearer '+ localStorage.getItem('token')});  // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(`${environment.apiUrl}/customer`, body, options) // ...using post request
      .map((res: Response) => {
        return res.json()
      }) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any 
  }

  delItem(id): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json','Authorization':'bearer '+ localStorage.getItem('token')}); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.delete(`${environment.apiUrl}/customer/${id}`,options) // ...using post request
      .map((res: Response) => {
        return res.json()
      }) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any 
  }

  UpdateItem(id,body): Observable<any> {
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json','Authorization':'bearer '+ localStorage.getItem('token')}); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.put(`${environment.apiUrl}/customer/${id}`, body, options) // ...using post request
      .map((res: Response) => {
        return res.json()
      }) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any 
  }

  SearchData(body){
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json','Authorization':'bearer '+ localStorage.getItem('token')}); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(`${environment.apiUrl}/customer/search`, bodyString, options) // ...using post request
      .map((res: Response) => {
        return res.json()
      }) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any 
  } 
}
