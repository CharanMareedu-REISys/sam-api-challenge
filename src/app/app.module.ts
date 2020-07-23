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

const appRoutes: Routes = [
  { path: '', component: ListGraphComponent },
  { path: 'filters', component: SamFiltersComponent }
  
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
