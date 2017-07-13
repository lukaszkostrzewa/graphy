import {Component} from '@angular/core';

@Component({
  selector: 'app-account-button',
  templateUrl: './account-button.component.html',
  styleUrls: ['./account-button.component.scss']
})
export class AccountButtonComponent {

  user: any | null = null;
  private exampleUser: any = {name: 'John Doe'};

  logout() {
    this.user = null;
  }

  login() {
    this.user = this.exampleUser;
  }
}
