import { Component, ViewEncapsulation, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

@Component({
    selector: 'app-multi-series-line-chart',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './multi-series.component.html',
    styleUrls: ['./multi-series.component.css']
})
export class MultiSeriesComponent implements OnInit {
    @Input() data;
    @Input() width;
    @Input() height;
    @Input() startDate;
    @Input() endDate;
    @ViewChild('chart') public chart;

    //title = 'Multi-Series Line Chart';

    svg: any;
    margin = {top: 20, right: 200, bottom: 150, left: 100};
    g: any;
    svgWidth: number;
    svgHeight: number;
    x;
    y;
    z;
    line;

    constructor(private cdr:ChangeDetectorRef) {

    }

    ngOnInit() {
        
    }

    ngOnChanges(c) {
       if(this.data){
        this.initChart();
        this.drawAxis();
        this.drawPath();
       }
        
    }

    private initChart(): void {
        this.chart.nativeElement.innerHTML = '';
        this.svgWidth = this.width - this.margin.left - this.margin.right;
        this.svgHeight = this.height + this.margin.top - this.margin.bottom;
        this.svg = d3.select(this.chart.nativeElement).append('svg').attr('width', this.width).attr('height', this.height);
        
        this.g = this.svg.append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

        this.x = d3Scale.scaleTime().domain([this.startDate, this.endDate]).range([0, this.svgWidth]);
        this.y = d3Scale.scaleSqrt().range([this.svgHeight, 0]);
        this.z = d3Scale.scaleOrdinal(d3ScaleChromatic.schemeCategory10);

        this.line = d3Shape.line()
            .curve(d3Shape.curveBasis)
            .x((d: any) => this.x(d.date))
            .y((d: any) => this.y(d.amount));

        this.y.domain([
            d3Array.min(this.data.value, function(c: any) { return d3Array.min(c.values, function(d: any) { return d.amount;});}),
            d3Array.max(this.data.value, function(c: any) { return d3Array.max(c.values, function(d: any) { return d.amount;});})        
        ]);

        this.z.domain(this.data.orgs);
        this.cdr.detectChanges();
    }

    private drawAxis(): void {
        this.g.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', 'translate(0,' + this.svgHeight + ')')
            .call(d3Axis.axisBottom(this.x));

        this.g.append('g')
            .attr('class', 'axis axis--y')
            .call(d3Axis.axisLeft(this.y))
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '0.71em')
            .attr('fill', '#000')
            .text('Amount Awarded (Dollars) - Square Root Scale');
            this.cdr.detectChanges();
    }

    private drawPath(): void {
        
        let org = this.g.selectAll('.org')
            .data(this.data.value)
            .enter().append('g')
            .attr('class', 'org');

        org.append('path')
            .attr('class', 'line')
            .attr('d', (d) => this.line(d.values))
            .style('stroke', (d) => this.z(d.org));

        org.append('text')
        .datum(function(d) { return {id: d.org, value: d.values[d.values.length - 1]}; })
        .attr('transform', (d) => 'translate(' + this.x(d.value.date) + ',' + this.y(d.value.amount) + ')' )
        .attr('x', 3)
        .attr('dy', '0.35em')
        .style('font', '10px sans-serif')
        .text(function(d) { return d.id; });
        this.cdr.detectChanges();
    }

}
