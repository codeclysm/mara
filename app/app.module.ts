import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CoreModule } from './core/core.module';

import { AppComponent }   from './app.component';
import { AppointmentComponent } from './+appointment/appointment.component';
import { CalendarComponent } from './+calendar/calendar.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './+login/login.component';

import { AuthGuard } from './core/auth-guard.service';

import { routing } from './app.routing';

@NgModule({
  imports:      [ BrowserModule, CoreModule, routing ],
  declarations: [AppComponent, AppointmentComponent, CalendarComponent, HeaderComponent, LoginComponent],
  providers: [ AuthGuard ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
