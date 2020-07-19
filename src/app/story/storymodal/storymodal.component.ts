import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-storymodal',
  templateUrl: './storymodal.component.html',
  styleUrls: ['./storymodal.component.css']
})
export class StorymodalComponent implements OnInit {

f_id: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
  	this.f_id = data.f_id;
  }

  ngOnInit(): void {
  }

}
