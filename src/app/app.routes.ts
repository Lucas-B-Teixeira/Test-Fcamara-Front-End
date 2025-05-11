import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./modules/login-register/login-register.module').then(m => m.LoginRegisterModule) 
    },
    {
        path: 'home',
        loadChildren: () => import('./modules/_home/home.module').then(m => m.HomeModule) ,
        canActivate: [authGuard]
    },
    { 
        path: '', 
        redirectTo: 'login', 
        pathMatch: 'full' 
    },
    { 
        path: '**', 
        loadChildren: () => import('./modules/login-register/login-register.module').then(m => m.LoginRegisterModule) 
    },
];
