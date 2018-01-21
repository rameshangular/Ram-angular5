import { Component, OnInit, Input, EventEmitter, Output, HostListener } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {

  errors: Array<string> =[];
  dragAreaClass: string = 'dragarea';
  @Input() projectId: number = 0;
  @Input() sectionId: number = 0;
  @Input() fileExt: string = "txt";
  @Input() maxFiles: number = 5;
  @Input() maxSize: number = 5; // 5MB
  @Output() uploadStatus = new EventEmitter();

  constructor(private http: Http) { }

  ngOnInit() { }

	filesToUpload: Array<File> = [];
 	onFileChange(event){
	   // let files = event.target.files; 
	   this.filesToUpload = <Array<File>>event.target.files;
	   this.saveFiles(this.filesToUpload);
	}
	upload(files){
				
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });
        return  this.http.post('http://localhost:3003/upload', files)
                 .map(response => response.json())
                 .catch(error => Observable.throw(error));
  }

	saveFiles(files){
	  this.errors = []; // Clear error
	  // Validate file size and allowed extensions
	  if (files.length > 0 && (!this.isValidFiles(files))) {
	      this.uploadStatus.emit(false);
	      return;
	  }       
	  if (files.length > 0) {
	        const formData: any = new FormData();
		      const files: Array<File> = this.filesToUpload;
		      for(let i =0; i < files.length; i++){
		          formData.append("uploads[]", files[i], files[i]['name']);
		      }
		      console.log('form data variable :   '+ formData.toString());
          this.upload(formData).subscribe(
            success => {
              this.uploadStatus.emit(true);
              console.log(success)
            },
            error => {
                this.uploadStatus.emit(true);
                this.errors.push(error.ExceptionMessage);
            }) 
	    } 
	}
	private isValidFiles(files){
	   // Check Number of files
	    if (files.length > this.maxFiles) {
	        this.errors.push("Error: At a time you can upload only " + this.maxFiles + " files");
	        return;
	    }        
	    this.isValidFileExtension(files);
	    return this.errors.length === 0;
	}

	private isValidFileExtension(files){
	  // Make array of file extensions
	  var extensions = (this.fileExt.split(','))
	                  .map(function (x) { return x.toLocaleUpperCase().trim() });
	  for (var i = 0; i < files.length; i++) {
	      // Get file extension
	      var ext = files[i].name.toUpperCase().split('.').pop() || files[i].name;
	      // Check the extension exists
	      var exists = extensions.includes(ext);
	      console.log(exists);
	      if (!exists) {
	          this.errors.push("Error (Extension): " + files[i].name);
	      }
	      // Check file size
	      this.isValidFileSize(files[i]);
	  }
	}

	private isValidFileSize(file) {
	      var fileSizeinMB = file.size / (1024 * 1000);
	      var size = Math.round(fileSizeinMB * 100) / 100; // convert upto 2 decimal place
	      if (size > this.maxSize)
	          this.errors.push("Error (File Size): " + file.name + ": exceed file size limit of " + this.maxSize + "MB ( " + size + "MB )");
	}

/**
 * [HostListener Handliing Drad and Drop]
 * @param {[type]} 'dragover' [description]
 * @param {[type]} '$event']) onDragOver(event [description]
 */
	@HostListener('dragover', ['$event']) onDragOver(event) {
	    this.dragAreaClass = "droparea";
	    event.preventDefault();
	}
	@HostListener('dragenter', ['$event']) onDragEnter(event) {
	    this.dragAreaClass = "droparea";
	    event.preventDefault();
	}
	@HostListener('dragend', ['$event']) onDragEnd(event) {
	    this.dragAreaClass = "dragarea";
	    event.preventDefault();
	}

	@HostListener('dragleave', ['$event']) onDragLeave(event) {
	    this.dragAreaClass = "dragarea";
	    event.preventDefault();
	}
	@HostListener('drop', ['$event']) onDrop(event) {   
	    this.dragAreaClass = "dragarea";           
	    event.preventDefault();
	    event.stopPropagation();
	    var files = event.dataTransfer.files;
	    this.saveFiles(files);
	}




}
