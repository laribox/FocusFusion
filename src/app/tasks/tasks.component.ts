import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Task } from '../classes/task';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs';
import { TasksService } from '../services/tasks.service';
import { CategoryService } from '../services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  categoryId: string = this.route.snapshot.paramMap.get('id') || '';
  tasks: Task[] = [];
  categoryName: string | undefined = '';
  countdowntimer = {
    busy: false,
    task_id: '',
    originalValue: '00:00:00',
  };
  timer: any;
  component: TasksComponent = this;
  constructor(
    private route: ActivatedRoute,
    private tasksService: TasksService,
    private categoryService: CategoryService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getTasksByCategory();
    // this.getAllTasks();
  }

  toggle(event: any) {
    let elementId: string = (event.target as Element).id;
    let div: any = document.querySelector('#task_' + elementId);
    if (div != null) {
      div.classList.toggle('hidden');
      let expand: any = document.querySelector('#expand_task_' + elementId);
      expand.innerHTML =
        expand.innerHTML == 'expand_more' ? 'expand_less' : 'expand_more';
    }
  }

  getTasksByCategory() {
    this.tasksService.getTasksByCategory(this.categoryId!).then((res) => {
      this.tasks = res;
    });
  }

  //* Open add task dialog *//
  addTask() {
    console.log('open add task dialog');
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      data: this.categoryId,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.tasksService.addTask(result);
      this.ngOnInit();
    });
  }
  //* counting down timer for tasks *//
  countdownTimeStart(task_id: string) {
    let index = this.tasks.indexOf(
      this.tasks.find((task) => task.id == task_id)!
    );
    let time = this.tasks[index].duration.split(':');
    let seconds = +time[0] * 60 * 60 + +time[1] * 60 + +time[2];
    if (seconds == 0) {
      this.tasks[index].completed = true;

      this.stopTimer(this.tasks[index].id);
    } else {
      seconds--;
      this.tasks[index].duration = new Date(seconds * 1000)
        .toISOString()
        .substring(11, 19);
    }
  }

  resetTimer(task_id: string) {
    if (this.countdowntimer.task_id == task_id) {
      this.stopTimer(task_id);
      this.tasks.find((task) => task.id == task_id)!.duration =
        this.countdowntimer.originalValue;
      this.startTimer(task_id);
    }
  }
  //* stop timer for tasks *//
  stopTimer(task_id: string) {
    clearInterval(this.timer);

    this.countdowntimer.busy = false;
    this.countdowntimer.task_id = '';
    //console.log(this.tasks.find((task) => task.id == task_id)!);

    this.tasksService.editTask(
      task_id,
      this.tasks.find((task) => task.id == task_id)!
    );

    console.log('counter stopped');
    let startButton: any = document.querySelector('#start_task_' + task_id);
    startButton.innerHTML = 'Start';
  }

  //* start timer for tasks *//
  startTimer(task_id: string) {
    let startButton: any = document.querySelector('#start_task_' + task_id);

    if (this.countdowntimer.busy == false) {
      console.log('counter started for ' + task_id);
      //change startButton value
      startButton.innerHTML = 'Stop';
      let selected_task: Task = this.tasks.find((task) => task.id == task_id)!;
      let index: number = this.tasks.indexOf(selected_task);

      this.countdowntimer.busy = true;
      this.countdowntimer.task_id = task_id;
      this.countdowntimer.originalValue = selected_task.duration;
      this.tasks[index].duration = this.countdowntimer.originalValue;

      this.countdownTimeStart(task_id);

      this.timer = setInterval(() => {
        this.countdownTimeStart(task_id);
      }, 1000);
    } else {
      if (this.countdowntimer.task_id == task_id) {
        this.stopTimer(task_id);
      }
      console.log('counter busy');
    }
  }

  editTask(task_id: string) {
    console.log('edit ' + task_id);
    console.log('open edit task dialog');
    let task: Task = this.tasks.find((task) => task.id == task_id)!;
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      data: task,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.tasksService.editTask(task_id, result).then(() => {
        this.getTasksByCategory();
      });
    });
  }
  // ** delete task */
  deleteTask(task_id: string) {
    console.log('delete ' + task_id);
    this.tasksService.deleteTask(task_id).then(() => {
      this.getTasksByCategory();
    });
  }
}
