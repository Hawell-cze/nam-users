import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
    {path: 'list', component: HomeComponent},
    {path: 'edit', component: AdminComponent},
    {path: '', redirectTo: 'list', pathMatch: 'full'}
];
