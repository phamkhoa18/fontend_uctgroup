import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkserviceService {

  private _paramSuject : BehaviorSubject<String> = new BehaviorSubject<String>('');

  constructor(private route: ActivatedRoute) {
    
    this.route.params.subscribe((params: any) => {
      console.log(params.id);
      this._paramSuject.next(params.id); // Cập nhật giá trị mới vào BehaviorSubject
    });
  }



  get paramSuject() {
    return this._paramSuject.asObservable();
  }
}
