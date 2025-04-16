import { Component } from '@angular/core';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { UserListComponent } from '../../components/user-list/user-list.component';

@Component({
  selector: 'app-admin',
  imports: [UserFormComponent, UserListComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  editUser = true; // Zapne ovládací prvky administrace
  selectedUserId: number = -1; // Vypne zobrazení formuláře  => -1 - vypnuto / 0 - nový uživatel

  handleUserId(id: number) {
    this.selectedUserId = id;
  }

}
