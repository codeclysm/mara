import { Component, OnInit } from '@angular/core';
import * as Moment from 'moment';
import { ActivatedRoute } from '@angular/router';

import { CalendarService } from '../core/calendar.service';


interface Appointment {

}

interface Time {
  label: string;  // formatted as '07:30'
}

interface Day {
  date: string;  // Formatted as '20/12/2016'
  name: string;  // Formatted as 'Martedì'
}

@Component({
  selector: 'mara-calendar',
  templateUrl: `app/+calendar/calendar.component.html`,
  styles: [`
thead .today {
    background: #E8FFFF;
}

tbody .today {
    background: #E8FFFF;
}
  `]
})
export class CalendarComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }

  // week contains a list of the days in the current week
  public week: Array<Day> = [];

  // calendar contains a table of appointments by time and date
  public calendar: Array<Time> = [];

  // today and yesterday are used to highlight a day in the calendar view if it matches
  public today = Moment().format('DD/MM/YYYY');
  public yesterday = Moment().subtract(1, 'days').format('DD/MM/YYYY');

  ngOnInit() {
    // Ensure that the translation is correct
    Moment.locale('it', { weekdays: 'domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato'.split('_') });

    // Find the days of the selected week
    let today = Moment();
    let monday = today.subtract(today.day() - 1, 'days');
    for (let i = 0; i < 6; i++) {
      let day = monday.clone().add(i, 'days');
      this.week[i] = {
        date: day.format('DD/MM/YYYY'),
        name: day.format('dddd'),
      };
    }

    // Fill the calendar with dates and times
    let morning = monday.clone().hour(7).minute(30);
    this.calendar[0] = { label: 'Prima' };
    for (let i = 1; i < 22; i++) {
      let hour = morning.clone().add(30 * i, 'minutes');
      this.calendar[i] = { label: hour.format('HH:mm') };
    }

  }

}
