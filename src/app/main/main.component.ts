//fyi shared service is no longer in use
import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/services/shared/shared.service';
import { ActivatedRoute } from '@angular/router';


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
	

  constructor(private shared: SharedService, private actRoute: ActivatedRoute) 
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

    


}
