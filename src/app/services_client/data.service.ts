import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})


export class DataService {
  URL : any = 'https://backend-uctgroup.onrender.com'
  constructor(private http : HttpClient) { }


  async post(path: any, body: any) {
    return await this.http.post(`${this.URL}${path}`,body , httpOptions);
  }

  async get(path : any) {
    return await this.http.get(`${this.URL}${path}`);
  }


}
