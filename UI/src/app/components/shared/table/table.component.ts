import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() headers: string[] = [];
  @Input() hiddenHeaders: string[] = [];

  private _dataSource: any[] = [];

  get dataSource(): any[] {
    return this._dataSource;
  }
  @Input() set dataSource(value: any[]) {
    
    this._dataSource = value;
    this.reset();
  }
 
  @Output() onNewItemAdd = new EventEmitter<any>();
  @Output() onItemUpdateButtonClicked = new EventEmitter<any>();
  @Output() onItemUpdateSave = new EventEmitter();
  @Output() onItemDelete = new EventEmitter<any>();

  public isInEditMode = false;
  public isInAddMode = false;
  public displayHeaders: string[] = ['action', 'no'];
  public name: string = '';
  
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.headers.length === 0) {
      this.displayHeaders = [];
    }
    else 
    {
      this.displayHeaders  = this.displayHeaders.concat(this.headers);
    }

    this.dataSource = this.dataSource ? this.dataSource.map((x, i) => ({...x, no: i, isInEditMode: false})) : [];
  }

  public addContact() {
    this.isInAddMode = true;
    this.dataSource.push({ name: '', isInEditMode: true });
  }

  public editContact(row: any): void {
    this.dataSource = this.dataSource.map((x, i) => ({...x, no: i, isInEditMode: x['id'] === row['id'] ? true : false }));
    this.onItemUpdateButtonClicked.emit(row);
  }

  public deleteContact(row: any): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: `Are you sure you want to delete ${row['name']}`,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.dataSource = this.dataSource.filter(x => x['no'] !== row['no']);
        this.onItemDelete.emit(row);
      }
    });
  }

  public getValue(row: any, headerName: string): string {
    return row[headerName];
  }

  public addSaveContact() {
    this.isInAddMode = false;
    this.onNewItemAdd.emit(this.dataSource[this.dataSource.length - 1]);
  }

  public cancelAddContact() {
    this.dataSource.pop();
    this.isInAddMode = false;
  }

  public saveEdit(row: any): void {
    this.dataSource = this.dataSource.map(x => ({...x, name: x['no'] === row['no'] ? this.name : x['name'], isInEditMode: false }));
    this.onItemUpdateSave.emit();
  }

  public cancelEditContact(row: any) {
    this.isInEditMode = false;
    this.dataSource[row['no']]['isInEditMode'] = false;
  }

  private reset() {
    this._dataSource = this._dataSource ? this._dataSource.map((x, i) => ({...x, no: i, isInEditMode: false})) : [];
    
    this.isInAddMode = false;
    this.isInEditMode = false;
  }
}
