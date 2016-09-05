import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './auth.service';
import { CalendarService } from './calendar.service';
import { AuthGuard } from './auth-guard.service';

@NgModule({
  imports: [CommonModule],
  providers: [AuthService, CalendarService]
})
export class CoreModule{ }