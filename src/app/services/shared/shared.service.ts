import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
	message: string;

	counter = 1;
    count: BehaviorSubject<number>;


  constructor() {
  	 this.count = new BehaviorSubject(this.counter);
   }

    nextCount() {
        this.count.next(++this.counter);
    }

  setMessage(data){
  	this.message = data;
  	return this.message;
  }

  getMessage(){
  	console.log(this.message);
  	return this.message;
  }
}
