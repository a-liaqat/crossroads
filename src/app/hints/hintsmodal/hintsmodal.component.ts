import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-hintsmodal',
  templateUrl: './hintsmodal.component.html', 
  styleUrls: ['./hintsmodal.component.css']
})
export class HintsmodalComponent implements OnInit {

	f_id: string;
// ideasArr: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
  		console.log(data.f_id);
  		this.f_id = data.f_id;
      // this.ideasArr = 

  }

  ngOnInit(): void {
  }

}
