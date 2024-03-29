import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
//import { AppConfigService } from '../providers/app-config.service';
//import { AppConfigProperties } from '../interfaces/app-config';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // readonly base_url: string = 'https://flatteningthecurve-staging.herokuapp.com/'
  // readonly base_url: string = 'https://flatteningthecurve.herokuapp.com/'
  // readonly base_url: string = 'http://flattening-the-curve-backend-staging.apps.hmf.q7z3.p1.openshiftapps.com/'
  // readonly base_url: string = 'http://flattening-the-curve-backend-review-nochange-ajb0od.apps.hmf.q7z3.p1.openshiftapps.com/'
  // readonly base_url: string = this.appConfigProperties.base_url
  //
  //
  // readonly viz_object_endpoint: string = 'http://flattening-the-curve-backend.apps.hmf.q7z3.p1.openshiftapps.com/api/viz'
  readonly viz_object_endpoint: string = 'https://flatteningthecurve-staging.herokuapp.com/api/viz';
  
  readonly dummy_endpoint: string = 'https://crossroads-api.herokuapp.com/persons';


  // readonly plot_object_endpoint: string = this.appConfigProperties.base_url + 'api/plots';
  // readonly data_object_endpoint: string = this.appConfigProperties.base_url + 'api/source';
  // readonly team_object_endpoint: string = this.appConfigProperties.base_url + 'api/team';
  // readonly results_endpoint: string = this.appConfigProperties.base_url + 'covid/results'
  // readonly phu_endpoint: string = this.appConfigProperties.base_url + 'covid/phu';
  // readonly phunew_endpoint: string = this.appConfigProperties.base_url + 'covid/phunew';
  // readonly test_results_endpoint: string = this.appConfigProperties.base_url + 'covid/testresults';


  // appConfigProperties: AppConfigProperties;

  constructor(private http_client: HttpClient) {
    
  }

  post_family_obj(family) {
    return this.http_client.post(this.dummy_endpoint, family);
  }

  get_family_obj(f_id: string) {
    let params = new HttpParams().set("f_id", f_id);
    
    // params = params.append('f_id', f_id);
    // params = {
    //   "f_id": f_id
    // }
    return this.http_client.get(this.dummy_endpoint);
  }

  get_twitter_obj() {
    //return this.http_client.get(this.appConfigProperties.twitter_object_endpoint);
  }

  get_data_obj() {
    //return this.http_client.get(this.appConfigProperties.data_object_endpoint);
  }

  get_plot_obj() {
    //this.request_data(this.viz_object_endpoint, on_success, on_error);
    //return this.http_client.get(this.appConfigProperties.plot_object_endpoint);
  }

  get_viz_obj() {
    // return this.request_data(this.viz_object_endpoint);
    //return this.http_client.get(this.appConfigProperties.viz_object_endpoint);
    return this.http_client.get(this.viz_object_endpoint);

  }

  get_dummy_obj(user: string) {
    return this.http_client.post(this.dummy_endpoint, user);
  }


  get_team_obj() {
    //this.request_data(this.viz_object_endpoint, on_success, on_error);
    //return this.http_client.get(this.appConfigProperties.team_object_endpoint);
  }

  get_results_data(on_success, on_error) {
    //this.request_data(this.appConfigProperties.results_endpoint, on_success, on_error);
  }

  get_phu_data(on_success, on_error) {
    //this.request_data(this.appConfigProperties.phu_endpoint, on_success, on_error);
  }

  get_phunew_data(on_success, on_error) {
    //this.request_data(this.appConfigProperties.phunew_endpoint, on_success, on_error);
  }

  get_test_results_data(on_success, on_error) {
    //this.request_data(this.appConfigProperties.test_results_endpoint, on_success, on_error);
  }

  private request_data(endpoint, on_success, on_error) {
    const sub = this.http_client.get(endpoint).subscribe(response => {
      sub.unsubscribe();
      if (on_success) {
        on_success(response);
      }
    }, error => {
      sub.unsubscribe();
      if (on_error) {
        on_error(error);
      }
    });
  }
}
