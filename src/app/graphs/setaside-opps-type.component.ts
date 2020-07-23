import { Component } from '@angular/core';
import { REPORTFILTERS } from '../sam-filters/filter-constant';

@Component({
  selector: "setaside-opps-type",
  templateUrl: "./setaside-opps-type.component.html",
})
export class SetAsideByOppsTypeComponent {
  
  constructor() {}

  ngOnInit() {}

  getFormData(evt) {
    console.log(evt);
  }
}
