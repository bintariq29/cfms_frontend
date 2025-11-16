import { Routes } from '@angular/router';
import { Login } from './pages/shared_pages/login/login';
import { Signup } from './pages/shared_pages/signup/signup';
import { AdminHome } from './pages/admin_pages/admin-home/admin-home';
import { StudentHome } from './pages/student_pages/student-home/student-home';


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
    },
    {
        path: "admin_home",
        component: AdminHome
    },
    {
        path: "student_home",
        component: StudentHome
    },
];
