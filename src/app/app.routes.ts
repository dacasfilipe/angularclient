import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { UserList } from '../app/user-list/user-list';
import { UserForm } from '../app/user-form/user-form';

export const routes: Routes = [
    { path: 'users', component: UserList },
    { path: 'adduser', component: UserForm },
    { path: '', redirectTo: '/users', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

