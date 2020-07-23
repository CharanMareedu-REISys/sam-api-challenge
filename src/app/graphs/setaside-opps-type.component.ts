import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";


@Component({
  selector: "setaside-opps-type",
  templateUrl: "./setaside-opps-type.component.html",
})
export class SetAsideByOppsTypeComponent {
  
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient.get('http://localhost:3000/setAsideByOppsType')
                   .subscribe(res => {
                     let data = res;
                     console.log(data);
                   })
  }

  getFormData(evt) {
    console.log(evt);
  }
}
