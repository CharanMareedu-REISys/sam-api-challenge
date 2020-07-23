import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ɵbypassSanitizationTrustResourceUrl,
} from "@angular/core";
import { FormArray, FormBuilder } from "@angular/forms";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { REPORTFILTERS } from "./filter-constant";

@Component({
  selector: "app-sam-filters",
  templateUrl: "./sam-filters.component.html",
  styleUrls: ["./sam-filters.component.scss"],
})
export class SamFiltersComponent implements OnInit {
  @Input() showFilters: REPORTFILTERS[] = null;

  options = {
    setAside: ["One", "Two", "Three"],
    naicsValue: ["Naics1", "Niacs2"],
    organizations: ["Org1", "Org2"],
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
    organizations: true,
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.showFilters.forEach((filter) => {
      this.hideFilters[filter] = false;
    });
    this.setAsideFilteredOptions = this.valueChanges(REPORTFILTERS.SET_ASIDE);
    this.orgsFilteredOptions = this.valueChanges(REPORTFILTERS.ORGANIZATIONS);
  }

  valueChanges(formField) {
    console.log(formField);
    return this.profileForm.get(formField).valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value, formField))
    );
  }

  private _filter(value: string, formField: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options[formField].filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  onSubmit() {
    this.formData.emit(this.profileForm.value);
  }
}
