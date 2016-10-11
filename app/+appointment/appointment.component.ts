import {AppComponent} from '../app.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Appointment, CalendarService } from '../core/calendar.service';

@Component({
  selector: 'mara-appointment',
  templateUrl: 'app/+appointment/appointment.component.html',
  styles: [`
.pull-right {
  text-align: right;
}
  `]
})
export class AppointmentComponent implements OnInit {
  public appointment: Appointment;

  constructor(private route: ActivatedRoute, private calendar: CalendarService) {}

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id: string = params['id'];
      this.calendar.get(id).then(appointment => this.appointment = appointment);
    });
  }

  submit() {
    
  }

}
