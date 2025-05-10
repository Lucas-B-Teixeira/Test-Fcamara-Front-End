import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./modules/login-register/login-register.module').then(m => m.LoginRegisterModule) 
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) ,
        canActivate: [authGuard]
    },
    { 
        path: '', 
        redirectTo: 'login', 
        pathMatch: 'full' 
    },
];
