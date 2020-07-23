import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";


@Component({
  selector: "setaside-opps-type",
  templateUrl: "./setaside-opps-type.component.html",
})
export class SetAsideByOppsTypeComponent {
  
  data = null;
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient.get('http://localhost:3000/setAsideByOppsType')
                   .subscribe(res => {
                   this.data = this.processData(res);
                   })
  }

  processData(fromApiCall){
    console.log(fromApiCall);
    let data = [];
    let hash = {};
    
    for (let i of fromApiCall){
      if(!hash[i.setaside]){
        hash[i.setaside] = {};
      }
      hash[i.setaside][i.type] = i.count;
    }

    for (let type of Object.keys(hash)){
      let a = hash[type];
      a.setaside = type;
      data.push(a)
    }
    console.log(data);
  }

  getFormData(evt) {
    console.log(evt);
  }
}
