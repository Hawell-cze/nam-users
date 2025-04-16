import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  @Input() editUser: boolean = true;
  @Output() editUserId= new EventEmitter<number>;
  // @Input() tableColor: string = "black";

  users: any[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // Získání všech uživatelů
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    })
  }

  //Předání ID uživatele k editaci
  onEditUser(id: number) {
    this.editUserId.emit(id);
  }

  // Smazání uživatele
  onDeleteUser(userId: number): void {
    const confirmDelete = window.confirm('Opravdu chcete tohoto uživatele smazat?');
    if (confirmDelete) {
      // Potvrzení smazání
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          console.log(`Uživatel s ID ${userId} byl úspěšně smazán.`);
          window.alert(`Uživatel s ID ${userId} byl úspěšně smazán.`);
          this.ngOnInit();
          

        },
        error: (err) => {
          console.error('Chyba při mazání uživatele:', err);
          window.alert(`Chyba při mazání uživatele.`);
        }
      });
    }
  }
}
