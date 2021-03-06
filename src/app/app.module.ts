import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material-module';

import { LineChartComponent } from './line-chart/line-chart.component';
import { MultiSeriesComponent } from './multi-series-line-chart/multi-series.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { StackedBarChartComponent } from './stacked-bar-chart/stacked-bar-chart.component';
import { BrushZoomComponent } from './brush-zoom/brush-zoom.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { SamFiltersComponent } from './sam-filters/sam-filters.component';
import { ListGraphComponent } from './list-graph/list-graph.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { OrgAwardedAmountComponent } from './graphs/org-awarded-amount.component';
import { SetAsideByOppsTypeComponent } from './graphs/setaside-opps-type.component';
import { TotalOppsByOppsTypeComponent } from './graphs/total-opps-opps-type.component';

const appRoutes: Routes = [
  { path: '', component: ListGraphComponent },
  { path: 'org-awarded-amount', component: OrgAwardedAmountComponent },
  { path: 'setaside-opps-type', component: SetAsideByOppsTypeComponent },
  { path: 'pie-chart', component: TotalOppsByOppsTypeComponent },
  { path: 'line-chart', component: LineChartComponent },
  { path: 'bar-chart', component: BarChartComponent },
  { path: 'brush-zoom', component: BrushZoomComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent,
    MultiSeriesComponent,
    BarChartComponent,
    StackedBarChartComponent,
    BrushZoomComponent,
    PieChartComponent,
    SamFiltersComponent,
    ListGraphComponent,
    OrgAwardedAmountComponent,
    SetAsideByOppsTypeComponent,
    TotalOppsByOppsTypeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
