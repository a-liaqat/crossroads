//fyi shared service is no longer in use
import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit, Inject } from '@angular/core';
import { HintsmodalComponent } from 'src/app/hints/hintsmodal/hintsmodal.component';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';
import { HostService } from 'src/app/services/host.service';
import { Subscription } from 'rxjs';
import {SharedService} from 'src/app/services/shared/shared.service';

import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-hints',
  templateUrl: './hints.component.html',
  styleUrls: ['./hints.component.css']
})
export class HintsComponent implements OnInit {

jsonObj: any;
window_subscription: Subscription;
selectedIndex: string;

famObj: any;
f_id: string;
gk_name: string;
gp_name: string;
hint: string;
selectedHint: any;
stringifiedData: any;  


//connect to family db
employee= 
    {
      name: "1",
      salary: "Tshirt",
      age: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    }
    

hintArr = [
    {
      id:0,
      src:'../assets/hint-images/hint1.png',
      question: 'what is something funny that happened to you in school?'
    },

    {
      id:1,
      src:'../assets/hint-images/hint2.png',
      question:'what do you remember about moving to Canada?'
    },

    {
      id:2,
      src:'../assets/hint-images/hint3.png',
      question:'what is a fun trip you took together?'
    },

    {
      id:3,
      src:'../assets/hint-images/hint4.png',
      question:'do you already have a story you want to tell?'
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
     this.f_id = this.actRoute.snapshot.params.id;
     console.log(this.f_id);



  }

  // message =  "Hey I am child 1";
   // message: string;
   // count: number;

  ngOnInit(): void {
  	// this.window_subscription = this.host_service.onWindowResize.subscribe(window => {
   //    this.refresh_layout(window.innerWidth);
   //  });
  	

    // this.fetchVizObj();

    // console.log(JSON.stringify(this.employee));


   //switch this out for own api to add hint to family

   setTimeout (() => {
         
     
   do {
   this.api_service.get_family_obj(this.f_id).subscribe(
      
        // console.log(data);
        data => {
          this.famObj = data;
          console.log(this.famObj);
          this.findFamily(this.famObj);
        // this.findHomeViz(this.jsonObj);
        console.log(this.gk_name)
      },
      error => {
        // console.error(error);
      }
    );
 }

 while (this.gk_name);

    }, 500);
   
  }

 

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
  }

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
  	// console.log(id);
    //alert("clicked me!");

    //remember to add hint to db
    this.selectedIndex = id;

    this.selectedHint = {
    "f_id": this.f_id,
    "hint": this.hintArr[this.selectedIndex].question
  }
  this.stringifiedData = JSON.stringify(this.selectedHint);  

  
  console.log(this.stringifiedData);
  
  this.api_service.get_dummy_obj(this.selectedHint).subscribe(
      
      error => {
        console.error(error);
      }
    );

    this.dialog.open(HintsmodalComponent, {
      data: { f_id: this.f_id },

      });
    
  }

}

// @Component({
//   selector: 'app-hintsmodal',
//   templateUrl: 'hintsmodal/hintsmodal.component.html', 
//   styleUrls: ['hintsmodal/hintsmodal.component.css']
// })
// export class HintsmodalComponent{

//   constructor(@Inject(MAT_DIALOG_DATA) public data: any, private actRoute: ActivatedRoute) { 
//       console.log(data.f_id);

//   }


// }

