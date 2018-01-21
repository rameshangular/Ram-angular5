import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ChatingComponent } from './chating/chating.component';
import { AnimationComponent } from './animation/animation.component';
import { ChartComponent } from './chart/chart.component';
import { FileuploadComponent } from './fileupload/fileupload.component';

const routes: Routes = [
			{ path: 'aboutus', component: AboutusComponent },
			{ path: 'chating', component: ChatingComponent },
			{ path: 'animation', component: AnimationComponent },
			{ path: 'chart', component: ChartComponent },
			{ path: 'file-upload', component: FileuploadComponent },
		  	{ path: '',
		    	redirectTo: '/aboutus',
		    	pathMatch: 'full'
		  	},
		  	{ path: '**', component: AboutusComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
