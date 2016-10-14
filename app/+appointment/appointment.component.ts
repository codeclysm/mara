import { AppComponent } from '../app.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as Moment from 'moment';

import { Appointment, CalendarService } from '../core/calendar.service';

@Component({
  selector: 'mara-appointment',
  templateUrl: 'app/+appointment/appointment.component.html',
  styleUrls: ['app/+appointment/appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  public appointment: Appointment;

  constructor(private route: ActivatedRoute, private router: Router, private calendar: CalendarService) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id: string = params['id'];
      this.calendar.get(id).then((appointment: Appointment) => {
        this.appointment = appointment;
        if (params['where']) {
          this.appointment.where = params['where'];
        }
        if (params['when']) {
          this.appointment.when = params['when'];
        }

        // Fix an issue regarding timezone
        this.appointment.when = Moment(this.appointment.when).local().format();
      });
    });
  }

  setStatus(status: string) {
    this.appointment.status = status;
  }

  submit() {
    this.calendar.save(this.appointment).subscribe((res: Appointment) => {
      this.calendar.lastUpdated = res.id;
      this.router.navigate(['/calendar']);
    });
}

}
