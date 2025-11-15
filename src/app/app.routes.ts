import { Routes } from '@angular/router';
import { Login } from './pages/shared_pages/login/login';
import { Signup } from './pages/shared_pages/signup/signup';

export const routes: Routes = [
    {
        path: "",
        redirectTo: 'login', pathMatch: 'full'
    },
    {
        path: "login",
        component: Login
    },
    {
        path: "signup",
        component: Signup
    }
];
