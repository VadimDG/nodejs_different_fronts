import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'app-dialog',
    templateUrl: 'dialog.component.html',
  })
  export class DialogComponent {
    public message = '';  
    
    constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string) {
        this.message = data;
    }

    onNoClick(): void {
        this.dialogRef.close(false);
    }

    onConfirm(): void {
        this.dialogRef.close(true);
    }

    onCancel(): void {
        this.onNoClick();
    }
  }