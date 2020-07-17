//fyi shared service is no longer in use
import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/services/shared/shared.service';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';
import { HostService } from 'src/app/services/host.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

	// Products = [
 //    {
 //      id: "1",
 //      name: "Tshirt",
 //      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
 //    },
 //    {
 //      id: "2",
 //      name: "Shoes",
 //      description: "Proin ac metus in diam porttitor viverra eu sit amet ligula."
 //    },
 //    {
 //      id: "3",
 //      name: "Handbags",
 //      description: "Duis sodales dui vitae urna varius, at ullamcorper purus tempor."
 //    }
 //  ]

	// count: number;

f_id: string;
gk_name: string;
gp_name: string;
family: any;
stringifiedData: any;  


	

  constructor(private shared: SharedService, private actRoute: ActivatedRoute, private host_service: HostService, private api_service: ApiService) 
  { 
  	 // this.product_id = this.actRoute.snapshot.params.id;
  }

  // message: string;
  // message =  "Hey I am child 1";
  
	

  ngOnInit(): void {
  	//this.message = this.shared.getMessage();
  	// this.message = 'sup';
  	// console.log(this.shared.getMessage());
  	// console.log(this.shared.setMessage(this.message));
   //  console.log(this.shared.getMessage());

   //  this.shared.count.subscribe(c => {
   //          this.count = c;
   //      });
  }

  // nextCount() {
  //       this.shared.nextCount();
  //   }

  OnInputID(event: any) {
this.f_id = event.target.value;
console.log(this.f_id);
this.f_id = event.target.value;
}

  OnInputGkName(event: any) {
this.gk_name = event.target.value;
console.log(this.gk_name);
//send to db

}

  OnInputGpName(event: any) {
this.gp_name = event.target.value;
console.log(this.gp_name);

}

form_submit(){
  //create user in db.
  // console.log("clicked me");
  this.family = {
  "f_id": this.f_id,
  "gk_name": this.gk_name,
  "gp_name": this.gp_name,
  "hint": ""
  }
  this.stringifiedData = JSON.stringify(this.family);  

  console.log(this.family);
  console.log(this.stringifiedData);
  //AAAAH IT WORKS!!
  this.api_service.get_dummy_obj(this.family).subscribe(
      
        // console.log(data);
        data => {alert("Succesfully Added Product details")
        // this.findHomeViz(this.jsonObj);
      },
      error => {
        console.error(error);
      }
    );

  

}

    


}
