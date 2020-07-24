import { Component, ChangeDetectorRef } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SetAsides } from '../sam-filters/filter-data';

@Component({
    selector: "total-opps-opps-type",
    templateUrl: "./total-opps-opps-type.component.html",
})
export class TotalOppsByOppsTypeComponent {
    data: any[] = [];
    dataloaded : boolean = false;
    constructor(private httpClient: HttpClient, private cdr:ChangeDetectorRef) { }

    ngOnInit(): void {
        this.httpClient
            .get("http://localhost:3000/totalOppsByOppsType")
            .subscribe((res) => {
                let keys = Object.keys(res);
                let results = [];
                keys.forEach(element => {
                    if (res[element] && res[element]["oppstype"] != null) {
                        results.push(res[element]);
                    }
                });
                this.data = results;
                this.dataloaded = true;
                this.cdr.detectChanges();
            });
    }
}
