import { Component, ChangeDetectionStrategy } from "@angular/core";
import { REPORTFILTERS } from "./sam-filters/filter-constant";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor() {}

  ngOnInit() {}
}
