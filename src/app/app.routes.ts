import { Routes } from '@angular/router';
import { Login } from './pages/shared_pages/login/login';
import { Signup } from './pages/shared_pages/signup/signup';
import { AdminHome } from './pages/admin_pages/admin-home/admin-home';
import { StudentHome } from './pages/student_pages/student-home/student-home';
import { CourseFeedbacks } from './pages/admin_pages/course-feedbacks/course-feedbacks';
import { AddCourse } from './pages/admin_pages/add-course/add-course';
import { EditCourse } from './pages/admin_pages/edit-course/edit-course';
import { MyFeedbacks } from './pages/student_pages/my-feedbacks/my-feedbacks';
import { AddFeedback } from './pages/student_pages/add-feedback/add-feedback';


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
        path: "student_home/:name",
        component: StudentHome
    },

    {
        path: "feedback/:id",
        component: CourseFeedbacks
    },

    {
        path: "my_feedback/:name/:id",
        component: MyFeedbacks
    },

    {
        path: "add_course",
        component: AddCourse
    },

    {
        path: "edit_course/:id",
        component: EditCourse
    },
    {
        path: "add_feedback/:course/:instructor",
        component: AddFeedback
    }
];
