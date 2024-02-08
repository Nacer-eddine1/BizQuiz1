import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './auth.guard';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path:'', component: LayoutComponent, canActivate:[AuthGuard], children: [
      {
        path:'', component: AppComponent
      },
      {
        path: 'about', component: AboutComponent
      }
    ],
  },
  { path: 'home', component: AppComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
