import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { TasksComponent } from './tasks/tasks.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CalenderComponent } from './calender/calender.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'calender',
    component: CalenderComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'authenticate',
    component: AuthenticationComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'tasks/:id',
    component: TasksComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'categories',
    component: CategoryComponent,
    canActivate: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
