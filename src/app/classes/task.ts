import { Time } from '@angular/common';

/* id (integer, primary key)
- name (text)
- due_date (date)
- duration (string)
- start_time (time)
- end_time (time)
- category_id (integer, foreign key references categories.id)
- recurring BOOLEAN DEFAULT FALSE,
- recurrence_frequency TEXT,
- recurrence_interval INTEGER
- progress (string)*/
export class Task {
  id: string;
  name: string;
  duration: string;
  dueDate: Date;
  startTime: string;
  endTime: string;
  categoryId: string;
  recurring: boolean;
  recurrenceFrequency: string;
  recurrenceInterval: number;
  progress: string;
  completed?: boolean = false;
  user_id?: string;
  created?: string;
  updated?: string;

  constructor(
    id: string,
    name: string,
    duration: string,
    dueDate: Date,
    startTime: string,
    endTime: string,
    categoryId: string,
    recurring: boolean,
    recurrenceFrequency: string,
    recurrenceInterval: number,
    progress: string,
    completed?: boolean,
    user_id?: string,
    created?: string,
    updated?: string
  ) {
    this.id = id;
    this.name = name;
    this.duration = duration;
    this.dueDate = dueDate;
    this.startTime = startTime;
    this.endTime = endTime;
    this.categoryId = categoryId;
    this.recurring = recurring;
    this.recurrenceFrequency = recurrenceFrequency;
    this.recurrenceInterval = recurrenceInterval;
    this.progress = progress;
    this.user_id = user_id;
    this.completed = completed;
    this.created = created;
    this.updated = updated;
  }
}
