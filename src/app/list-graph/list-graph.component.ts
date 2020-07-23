import { Component, OnInit, Input } from "@angular/core";

export interface Graph {
  title: string;
  imgUrl: string;
  desc: string;
  routerLink : string;
}

@Component({
  selector: "app-list-graph",
  templateUrl: "./list-graph.component.html",
  styleUrls: ["./list-graph.component.scss"],
})
export class ListGraphComponent implements OnInit {

  graphList: Graph[] = [
    {
      title: "Multi-Series Line Chart",
      imgUrl: "../assets/multi.png",
      desc: "Multi-Series Line Chart",
      routerLink : "/filters"
    },
    {
      title: "Stacked Bar Chart",
      imgUrl: "../assets/multi.png",
      desc: "Stacked Bar Chart",
      routerLink : "/filters"
    },
    {
      title: "Line Chart",
      imgUrl: "../assets/multi.png",
      desc: "Line Chart",
      routerLink : "/filters"
    },
    {
      title: "Bar Chart",
      imgUrl: "../assets/multi.png",
      desc: "Bar Chart",
      routerLink : "/filters"
    },
    {
      title: "Brush & Zoom",
      imgUrl: "../assets/multi.png",
      desc: "Brush & Zoom",
      routerLink : "/filters"
    },
    {
      title: "Pie Chart",
      imgUrl: "../assets/multi.png",
      desc: "Pie Chart",
      routerLink : "/filters"
    },
  ];

  constructor() {
    console.log('inside list');
  }

  ngOnInit(): void {}
}
