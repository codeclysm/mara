import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppointmentComponent } from './+appointment/appointment.component';
import { CalendarComponent } from './+calendar/calendar.component';
import { LoginComponent } from './+login/login.component';

import { AuthGuard } from './core/auth-guard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/calendar/budrio', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'calendar', redirectTo: '/calendar/budrio', pathMatch: 'full' },
  { path: 'calendar/:where', component: CalendarComponent, canActivate: [AuthGuard] },
  { path: 'calendar/:where/:date', component: CalendarComponent, canActivate: [AuthGuard] },
  { path: 'appointment/:id', component: AppointmentComponent, canActivate: [AuthGuard] },
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);