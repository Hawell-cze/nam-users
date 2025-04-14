import { Routes } from '@angular/router';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserListComponent } from './components/user-list/user-list.component';

export const routes: Routes = [
    {path: 'list', component: UserListComponent},
    {path: 'edit', component: UserEditComponent},
    {path: 'edit/:id', component: UserEditComponent},
    {path: '', redirectTo: 'list', pathMatch: 'full'}
];
