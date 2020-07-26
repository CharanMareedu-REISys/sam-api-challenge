import { Component, ChangeDetectorRef } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { OpportunityCodeTypes } from '../sam-filters/filter-data';

@Component({
    selector: "total-opps-opps-type",
    templateUrl: "./total-opps-opps-type.component.html",
})
export class TotalOppsByOppsTypeComponent {
    data: any[] = [];
    dataloaded : boolean = false;
    public showData = false;
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
                let transform = [];
                results.map(item=>{
                    let obj = {...item};
                    let found = false;
                    OpportunityCodeTypes.forEach(opp=>{
                        if(obj.oppstype == opp.name){
                            obj.oppstype = opp.code;
                            found = true;
                        }
                    });
                    if(found){
                        transform.push(obj);
                    }
                });
                this.data = transform;
                this.dataloaded = true;
                this.cdr.detectChanges();
            });
    }

    toggleShowData() {
        this.showData = !this.showData;
      }
    
      getData(){
        return JSON.stringify(this.data);
      }
}
