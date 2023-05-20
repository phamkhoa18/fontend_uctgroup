import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable  } from '@angular/core';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})


export class ApiService {

  URL_HOST = 'https://backend-uctgroup.onrender.com'

  constructor(private http : HttpClient) { }

  async post(path : String , body : any) {
      return await this.http.post( `${this.URL_HOST}${path}` , body , httpOptions) ;
  }

  async get(path : String ) {
    return await this.http.get(`${this.URL_HOST}${path}` , httpOptions);
  }
}
