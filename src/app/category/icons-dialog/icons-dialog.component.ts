import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-icons-dialog',
  templateUrl: './icons-dialog.component.html',
  styleUrls: ['./icons-dialog.component.scss'],
})
export class IconsDialogComponent implements OnInit {
  iconsPath: string = 'assets/img/icons';
  icons: string[] = [
    'clipboard.png',
    'calculator.png',
    'workout.png',
    'ambulance.png',
    'economy.png',
    'gift.png',
    'groceries.png',
    'medicine.png',
    'milk-bottle.png',
  ];
  constructor(
    public dialogRef: MatDialogRef<IconsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}
  // * initialize the component with the default icon *//
  ngOnInit(): void {
    this.data = 'clipboard.png';
  }
  // * close the dialog and return the selected icon *//
  pickIcon(icon: string) {
    this.data = icon;
    this.dialogRef.close(this.data);
  }
}
