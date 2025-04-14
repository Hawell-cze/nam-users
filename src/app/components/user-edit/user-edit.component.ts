import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-user-edit',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit {
  users: any[] = [];
  user: any[] = [];
  roles: any[] = [];
  status: any[] = [];
  userId: number | null = null;

  private formBuilder = inject(FormBuilder);

  private routeSubscription!: Subscription;

  userForm = this.formBuilder.group({
    id: ["0"],
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    role: ['', [Validators.required]],
    status: ['', [Validators.required]]
  });

  constructor(private userService: UserService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    })
    this.userService.getRoles().subscribe((data) => {
      this.roles = data;
    })
    this.userService.getStatus().subscribe((data) => {
      this.status = data;
    })

    this.routeSubscription = this.route.params.subscribe(params => {
      this.userId = Number(params['id']); // Získání aktuálního ID z URL
      if (this.userId) {
        this.userService.getUserById(this.userId).subscribe(userData => {
          this.userForm.patchValue({
            id: userData.id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password,
            role: userData.role,
            status: userData.status
          })
        });
      }

    });


  }

  // Ukončení Subscription
  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  // Odeslání formuláře
  onSubmit(): void {
    if (this.userForm.valid) {
      if (Number(this.userForm.value.id) > 0) {
        const updateUser = this.userForm.getRawValue();
        this.userService.updateUser(Number(updateUser.id), updateUser).subscribe(response => {
          console.log('Uživatel aktualizován:', response);
          this.ngOnInit();
        });
      } else {
        const { firstName, lastName, email, password, role, status } = this.userForm.value;
        const insertUser = { firstName, lastName, email, password, role, status };


        this.userService.insertUser(insertUser).subscribe(response => {
          console.log('Vložen nový uživatel:', response);
          this.ngOnInit;
        })

      }
    } else {
      console.error('Formulář není validní.');
    }
  }

  // Smazání uživatele
  onDeleteUser(userId: number): void {
    const confirmDelete = window.confirm('Opravdu chcete tohoto uživatele smazat?');
    if (confirmDelete) {
      // Potvrzení smazání
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          console.log(`Uživatel s ID ${userId} byl úspěšně smazán.`);
          this.ngOnInit();
          
        },
        error: (err) => {
          console.error('Chyba při mazání uživatele:', err);
        }
      });
    }
  }
}
