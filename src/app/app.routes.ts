import { Routes } from '@angular/router';
import { AddFlightComponent } from './Pages/Flight/add-flight/add-flight.component';
import { EditFlightComponent } from './Pages/Flight/edit-flight/edit-flight.component';
import { GetALLFLightsComponent } from './Pages/Flight/get-allflights/get-allflights.component';

import { AdminDashboardComponent } from './Pages/User/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './Pages/User/login/login.component';
import { RegisterComponent } from './Pages/User/register/register.component';
import { UserDashboardComponent } from './Pages/User/user-dashboard/user-dashboard.component';

export const routes: Routes = [
    {path:'add-Flight',component:AddFlightComponent},
    {path:'get-all-Flight',component:GetALLFLightsComponent},
    {path: 'user-dashboard',component:UserDashboardComponent,
    children:[
        {path:'get-all-Flight',component:GetALLFLightsComponent},
        
    ]},
    {path:'admin-dashboard',component:AdminDashboardComponent,
    children:[
        {path:'add-Flight',component:AddFlightComponent},
      
        {path:'edit-flight/:flightNumber',component:EditFlightComponent},
        {path:'get-all-Flight',component:GetALLFLightsComponent},
      
    ]},
    {path:'',component:RegisterComponent},
    {path:'login',component:LoginComponent},
];
