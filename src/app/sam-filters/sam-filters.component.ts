import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { REPORTFILTERS } from "./filter-constant";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { SetAsides as setAsides } from "./filter-data";

@Component({
  selector: "app-sam-filters",
  templateUrl: "./sam-filters.component.html",
  styleUrls: ["./sam-filters.component.scss"],
})
export class SamFiltersComponent implements OnInit {
  @Input() showFilters: REPORTFILTERS[] = null;

  options = {
    setAside: setAsides,
    opportunityTypes: [
      "Special Notice",
      "Sources Sought",
      "Presolicitation",
      "Intent to Bundle",
      "Solicitation",
      "Combined Synopsis/Solicitation",
      "Award Notice",
      "Justification",
      "Sale of Surplus Property",
    ],
    organizations: [],
  };

  setAsideFilteredOptions: Observable<string[]>;
  orgsFilteredOptions: Observable<string[]>;

  @Output() formData: EventEmitter<any> = new EventEmitter<any>();
  profileForm = this.fb.group({
    startDate: [],
    endDate: [],
    opportunities: [""],
    setAside: [""],
    organizations: [""],
  });

  hideFilters = {
    startDate: true,
    endDate: true,
    opportunities: true,
    setAside: true,
    organizations: true
  };

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.showFilters.forEach((filter) => {
      this.hideFilters[filter] = false;
    });
    var headers = new HttpHeaders()
      .set("content-type", "application/json")
      .set("Access-Control-Request-Headers","*")
    let params = new HttpParams({
      encoder: null,
    });
    params = params.set("api_key", "9PdfUrRuXuBUsMK0kgApHBn0tyFAlA2VjcV44rRT");
    params = params.set("random", new Date().getTime().toString());
    let oApiParam = {
      oParam: {
        q: "",
        pageNum: 1,
        pageSize: 25,
        orderBy: "level",
        ascending: "asc",
        status: "active",
        orgType: "Dept/Ind Agency",
        searchType: "general",
      },
    };

    for (const key in oApiParam.oParam) {
      let val =
        typeof oApiParam.oParam[key] === "object" &&
        oApiParam.oParam[key] != null
          ? JSON.stringify(oApiParam.oParam[key])
          : oApiParam.oParam[key];
      if (val === undefined || val === null) {
        val = "";
      }
      params = params.set(key, val);
    }
    let optionsObj: any = {
      headers: headers,
      observe: "response",
      params: params,
      body: null,
      responseType: "json",
      withCredentials: false,
    };
    this.httpClient.get('https://beta.sam.gov/api/prod/federalorganizations/v1/search',
                          optionsObj).subscribe(res=>{
                            let data = res["_embedded"];
                            let orgs = [];
                            data.forEach(element => {
                              orgs.push[element['org']];
                            });
                            this.options.organizations = orgs;
                          })
    this.setAsideFilteredOptions = this.valueChanges(
      REPORTFILTERS.SET_ASIDE,
      "name"
    );
    this.orgsFilteredOptions = this.valueChanges(
      REPORTFILTERS.ORGANIZATIONS,
      "name"
    );
  }

  valueChanges(formField, filterField) {
    return this.profileForm.get(formField).valueChanges.pipe(
      startWith(""),
      map((value) => {
        return this._filter(value, formField, filterField);
      })
    );
  }

  private _filter(
    value: string,
    formField: string,
    filterField: string
  ): string[] {
    const filterValue = value ? value.toLowerCase() : "";
    return this.options[formField].filter((option) => {
      if (filterField) {
        return option[filterField].toLowerCase().includes(filterValue);
      } else {
        return option.toLowerCase().includes(filterValue);
      }
    });
  }

  onSubmit() {
    this.formData.emit(this.profileForm.value);
  }
}
