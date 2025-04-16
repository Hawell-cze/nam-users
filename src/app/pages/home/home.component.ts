import { Component } from '@angular/core';
import { UserListComponent } from '../../components/user-list/user-list.component';

@Component({
  selector: 'app-home',
  imports: [UserListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
   editUser = false; 
}
