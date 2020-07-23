import { Component } from '@angular/core';
import { REPORTFILTERS } from '../sam-filters/filter-constant';

@Component({
  selector: "org-awarded-amount",
  templateUrl: "./org-awarded-amount.component.html",
})
export class OrgAwardedAmountComponent {
  public showFilters: REPORTFILTERS[] = [
    REPORTFILTERS.START_DATE,
    REPORTFILTERS.END_DATE,
    REPORTFILTERS.OPPORTUNITIES,
    REPORTFILTERS.ORGANIZATIONS,
  ];

  constructor() {}

  ngOnInit() {}

  getFormData(evt) {
    console.log(evt);
  }
}
