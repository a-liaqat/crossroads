import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit, Inject } from '@angular/core';
import { StorymodalComponent } from 'src/app/story/storymodal/storymodal.component';

import { ActivatedRoute } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';
import { HostService } from 'src/app/services/host.service';
import { Subscription } from 'rxjs';
import {SharedService} from 'src/app/services/shared/shared.service';
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';

import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

famObj: any;
f_id: string;
gk_name: string;
gp_name: string;
hint: string;
idea_index = 0;

stringifiedData: any;

public record;
//Will use this flag for toggeling recording
recording = false;
//URL of Blob
url;
error;

ideasArr = [
    {
      id:0,
      idea: "_gk_, what's a good title for your story? Can you make a title page?"
    },

    {
      id:1,
      idea:'_gp_, what is a lesson you want _gk_ to learn from this story? Can you add it to the story _gk_?'
    },

    {
      id:2,
      idea:'_gp_, what is a detail that is missing from this story? Can you help _gk_ add it?'
    },

    {
      id:3,
      idea:"_gk_, what is something you don't know about _gp_'s life? Can you show it in the story?"
    },
    {
     id:4,
      idea:'_gp_, what is a piece of advice you can give _gk_? Can you add it to the story _gk_?'
    },
    {
     id:5,
      idea:'_gp_ and _gk_, what are the biggest differences between Canada and back home? Can you show it in the story?'
    }
  ]  

  constructor(private host_service: HostService, private api_service: ApiService, public dialog: MatDialog, private actRoute: ActivatedRoute, private domSanitizer: DomSanitizer) { 
  		this.f_id = this.actRoute.snapshot.params.id;
      this.idea_index = this.ideasArr.length-1;

  }

  sanitize(url: string) {
  return this.domSanitizer.bypassSecurityTrustUrl(url);
}

  ngOnInit(): void {

  	setTimeout (() => {
         
     
   
   this.api_service.get_family_obj(this.f_id).subscribe(
      
        // console.log(data);
        data => {
          this.famObj = data;
          console.log(this.famObj);
          this.findFamily(this.famObj);
        // this.findHomeViz(this.jsonObj);
      },
      error => {
        // console.error(error);
      }
    );

    }, 250);
   
  }

 
// find family and also replace array. will totally split these functions later
  findFamily(obj: []) {
    let url = '';
    obj.forEach((element, index) => {
      if (element['f_id'] === this.f_id) {
        this.gk_name = element['gk_name'];
        this.gp_name = element['gp_name'];
      }
    });
   console.log(this.gk_name);
   console.log(this.gp_name);

   for (var i = 0; i < this.ideasArr.length; i++) {
          var gk_str = this.ideasArr[i].idea
          var gk_re = /_gk_/gi;  
          var gk_newstr = gk_str.replace(gk_re, this.gk_name);
          // var gk_newstr = gk_str.split(gk_re).join(this.gk_name)
          this.ideasArr[i].idea = gk_newstr

          var gp_str = this.ideasArr[i].idea
          var gp_re = /_gp_/gi;  
          var gp_newstr = gp_str.replace(gp_re, this.gp_name);
          this.ideasArr[i].idea = gp_newstr

          console.log(this.ideasArr[i].idea);

      }
  }

  clickFunction(event) {

    this.idea_index = this.idea_index + 1;
    if (this.idea_index == this.ideasArr.length){
      this.idea_index = 0;
    }

    

  	this.dialog.open(StorymodalComponent, {
      data: { idea_index: this.idea_index,
              ideasArr: this.ideasArr

       },

      });

    
  }

  /**
* Start recording.
*/
initiateRecording() {
this.recording = true;
let mediaConstraints = {
video: false,
audio: true
};
navigator.mediaDevices.getUserMedia(mediaConstraints).then(this.successCallback.bind(this), this.errorCallback.bind(this));
}
/**
* Will be called automatically.
*/
successCallback(stream) {
var options = {
mimeType: "audio/wav",
numberOfAudioChannels: 1
};
//Start Actuall Recording
var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
this.record = new StereoAudioRecorder(stream, options);
this.record.record();
}
/**
* Stop recording.
*/
stopRecording() {
  
this.recording = false;
this.record.stop(this.processRecording.bind(this));
this.record.reset(this.processRecording.bind(this));


}

/**
* processRecording Do what ever you want with blob
* @param  {any} blob Blog
*/
processRecording(blob) {
this.url = URL.createObjectURL(blob);
// this.record.save('audio.wav');


// this.record.invokeSaveAsDialog(blob, '');
// var data = new FormData();
// data.append('blob', blob);
console.log("blob", blob);
// console.log("data", data);
console.log("url", this.url);

}
/**
* Process Error.
*/
errorCallback(error) {
this.error = 'Can not play audio in your browser';
}


}
