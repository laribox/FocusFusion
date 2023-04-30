import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/app/classes/task';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.scss'],
})
export class AddTaskDialogComponent implements OnInit, AfterViewInit {
  recurrenceFrequency = ['daily', 'weekly', 'monthly', 'yearly'];
  taskForm!: FormGroup;
  submitButtonValue: string = 'Save';

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
  constructor(
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<AddTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}
  ngOnInit(): void {
    if (typeof this.data == 'string') {
      this.submitButtonValue = 'Save';
      this.taskForm = new FormGroup({
        name: new FormControl(''),
        duration: new FormControl(''),
        dueDate: new FormControl(''),
        startTime: new FormControl(''),
        endTime: new FormControl(''),
        categoryId: new FormControl(this.data),
        recurring: new FormControl({ value: false, disabled: false }),
        recurrenceFrequency: new FormControl(''),
        recurrenceInterval: new FormControl(''),
        progress: new FormControl(''),
        completed: new FormControl({ value: false, disabled: false }, []),
      });
    } else {
      let task: Task = this.data;
      let due_date = this.datePipe.transform(
        new Date(task.dueDate),
        'yyyy-MM-dd'
      );

      this.submitButtonValue = 'Update';
      this.taskForm = new FormGroup({
        name: new FormControl(task.name),
        duration: new FormControl(task.duration),
        dueDate: new FormControl(due_date),
        startTime: new FormControl(task.startTime),
        endTime: new FormControl(task.endTime),
        categoryId: new FormControl(task.categoryId),
        recurring: new FormControl(task.recurring),
        recurrenceFrequency: new FormControl(task.recurrenceFrequency),
        recurrenceInterval: new FormControl(task.recurrenceInterval),
        progress: new FormControl(task.progress),
        completed: new FormControl(task.completed),
      });
    }
  }

  save() {
    //console.log(this.taskForm.getRawValue());
    this.data = this.taskForm.getRawValue();
    this.dialogRef.close(this.data);
  }
  pickIcon(icon: string) {
    this.data = icon;
    this.dialogRef.close(this.data);
  }
}
