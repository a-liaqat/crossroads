import { Component, OnInit } from '@angular/core';
import * as Turn from 'src/assets/js/turnjs4/lib/turn.min.js';

declare var $: any;
// declare var Turn: any;

declare function turnMethods(): any;


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})

export class BookComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  	turnMethods()

//   	$(document).ready(function() {
//             alert('we call alert from JQuery');
//        });

//   	 $("#flipbook").turn({
//   width: 400,
//   height: 300,
//   autoCenter: true
// });


  }

  turnMethods(){
  	alert("loaded");
  }



}
