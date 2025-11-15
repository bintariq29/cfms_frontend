import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';

export const routes: Routes = [
    {
        path: "",
        component: Login
    }, 
    {
        path: "login",
        component: Signup
    },
    {
        path: "signup",
        component: Signup
    }
];
