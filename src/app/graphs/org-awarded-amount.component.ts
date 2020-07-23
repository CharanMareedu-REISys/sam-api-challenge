import { Component } from '@angular/core';
import { REPORTFILTERS } from '../sam-filters/filter-constant';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';

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

  public data = {};

  constructor(private httpClient: HttpClient) {}

  getFormData(evt) {
    console.log(evt);
    let from = moment(evt.startDate).format('YYYY-MM-DD');
    let to = moment(evt.endDate).format('YYYY-MM-DD');
    this.callOrgAwardedApi(from, to, evt.organizations);
  }

  callOrgAwardedApi(startDate, endDate, orgs) {
    const protocol = 'http://';
    const host = 'localhost:3000';
    const request = protocol + host + `/orgAwardedAmount?from=${startDate}&to=${endDate}&orgs=${orgs.join('|')}`;

    this.httpClient.get(request).subscribe(res => {
      console.log(res);
      this.data = res;
    });
  }
}
