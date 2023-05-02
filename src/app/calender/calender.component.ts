import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';

import interactionPlugin from '@fullcalendar/interaction';
import { TasksService } from '../services/tasks.service';
import { Task } from '../classes/task';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
})
export class CalenderComponent implements OnInit {
  tasks: Task[] = [];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: this.handleDateClick.bind(this), // MUST ensure `this` context is maintained
    events: [
      { title: 'event 1', date: '2023-04-01' },
      { title: 'event 2', date: '2023-04-02' },
    ],
  };
  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.tasksService.getAllTasks().then((tasks: Task[]) => {
      this.tasks = tasks;
      console.log(this.tasks);
      this.calendarOptions.events = this.tasks.map((task) => {
        return {
          title: task.name,
          start: task.dueDate,
        };
      });
    });
    this.calendarOptions.events;
  }
  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr);
  }
}
