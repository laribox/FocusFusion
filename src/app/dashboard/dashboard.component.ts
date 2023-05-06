import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

import { getRelativePosition } from 'chart.js/helpers';
import { TasksService } from '../services/tasks.service';
import { Task } from '../classes/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public chart: any;
  chart1: any;
  chart2: any;
  chart3: any;

  constructor(private tasksService: TasksService) {}
  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'pie', //this denotes tha type of chart

      data: {
        labels: ['Tasks Pending', 'Tasks Done'],
        datasets: [
          {
            label: 'Tasks',
            data: [10, 2],
            // borderColor: '#00FF00',
            backgroundColor: ['#0091ff', '#00ff59'],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            labels: {
              boxWidth: 10,
            },
          },
        },
      },
    });
    this.chart1 = new Chart('MyChart1', {
      type: 'pie', //this denotes tha type of chart

      data: {
        labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
        datasets: [
          {
            label: 'Dataset 1',
            data: [12, 19, 3, 5, 2],
            // borderColor: '#00FF00',
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
        plugins: {
          legend: {
            labels: {
              boxWidth: 10,
            },
          },
        },
      },
    });
  }

  generateReccuringTasks() {
    this.tasksService.getTasksByRecurrence().then((res) => {
      res.forEach((element) => {
        let reccuringDates: Date[] | null = this.compareDate(
          new Date(element.dueDate)
        );
        if (reccuringDates !== null) {
          reccuringDates.forEach((date) => {
            let task: Task = new Task(
              '',
              element['name'],
              element['duration'],
              date,
              element['startTime'],
              element['endTime'],
              element['categoryId'],
              element['recurring'],
              element['recurrenceFrequency'],
              element['recurrenceInterval'],
              element['progress'],
              element['completed'],
              element['created'],
              element['updated']
            );
            //this.tasksService.addTask(task);
          });
        }
      });
    });
  }
  compareDate(date: Date): Date[] | null {
    let today: Date = new Date();
    let diff: number = Math.floor(
      (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );
    console.log(diff);

    let reccuringDates: Date[] = [];

    if (diff > 0) {
      for (let index = 1; index <= diff; index++) {
        reccuringDates.push(
          new Date(date.getTime() + index * 24 * 60 * 60 * 1000)
        );
      }
      return reccuringDates;
    } else {
      return null;
    }
  }

  ngOnInit(): void {
    this.generateReccuringTasks();
    this.createChart();
    this.chart1 = this.chart;
  }
}
