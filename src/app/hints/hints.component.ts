//fyi shared service is no longer in use
import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HintsmodalComponent } from 'src/app/hints/hintsmodal/hintsmodal.component';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';
import { HostService } from 'src/app/services/host.service';
import { Subscription } from 'rxjs';
import {SharedService} from 'src/app/services/shared/shared.service';

import {MatDialog} from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-hints',
  templateUrl: './hints.component.html',
  styleUrls: ['./hints.component.css']
})
export class HintsComponent implements OnInit {

jsonObj: any;
window_subscription: Subscription;
product_id: string;
selectedIndex: string;


//connect to family db
employee= 
    {
      name: "1",
      salary: "Tshirt",
      age: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    }
    

hintArr = [
    {
      id:1,
      src:'../assets/hint-images/hint1.png',
      question:'What is something funny that happened to you in school?'
    },

    {
      id:2,
      src:'../assets/hint-images/hint2.png',
      question:'What do you remember about moving to Canada?'
    },

    {
      id:3,
      src:'../assets/hint-images/hint3.png',
      question:'What is a fun trip you took together?'
    },

    {
      id:3,
      src:'../assets/hint-images/hint4.png',
      question:'I already have a story I want to tell!'
    }
  ]

 customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['Previous', 'Next'],
    items: 1,
    nav: true,
    center: true,
  }

  constructor(private host_service: HostService, private api_service: ApiService, private shared: SharedService, public dialog: MatDialog, private actRoute: ActivatedRoute) { 
     this.product_id = this.actRoute.snapshot.params.id;

  }

  // message =  "Hey I am child 1";
   // message: string;
   // count: number;

  ngOnInit(): void {
  	// this.window_subscription = this.host_service.onWindowResize.subscribe(window => {
   //    this.refresh_layout(window.innerWidth);
   //  });
  	this.fetchVizObj();

    console.log(JSON.stringify(this.employee));


   //switch this out for own api to add hint to family
   this.api_service.get_dummy_obj(JSON.stringify(this.employee)).subscribe(
      
        // console.log(data);
        data => {alert("Succesfully Added Product details")
        // this.findHomeViz(this.jsonObj);
      },
      error => {
        console.error(error);
      }
    );

   
    // console.log(this.shared.setMessage(this.message));
    // console.log(this.shared.getMessage());
    // console.log(this.shared.getMessage());

    // this.shared.count.subscribe(c => {
    //         this.count = c;
    //     });
  }

  // nextCount() {
  //       this.shared.nextCount();
  //   }

  fetchVizObj() {
    this.api_service.get_viz_obj().subscribe(
      data => {
        console.log(data);
        this.jsonObj = data;
        // this.findHomeViz(this.jsonObj);
      },
      error => {
        //console.error(error);
      }
    );
  }


  clickFunction(event, id) {
  	console.log(id);
    //alert("clicked me!");
    this.selectedIndex = id;

    this.dialog.open(HintsmodalComponent);
  }

}
