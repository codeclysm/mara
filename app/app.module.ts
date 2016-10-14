import {FlasherDirective} from './flasher/flasher.directive';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

 import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';

import { CoreModule } from './core/core.module';
import { FlasherModule } from './flasher/flasher.module';

import { AppComponent }   from './app.component';
import { AppointmentComponent } from './+appointment/appointment.component';
import { CalendarComponent } from './+calendar/calendar.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './+login/login.component';

import { AuthGuard } from './core/auth-guard.service';

import { routing } from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    FlasherModule,
    FormsModule,
    HttpModule,
    Ng2DatetimePickerModule,
    routing
  ],
  declarations: [AppComponent, AppointmentComponent, CalendarComponent, HeaderComponent, LoginComponent],
  providers: [ AuthGuard ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
