import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { CoreModule } from './core/core.module';

import { AppComponent }   from './app.component';
import { AppointmentComponent } from './+appointment/appointment.component';
import { CalendarComponent } from './+calendar/calendar.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './+login/login.component';

import { AuthGuard } from './core/auth-guard.service';

import { routing } from './app.routing';

@NgModule({
  imports:      [ BrowserModule, CoreModule, FormsModule, HttpModule, routing ],
  declarations: [AppComponent, AppointmentComponent, CalendarComponent, HeaderComponent, LoginComponent],
  providers: [ AuthGuard ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
