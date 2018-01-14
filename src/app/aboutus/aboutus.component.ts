import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss'],
})
export class AboutusComponent implements OnInit {

	  message: string;
  	constructor(private dataservice: DataService) { }
    list;
		ngOnInit() {
	  	this.dataservice.currentmessage.subscribe(message=> this.message = message);
  	}

  	
}
