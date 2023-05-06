import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Task } from '../classes/task';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs';
import { TasksService } from '../services/tasks.service';
import { CategoryService } from '../services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from '../classes/category';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  categoryId: string = this.route.snapshot.paramMap.get('id') || '';
  static categories: Category[] = [];
  searchInput: string = '';
  tasks: Task[] = [];
  categoryName: string | undefined = '';
  notificationAudio = new Audio('/assets/sounds/notification.mp3');
  countdowntimer = {
    busy: false,
    task_id: '',
    originalValue: '00:00:00',
  };
  timer: any;
  SelectedFilter = 'All';
  tasksGroupedBy: object = {};
  groupBy = false;

  constructor(
    private route: ActivatedRoute,
    private tasksService: TasksService,
    private categoryService: CategoryService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    Notification.requestPermission();
    this.categoryService
      .getCategories()
      .then((data) => (TasksComponent.categories = data));
    this.getTasks();
  }
  //* task accordion *//
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
  //* check url for category id and fill the data based on that *//
  getTasks() {
    this.filterBy();
  }
  getTasksByCategory() {
    this.tasksService.getTasksByCategory(this.categoryId!).then((res) => {
      this.tasks = res;
    });
  }
  //** get all tasks */
  getAllTasks() {
    this.tasksService.getAllTasks().then((data) => {
      this.tasks = data;
    });
  }

  //* Open add task dialog *//
  addTask() {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      data: { type: 'add', task: this.categoryId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        this.tasksService.addTask(result).then((res) => {
          this.getTasks();
        });
      }
    });
  }
  //* counting down timer for tasks *//
  countdownTimeStart(task_id: string) {
    let index = this.tasks.findIndex((task) => task.id == task_id);
    let time = this.tasks[index].duration.split(':');
    let seconds = +time[0] * 60 * 60 + +time[1] * 60 + +time[2];
    if (seconds == 0) {
      this.tasks[index].completed = true;

      this.stopTimer(this.tasks[index].id);

      if (Notification.permission === 'granted') {
        new Notification('Task completed', {
          body: 'Your task has been completed!',
          icon: '/path/to/notification-icon.png',
        });
        this.notificationAudio.play();
      }
    } else {
      seconds--;
      this.tasks[index].duration = new Date(seconds * 1000)
        .toISOString()
        .substring(11, 19);
    }
  }

  resetTimer(task_id: string) {
    let index = this.tasks.findIndex((task) => task.id == task_id);
    let startTime = this.tasks[index].startTime.split(':');
    let endTime = this.tasks[index].endTime.split(':');

    let startSeconds =
      parseInt(startTime[0]) * 60 * 60 +
      parseInt(startTime[1]) * 60 +
      parseInt(startTime[2]);
    let endSeconds =
      parseInt(endTime[0]) * 60 * 60 +
      parseInt(endTime[1]) * 60 +
      parseInt(endTime[2]);
    let duration = endSeconds - startSeconds;

    this.tasks[index].duration = new Date(duration * 1000)
      .toISOString()
      .substring(11, 19);
    this.tasks[index].completed = false;
    this.tasksService.editTask(task_id, this.tasks[index]);
    if (this.countdowntimer.task_id == task_id) {
      this.stopTimer(task_id);
    }
  }
  //* stop timer for tasks *//
  stopTimer(task_id: string) {
    clearInterval(this.timer);

    this.countdowntimer.busy = false;
    this.countdowntimer.task_id = '';

    this.tasksService.editTask(
      task_id,
      this.tasks.find((task) => task.id == task_id)!
    );

    let startButton: any = document.querySelector('#start_task_' + task_id);
    startButton.innerHTML = 'Start';
  }

  //* start timer for tasks *//
  startTimer(task_id: string) {
    let startButton: any = document.querySelector('#start_task_' + task_id);

    if (this.countdowntimer.busy == false) {
      this._snackBar.open('Count down started', '', {
        duration: 3000,
      });

      //change startButton value
      startButton.innerHTML = 'Stop';
      let selected_task: Task = this.tasks.find((task) => task.id == task_id)!;

      this.countdowntimer.busy = true;
      this.countdowntimer.task_id = task_id;
      this.countdowntimer.originalValue = selected_task.duration;

      this.countdownTimeStart(task_id);

      this.timer = setInterval(() => {
        this.countdownTimeStart(task_id);
      }, 1000);
    } else {
      this._snackBar.open('Count down stopped', '', {
        duration: 3000,
      });
      if (this.countdowntimer.task_id == task_id) {
        this.stopTimer(task_id);
      }
    }
  }

  //** edit task   */
  editTask(task_id: string) {
    let task: Task = this.tasks.find((task) => task.id == task_id)!;
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      data: { type: 'update', task: task },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.tasksService.editTask(task_id, result).then(() => {
        this.getTasks();
      });
    });
  }

  //** duplicate task   */
  duplicateTask(task_id: string) {
    let task: Task = this.tasks.find((task) => task.id == task_id)!;
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      data: { type: 'duplicate', task: task },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.tasksService.addTask(result).then(() => {
        this.getTasks();
      });
    });
  }
  // ** delete task */
  deleteTask(task_id: string) {
    if (confirm('You sure you want to delete this task')) {
      this.tasksService.deleteTask(task_id).then(() => {
        this.getTasks();
      });
    }
  }
  //** mark task as completed */
  markAsCompleted(task_id: string) {
    let task = this.tasks.find((task) => task.id == task_id)!;

    this.tasksService.editTask(task_id, task);
  }
  //** filter tasks by    *//
  filterBy() {
    if (this.categoryId == '') {
      this.tasksService.getAllTasks().then((data) => {
        this.tasks = data;
        if (this.SelectedFilter == 'GroupByDate') {
          this.groupBy = true;
          this.tasksGroupedBy = this.groupByDate();
        } else if (this.SelectedFilter == 'GroupByCategory') {
          this.groupBy = true;
          this.tasksGroupedBy = this.groupByCategory();
        } else if (this.SelectedFilter == 'Completed') {
          this.getCompletedTasks();
        } else if (this.SelectedFilter == 'Today') {
          this.getTodayTasks();
          this.groupBy = false;
        }
      });
    } else {
      this.tasksService.getTasksByCategory(this.categoryId).then((data) => {
        this.tasks = data;
        if (this.SelectedFilter == 'GroupByDate') {
          console.log('group by date');

          this.groupBy = true;
          this.tasksGroupedBy = this.groupByDate();
        } else if (this.SelectedFilter == 'GroupByCategory') {
          this.groupBy = true;
          this.tasksGroupedBy = this.groupByCategory();
        } else if (this.SelectedFilter == 'Completed') {
          this.getCompletedTasks();
        } else if (this.SelectedFilter == 'Today') {
          this.getTodayTasks();
          this.groupBy = false;
        }
      });
    }
  }
  getTodayTasks() {
    this.tasks = this.tasks.filter(
      (task) =>
        new Date(task.dueDate).getDay() == new Date().getDay() &&
        new Date(task.dueDate).getMonth() == new Date().getMonth() &&
        new Date(task.dueDate).getFullYear() == new Date().getFullYear()
    );

    this.groupBy = false;
  }
  getCompletedTasks() {
    this.tasks = this.tasks.filter((task) => task.completed == true);
    this.groupBy = false;
  }
  groupByCategory() {
    const groupedData = this.tasks.reduce((acc, item): object => {
      const categoryId: string = item.categoryId;

      if (!acc[categoryId]) {
        acc[categoryId] = [];
      }
      acc[categoryId].push(item);
      return acc;
    }, [] as any);
    return groupedData;
  }
  groupByDate() {
    const groupedData = this.tasks.reduce((acc, item): object => {
      const date: string = item.dueDate.toString().substring(0, 10);

      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, [] as any);

    return groupedData;
  }
  //* need to fix search function */
  search() {
    console.log('search');

    if (this.groupBy == false) {
      this.tasks = this.tasks.filter((task) =>
        task.name.includes(this.searchInput)
      );
    } else {
      const filteredData = Object.entries(this.tasksGroupedBy).reduce(
        (acc, [key, value]: any) => {
          const filteredValues = value.filter((item: any) =>
            item.name.includes('asr1')
          );
          if (filteredValues.length > 0) {
            acc[key] = filteredValues;
          }
          return acc;
        },
        [] as any
      );

      this.tasksGroupedBy = filteredData;
    }
  }
}
