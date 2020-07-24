import { Component } from '@angular/core';
import { REPORTFILTERS } from '../sam-filters/filter-constant';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'org-awarded-amount',
  templateUrl: './org-awarded-amount.component.html',
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
    const from = moment(evt.startDate).format('YYYY-MM-DD');
    const to = moment(evt.endDate).format('YYYY-MM-DD');
    this.callOrgAwardedApi(from, to, evt.organizations);
  }

  callOrgAwardedApi(startDate, endDate, orgs) {
    const protocol = 'http://';
    const host = 'localhost:3000';
    const request = protocol + host + `/orgAwardedAmount?from=${startDate}&to=${endDate}&orgs=${orgs.join('|')}`;

    this.httpClient.get(request).subscribe(res => {
      console.log(res);
      this.data.values = this.processApiData(res);
      this.data.orgs = orgs;
      console.log(this.data);
    });
  }

  processApiData(api) {
    const hash: any = {};

    const d = api.map(e => e.opportunity_data);
    for (const opportunity of d) {
      const date = moment(opportunity.postedDate);
      const month = date.month();
      const year = date.year();
      const amount = opportunity.award.amount;
      const org = opportunity.department;

      if (!hash[year]) { hash.year = {}; }
      if (!hash[year][month]) { hash.year.month = {}; }
      if (!hash[year][month][org]) { hash.year.month.org = 0; }
      hash[year][month][org] += amount;
    }

    let data = [];
    for (let year of Object.keys(hash)) {
      for (let month of Object.keys(hash[year])) {
        for (let org of Object.keys(hash[year][month])) {
          data.push({date: moment().year(year).month(month).format('YYYY-MM-DD'), org: org, amount: hash[year][month][org]});
        }
      }
    }

    return data;
  }
}
