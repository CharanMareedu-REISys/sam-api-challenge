import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';

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

    title = 'Multi-Series Line Chart';

    data: any;

    svg: any;
    margin = {top: 20, right: 80, bottom: 30, left: 50};
    g: any;
    svgWidth: number;
    svgHeight: number;
    x;
    y;
    z;
    line;

    constructor() {

    }

    ngOnInit() {
        this.initChart();
        this.drawAxis();
        this.drawPath();
    }

    private initChart(): void {
        this.svg = d3.select('svg');

        this.svgWidth = this.width - this.margin.left - this.margin.right;
        this.svgHeight = this.height - this.margin.top - this.margin.bottom;

        this.g = this.svg.append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

        this.x = d3Scale.scaleTime().domain([this.startDate, this.endDate]).range([0, this.svgWidth]);
        this.y = d3Scale.scaleLinear().range([this.svgHeight, 0]);
        this.z = d3Scale.scaleOrdinal(d3ScaleChromatic.schemeCategory10);

        this.line = d3Shape.line()
            .curve(d3Shape.curveBasis)
            .x( (d: any) => this.x(d.date) )
            .y( (d: any) => this.y(d.temperature) );

        this.y.domain([
            d3Array.min(this.data.values, function(c) { return c.amount }),
            d3Array.max(this.data.values, function(c) { return c.amount })
        ]);

        this.z.domain(this.data.orgs);
    }

    private drawAxis(): void {
        this.g.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(d3Axis.axisBottom(this.x));

        this.g.append('g')
            .attr('class', 'axis axis--y')
            .call(d3Axis.axisLeft(this.y))
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '0.71em')
            .attr('fill', '#000')
            .text('Amount Awarded (Dollars)');
    }

    private drawPath(): void {
        let org = this.g.selectAll('.org')
            .data(data.values)
            .enter().append('g')
            .attr('class', 'org');

        org.append('path')
            .attr('class', 'line')
            .attr('d', (d) => this.line(d.amount) )
            .style('stroke', (d) => this.z(d.org) );

        // org.append('text')
            // .datum(function(d) { return {value: d.amount}; })
            // .attr('transform', (d) => 'translate(' + this.x(d.value.date) + ',' + this.y(d.value.temperature) + ')' )
            // .attr('x', 3)
            // .attr('dy', '0.35em')
            // .style('font', '10px sans-serif')
            // .text(function(d) { return d.id; });
    }

}
