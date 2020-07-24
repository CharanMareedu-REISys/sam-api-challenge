import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { REPORTFILTERS } from "./filter-constant";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { SetAsides as setAsides, OpportunityTypes } from "./filter-data";
import { MatChipInputEvent } from "@angular/material/chips";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { COMMA, ENTER } from "@angular/cdk/keycodes";

@Component({
  selector: "app-sam-filters",
  templateUrl: "./sam-filters.component.html",
  styleUrls: ["./sam-filters.component.scss"],
})
export class SamFiltersComponent implements OnInit {
  @Input() showFilters: REPORTFILTERS[] = null;
  @Input() graphTitle =null;
  @Output() formData: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild("orgInput") orgInput: ElementRef;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  orgs: string[] = [];

  options = {
    setAside: setAsides,
    opportunityTypes: OpportunityTypes,
    organizations: [],
  };

  setAsideFilteredOptions: Observable<string[]>;
  orgsFilteredOptions: Observable<string[]>;

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
    organizations: true,
  };

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.showFilters.forEach((filter) => {
      this.hideFilters[filter] = false;
    });

    this.setAsideFilteredOptions = this.valueChanges(
      REPORTFILTERS.SET_ASIDE,
      "name"
    );

    this.getOrganizationsData();
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
    let obj = { ...this.profileForm.value };
    obj["organizations"] = this.orgs;
    this.formData.emit(obj);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our org
    if ((value || "").trim()) {
      this.orgs.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }

    this.profileForm.get("organizations").setValue(null);
  }

  remove(org: string): void {
    const index = this.orgs.indexOf(org);

    if (index >= 0) {
      this.orgs.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.orgs.push(event.option.viewValue);
    this.orgInput.nativeElement.value = "";
    this.profileForm.get("organizations").setValue(null);
  }

  getOrganizationsData() {
    var headers = new HttpHeaders().set("content-type", "application/json");
    let params = new HttpParams({
      encoder: null,
    });
    params = params.set("api_key", "9PdfUrRuXuBUsMK0kgApHBn0tyFAlA2VjcV44rRT");
    params = params.set("random", new Date().getTime().toString());
    let oApiParam = {
      oParam: {
        q: "",
        pageNum: 1,
        pageSize: 160,
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
    this.httpClient
      .get(
        "https://cors-anywhere.herokuapp.com/https://beta.sam.gov/api/prod/federalorganizations/v1/search",
        optionsObj
      )
      .subscribe((res) => {
        let data = res["body"]["_embedded"];
        let orgs = data.map((element) => {
          return element["org"]["name"];
        });
        this.options.organizations = orgs;
        this.orgsFilteredOptions = this.valueChanges(
          REPORTFILTERS.ORGANIZATIONS,
          ""
        );
      });
  }
}
