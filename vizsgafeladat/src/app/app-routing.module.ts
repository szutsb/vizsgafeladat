import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsDetailComponent } from './pages/news-detail/news-detail.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { EditEventComponent } from './pages/edit-event/edit-event.component';
import { AuthGuard } from './helpers/auth.guard';
import { LoginComponent } from './pages/login/login.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, data: { animation: 'isLeft' }},
  { path: 'news/:id', component: NewsDetailComponent},
  { path: 'admin', component: AdminComponent, data: { animation: 'isRight' }, canActivate: [AuthGuard]},
  { path: 'edit-event/:id', component: EditEventComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
