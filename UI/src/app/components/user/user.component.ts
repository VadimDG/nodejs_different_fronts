import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { DialogComponent } from '../Shared/dialog/dialog.component';

// const DATA = [
//   { action: null, no: 1,  name: 'A-ha' },
//   { action: null, no: 2,  name: 'ColdPlay' }
// ];

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public dataSource: any[] = [];
  public isInEditMode = false;
  public isInAddMode = false;
  public headers: string[] = ['action', 'no'];
  public name: string = '';

  constructor(public dialog: MatDialog, private userService: UserService) 
  {
    
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((x: User[]) => {
      this.dataSource = x;

      if (this.dataSource.length < 1) {
        this.headers = [];
      }
  
      this.headers = this.headers.concat(Object.keys(this.dataSource[0]));
  
      this.dataSource = this.dataSource.map((x, i) => ({...x, no: i + 1, isInEditMode: false}));
    });
  }

  public addContact() {
    this.isInAddMode = true;
    this.dataSource.push({ action: null, no: this.dataSource.length + 1, name: '', isInEditMode: true });
  }

  public editContact(row: any): void {
    this.dataSource = this.dataSource.map(x => ({...x, isInEditMode: x['no'] === row['no'] ? true : false }));
    this.name = row['name'];
  }

  public deleteContact(row: any): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: `Are you sure you want to delete ${row['name']}`,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.dataSource = this.dataSource.filter(x => x['no'] !== row['no']);
      }
    });
  }

  public getValue(row: any, headerName: string): string {
    return row[headerName];
  }

  public addSaveContact() {
    this.isInAddMode = false;
    this.dataSource[this.dataSource.length - 1]['name'] = this.name;
    this.dataSource[this.dataSource.length - 1]['isInEditMode'] = false;
  }

  public cancelAddContact() {
    this.dataSource.pop();
    this.isInAddMode = false;
  }

  public saveEdit(row: any): void {
    this.dataSource = this.dataSource.map(x => ({...x, name: x['no'] === row['no'] ? this.name : x['name'], isInEditMode: false }));
  }
}
