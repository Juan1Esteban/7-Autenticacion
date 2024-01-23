import { Component, OnInit } from '@angular/core';

import { DataSourceUser } from './data-source';
import { UsersService } from '@services/users.service';
import { AuthService } from '@services/auth.service';
import { User } from '@models/user.model';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html'
})
export class UsersTableComponent implements OnInit {

  dataSource = new DataSourceUser();
  columns: string[] = ['id', 'avatar', 'name', 'email'];
  user$ = this.authS.user$;
  user: User | null = null;

  constructor(
    private usersS: UsersService,
    private authS: AuthService
  ) { }

  ngOnInit() {
    this.getUsers();
    this.authS.user$
    .subscribe(user => {
      this.user = user;
    });
  }

  getUsers() {
    this.usersS.getUsers()
    .subscribe(users => {
      this.dataSource.init(users);
    })
  }

}
