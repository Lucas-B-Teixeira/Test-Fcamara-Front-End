import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from '../../core/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
     children: [
      { 
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [authGuard]
      },
      { 
        path: 'users',
        loadChildren: () => import('../users/users.module').then(m => m.UsersModule),
        canActivate: [authGuard]
      },
      { 
        path: 'addresses',
        loadChildren: () => import('../addresses/addresses.module').then(m => m.AddressesModule),
        canActivate: [authGuard]
      },
      { 
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
