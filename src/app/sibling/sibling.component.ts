import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-sibling',
  templateUrl: './sibling.component.html',
  styleUrls: ['./sibling.component.scss']
})
export class SiblingComponent implements OnInit {

	message: string;
  constructor(private dataservice: DataService) { }

  ngOnInit() {
  	this.dataservice.currentmessage.subscribe(message=> this.message = message);
  }

}
