import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { Task } from '../classes/task';
import { map } from 'rxjs';
import { AuthenticationService } from './authentication.service';

const pb = new PocketBase('http://localhost:8090');

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private authService: AuthenticationService) {}

  async getTasksByCategory(categoryId: string) {
    return await pb
      .collection('tasks')
      .getFullList({
        sort: 'created',
        filter: `categoryId = "${categoryId}" && user_id = "${this.authService.authenticatedUserId()}"`,
      })
      .then((res) =>
        res.map(
          (element) =>
            new Task(
              element.id,
              element['name'],
              element['duration'],
              element['dueDate'],
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
            )
        )
      );
  }

  async addTask(task: Task) {
    task.user_id = this.authService.authenticatedUserId();
    if (task.id == '') {
      console.log('empty');

      return await pb.collection('tasks').create({
        name: task.name,
        duration: task.duration,
        dueDate: task.dueDate,
        startTime: task.startTime,
        endTime: task.endTime,
        categoryId: task.categoryId,
        recurring: task.recurring,
        recurrenceFrequency: task.recurrenceFrequency,
        recurrenceInterval: task.recurrenceInterval,
        progress: task.progress,
        completed: task.completed,
      });
    } else {
      return await pb.collection('tasks').create(task);
    }
  }
  async editTask(RECORD_ID: string, task: Task) {
    return await pb.collection('tasks').update(RECORD_ID, task);
  }

  async deleteTask(RECORD_ID: string) {
    return await pb.collection('tasks').delete(RECORD_ID);
  }

  getTasksByStatus(status: string) {}

  async getAllTasks() {
    return await pb
      .collection('tasks')
      .getFullList({
        sort: 'created',
        filter: `user_id = "${this.authService.authenticatedUserId()}"`,
      })
      .then((res) =>
        res.map(
          (element) =>
            new Task(
              element.id,
              element['name'],
              element['duration'],
              element['dueDate'],
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
            )
        )
      );
  }

  async getTasksByRecurrence() {
    return await pb
      .collection('tasks')
      .getFullList({
        sort: 'created',
        filter: 'recurring =true',
      })
      .then((res) =>
        res.map(
          (element) =>
            new Task(
              element.id,
              element['name'],
              element['duration'],
              element['dueDate'],
              element['startTime'],
              element['endTime'],
              element['categoryId'],
              element['recurring'],
              element['recurrenceFrequency'],
              element['recurrenceInterval'],
              element['progress'],
              element['completed']
            )
        )
      );
  }
  getTaskById(taskId: string) {}
}
