import { Component, ChangeDetectorRef } from '@angular/core';
import { REPORTFILTERS } from '../sam-filters/filter-constant';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'org-awarded-amount',
  templateUrl: './org-awarded-amount.component.html',
})
export class OrgAwardedAmountComponent {

  graphTitle = "Awarded Amounts by Organization";

  public showFilters: REPORTFILTERS[] = [
    REPORTFILTERS.START_DATE,
    REPORTFILTERS.END_DATE,
    REPORTFILTERS.ORGANIZATIONS,
  ];

  public data: any;
  public start;
  public end;
  dataloaded : boolean = false;

  constructor(private httpClient: HttpClient, private cdr:ChangeDetectorRef) {}

  getFormData(evt) {
    const from = moment(evt.startDate).format('YYYY-MM-DD');
    const to = moment(evt.endDate).format('YYYY-MM-DD');
    this.callOrgAwardedApi(from, to, evt.organizations);
    this.start = evt.startDate;
    this.end = evt.endDate;
  }

  callOrgAwardedApi(startDate, endDate, orgs) {
    const protocol = 'http://';
    const host = 'localhost:3000';
    const request = protocol + host + `/orgAwardedAmount?from=${startDate}&to=${endDate}&orgs=${orgs.join('|')}`;

    this.httpClient.get(request).subscribe(res => {
      this.data = {value: this.processApiData(res), orgs: orgs}
      this.dataloaded = true;
      this.cdr.detectChanges();
    });
  }

  processApiData(api) {
    const hash: any = {};

    const d = api.map(e => e.opportunity_data);
    for (const opportunity of d) {
      const date = moment(opportunity.postedDate);
      const month = date.month();
      const year = date.year();
      let matches = false;
      if(opportunity.award && opportunity.award.amount && opportunity.award.amount.match(/\d+/g)){
        matches = true;
      }
      if(!matches){
        continue;
      }
      const amount = parseInt(opportunity.award.amount.match(/\d+/g)[0], 10);
      const org = opportunity.department;

      if (!hash[org]) { hash[org] = {}; }
      if (!hash[org][year]) { hash[org][year] = {}; }
      if (!hash[org][year][month]) { hash[org][year][month] = 0; }
      hash[org][year][month] += amount;
    }

    let data = [];
    for (let org of Object.keys(hash)) {
      let values = [];
      for (let year of Object.keys(hash[org])) {
        for (let month of Object.keys(hash[org][year])) {
          values.push({date: new Date(moment().year(parseInt(year, 10)).month(month).format('YYYY-MM-DD')), amount: hash[org][year][month]});
        }
      }
      data.push({org, values});
      this.dataloaded = true;
      this.cdr.detectChanges();
    }

    return data;
  }
}
