import { User } from './../../models/user';
import { first, map, Observable, of, pipe, Subject, switchMap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public dataSource: any[] = [];
  public headers: string[] = ['id', 'name'];
  public name: string = '';

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.updateDataSource();
  }

  public onNewItemAdd(row: any): void {
    this.userService.addUser({
      name: this.name
    }).pipe(first()).subscribe(x => this.updateDataSource());
  }

  public onItemUpdateSave(): void {

  }

  public onItemUpdateButtonClicked(row: any): void {
    this.name = row['name'];
  }

  public onItemDelete(row: any): void {

  }

  public updateDataSource(): void {
    this.userService.getAllUsers().pipe(first())
      .subscribe(x => {
        console.log(x);
        this.dataSource = x;
      });
  }
}
