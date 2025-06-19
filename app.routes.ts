import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { LayoutComponent } from './Pages/layout/layout.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'Login',
        pathMatch: 'full'
    },
    {
        path: 'Login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        children:[
            {
                path:'Dashboard',
                component:DashboardComponent
            }
        ]
    }

];
