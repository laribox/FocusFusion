import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

import { getRelativePosition } from 'chart.js/helpers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public chart: any;

  constructor() {}
  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'pie', //this denotes tha type of chart

      data: {
        labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
        datasets: [
          {
            label: 'Dataset 1',
            data: [12, 19, 3, 5, 2],
            borderColor: '#00FF00',
            backgroundColor: [
              '#FF0000',
              '#FFA500',
              '#FFFF00',
              '#008000',
              '#0000FF',
            ],
          },
        ],
      },
      options: {
        aspectRatio: 5,
      },
    });
  }

  ngOnInit(): void {
    this.createChart();
  }
}
