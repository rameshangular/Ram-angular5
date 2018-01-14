import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
 
@Injectable()
export class DataService {

	private	 message = new BehaviorSubject<string>("Default message");
	currentmessage = this.message.asObservable();

	constructor() { }
 
	changemessage(msg: string){
		this.message.next(msg);
	}

}
