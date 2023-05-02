import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { Task } from '../classes/task';

const pb = new PocketBase('http://localhost:8090');

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor() {}

  //   new Task(
  //     1,
  //     'test',
  //     '00:00:10',
  //     new Date(),
  //     { hours: 12, minutes: 30, seconds: 0 },
  //     { hours: 13, minutes: 0, seconds: 0 },
  //     '1',
  //     false,
  //     '',
  //     0,
  //     'in-progress'
  //   ),
  //   new Task(
  //     2,
  //     'test',
  //     '00:30:00',
  //     new Date(),
  //     { hours: 12, minutes: 30, seconds: 0 },
  //     { hours: 13, minutes: 0, seconds: 0 },
  //     '1',
  //     false,
  //     '',
  //     0,
  //     'in-progress'
  //   ),
  //   new Task(
  //     3,
  //     'test',
  //     '00:30:00',
  //     new Date(),
  //     { hours: 12, minutes: 30, seconds: 0 },
  //     { hours: 13, minutes: 0, seconds: 0 },
  //     '2',
  //     false,
  //     '',
  //     0,
  //     'in-progress'
  //   ),
  //   new Task(
  //     4,
  //     'test',
  //     '00:30:00',
  //     new Date(),
  //     { hours: 12, minutes: 30, seconds: 0 },
  //     { hours: 13, minutes: 0, seconds: 0 },
  //     '1',
  //     false,
  //     '',
  //     0,
  //     'in-progress'
  //   ),
  // ];
  async getTasksByCategory(categoryId: string) {
    return await pb
      .collection('tasks')
      .getFullList({
        sort: 'created',
        filter: `categoryId = "${categoryId}"`,
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
    return await pb.collection('tasks').create(task);
  }
  async editTask(RECORD_ID: string, task: Task) {
    return await pb.collection('tasks').update(RECORD_ID, task);
  }

  async deleteTask(RECORD_ID: string) {
    return await pb.collection('tasks').delete(RECORD_ID);
  }

  getTasksByStatus(status: string) {}

  getAllTasks() {
    return pb
      .collection('tasks')
      .getFullList()
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

  getTaskById(taskId: string) {}
}
