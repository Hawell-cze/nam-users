import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Input, OnChanges } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
//import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit, OnChanges {
  @Input() editUserId: number = -1; // -1 default - formulář je vypnutý; 0 - nový uživatel

  users: any[] = [];
  user: any[] = [];
  roles: any[] = [];
  status: any[] = [];
  userId: number | null = null;

  private formBuilder = inject(FormBuilder);

  // private routeSubscription!: Subscription;

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


    // this.routeSubscription = this.route.params.subscribe(params => {
    //   this.userId = Number(params['id']); // Získání aktuálního ID z URL


    // });

  }

  defaultFormValue() {
    const newUserId = this.users.length > 0 ? Math.max(...this.users.map(user => Number(user.id))) + 1 : 0;

    this.userForm.patchValue({
      id: newUserId.toString(),
      firstName: '',
      lastName: '',
      email: '',
      password: 'e10adc3949ba59abbe56e057f20f883ee',
      role: '',
      status: ''
    })
  }

  ngOnChanges(): void {
    if (this.editUserId > 0) {
      this.userService.getUserById(this.editUserId).subscribe(userData => {
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
    } else {
      this.defaultFormValue();
    }
  }

  // Ukončení Subscription
  // ngOnDestroy(): void {
  //   if (this.routeSubscription) {
  //     this.routeSubscription.unsubscribe();
  //   }
  // }

  // Odeslání formuláře
  onSubmit(): void {
    if (this.userForm.valid) {
      if (this.editUserId > 0) {
        const updateUser = this.userForm.getRawValue();
        this.userService.updateUser(Number(updateUser.id), updateUser).subscribe(response => {
          console.log('Uživatel aktualizován:', response);
          window.alert('Uživatel akttualizován.');
          this.defaultFormValue();
          this.ngOnInit();
          this.editUserId = -1;
        });
      } else {
        const { id, firstName, lastName, email, password, role, status } = this.userForm.value;
        const insertUser = { id, firstName, lastName, email, password, role, status };


        this.userService.insertUser(insertUser).subscribe(response => {
          console.log('Vložen nový uživatel:', response);
          window.alert('Uživatel vložen');
          this.defaultFormValue();
          this.ngOnInit();
          this.editUserId = -1;
        })

      }
    } else {
      console.error('Formulář není validní.');
      window.alert('Chybně vyplněná pole.');
    }
  }


}