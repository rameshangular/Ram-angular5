import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss'],
  animations: [
  			trigger('listAnimation', [
		      transition('* => *', [
		        query(':enter', style({ opacity: 0 }), {optional: true}),
		        query(':enter', stagger('300ms', [
		          animate('1s ease-in', keyframes([
		            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
		            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
		            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
		          ]))]), {optional: true})
		      ])
		    ]),

		    trigger('scaleanimaterepeat', [
		      state('in', style({transform: 'translateX(0)'})),
		      transition('void => *', [
			      style({transform: 'translateX(-100%)'}),
			      animate(100)
			    ]),
			    transition('* => void', [
			      animate(100, style({transform: 'translateX(100%)'}))
			    ])
		    ]),



  ]
})
export class AnimationComponent implements OnInit {

  scaleStateRpeat = 'in';
  iteam=[1,2,3,4,5];
  enterleavearray= [1,2,3,4,5];
  constructor() { }
  ngOnInit() {
  }


  animatemerepeatAdd(){
  		this.enterleavearray.push(this.enterleavearray.length+1);

  }
  animatemerepeatDelete(){
  		this.enterleavearray.splice(-1);

  }

}
