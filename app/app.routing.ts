import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppointmentComponent } from './+appointment/appointment.component';
import { CalendarComponent } from './+calendar/calendar.component';
import { LoginComponent } from './+login/login.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'calendar/:date', component: CalendarComponent },
  { path: 'appointment/:id', component: AppointmentComponent },
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);