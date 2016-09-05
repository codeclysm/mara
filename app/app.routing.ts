import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppointmentComponent } from './+appointment/appointment.component';
import { CalendarComponent } from './+calendar/calendar.component';
import { LoginComponent } from './+login/login.component';

import { AuthGuard } from './core/auth-guard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/calendar', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] },
  { path: 'calendar/:date', component: CalendarComponent, canActivate: [AuthGuard] },
  { path: 'appointment/:id', component: AppointmentComponent, canActivate: [AuthGuard] },
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);