import { Component, ChangeDetectorRef } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SetAsides } from '../sam-filters/filter-data';

export interface DataResponse {
  "setaside": string;
  "Special Notice": number;
  "Sources Sought": number;
  "Presolicitation": number;
  "Intent to Bundle": number;
  "Solicitation": number;
  "Combined Synopsis/Solicitation": number;
  "Award Notice": number;
  "Justification": number;
  "Sale of Surplus Property": number;
}
@Component({
  selector: "setaside-opps-type",
  templateUrl: "./setaside-opps-type.component.html",
})
export class SetAsideByOppsTypeComponent {
  data: any[] = [];
  dataloaded : boolean = false;
  constructor(private httpClient: HttpClient, private cdr:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.httpClient
      .get("http://localhost:3000/setAsideByOppsType")
      .subscribe((res) => {
        let data: DataResponse[] = [];
        const entries = Object.entries(res);
        let setAside = 10;
        for (let i = 0; i < entries.length; i++) {
          let z = entries[i];
          if (z[1].setaside) {
            let counter = 0;
            let itemFound = false;
            data.forEach((item) => {
              if (item.setaside == z[1].setaside) {
                itemFound = true;
                return;
              }
              counter++;
            });
            if (!itemFound) {
              let obj: DataResponse = {
                setaside: z[1].setaside,
                "Special Notice": 0,
                "Sources Sought": 0,
                "Presolicitation": 0,
                "Intent to Bundle": 0,
                "Solicitation": 0,
                "Combined Synopsis/Solicitation": 0,
                "Award Notice": 0,
                "Justification": 0,
                "Sale of Surplus Property": 0
              };
              Object.keys(z[1]).forEach((item) => {
                if ((item = "type") && z[1]["type"]!="total") {
                  obj[z[1]["type"]] =  parseInt(z[1]["count"]);
                }
              });
              data.push(obj);
            } else {
              let obj = data[counter];
              Object.keys(z[1]).forEach((item) => {
                if ((item = "type") && z[1]["type"]!="total") {
                  obj[z[1]["type"]] = parseInt(z[1]["count"]);
                }
              });
            }
          }
        }
        data.forEach(item=>{
          SetAsides.forEach(setAside=>{
            if(setAside.name == item["setaside"]){
              item["setaside"] = setAside.value;
            }
          })
        })
        this.data = data;
        this.dataloaded = true;
        this.cdr.detectChanges();
      });
  }
}
