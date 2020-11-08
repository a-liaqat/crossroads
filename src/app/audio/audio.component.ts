// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-audio',
//   templateUrl: './audio.component.html',
//   styleUrls: ['./audio.component.css']
// })
// export class AudioComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

import { Component, OnInit } from '@angular/core';
declare var $: any;
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';
import { HostService } from 'src/app/services/host.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent implements OnInit {
title = 'micRecorder';
//Lets declare Record OBJ
public record;
//Will use this flag for toggeling recording
recording = false;
rerecording = false;
//URL of Blob
url;
error;

famObj: any;
f_id: string;
gk_name: string;
gp_name: string;
hint: string;
audio_state = "unrecorded";


constructor(private host_service: HostService, private api_service: ApiService, private domSanitizer: DomSanitizer, private actRoute: ActivatedRoute) {
  this.f_id = this.actRoute.snapshot.params.id;
  console.log(this.f_id);
}
sanitize(url: string) {
  console.log(this.domSanitizer.bypassSecurityTrustUrl(url))
	return this.domSanitizer.bypassSecurityTrustUrl(url);
}

ngOnInit(): void {
   
   this.api_service.get_family_obj(this.f_id).subscribe(
      
        // console.log(data);
        data => {
          // {alert("Succesfully Added Product details")
          this.famObj = data;
          console.log(this.famObj);
          this.findFamily(this.famObj);
        // this.findHomeViz(this.jsonObj);
      },
      error => {
        // console.error(error);
      }
    );
  }

    findFamily(obj: []) {
    let url = '';
    obj.forEach((element, index) => {
      if (element['f_id'] === this.f_id) {
        this.gk_name = element['gk_name'];
        this.gp_name = element['gp_name'];
        this.hint = element['hint'];
      }
    });
   console.log(this.gk_name);
   console.log(this.gp_name);
  }
/**
* Start recording.
*/
initiateRecording() {
if (this.rerecording==true){
  this.record.destroy(function(){});
}

this.recording = true;
this.audio_state = "recording";
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
this.rerecording = true;
this.audio_state = "recorded";
this.record.stop(this.processRecording.bind(this));
// this.record.reset(this.processRecording.bind(this));


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
