import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SetAsides } from '../sam-filters/filter-data';

@Component({
    selector: "total-opps-opps-type",
    templateUrl: "./total-opps-opps-type.component.html",
})
export class TotalOppsByOppsTypeComponent {
    data: any[] = [];
    constructor(private httpClient: HttpClient) { }

    ngOnInit(): void {
        this.httpClient
            .get("http://localhost:3000/totalOppsByOppsType")
            .subscribe((res) => {
                console.log(res);
                let keys = Object.keys(res);
                let results = [];
                keys.forEach(element => {
                    if (res[element] && res[element]['oppstype'] != null) {
                        results.push(res[element]);
                    }
                });
                this.data = results;
            });
    }
}
