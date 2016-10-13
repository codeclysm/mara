import { Component, OnInit } from '@angular/core';
import * as Moment from 'moment';
import { ActivatedRoute } from '@angular/router';

import { Appointment, CalendarService } from '../core/calendar.service';


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

th, td {
    text-align: center;
}

.add {
    visibility: hidden;
}

td:hover .add {
    visibility: visible;
}

  `]
})
export class CalendarComponent implements OnInit {
  constructor(private route: ActivatedRoute, private service: CalendarService) { }

  // week contains a list of the days in the current week
  public week: Day[] = [];

  // hours contains a list of the hours in a day
  public hours: string[] = [];

  // calendar contains a table of appointments by time and date
  public calendar: Appointment[][][] = [];

  // today and yesterday are used to highlight a day in the calendar view if it matches
  public today = Moment().format('DD/MM/YYYY');
  public yesterday = Moment().subtract(1, 'days').format('DD/MM/YYYY');

  ngOnInit() {
    // Ensure that the translation is correct
    Moment.locale('it', { weekdays: 'domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato'.split('_') });

    this.service.list().then((appointments: Appointment[]) => {
      // Find the days of the selected week
      let today = Moment();
      let monday = today.subtract(today.day() - 1, 'days');

      // Fill the calendar with dates and times
      for (let i = 0; i < 6; i++) {
        this.calendar[i] = [];

        let day = monday.clone().add(i, 'days').hour(0).minute(0).second(0);

        // Fill up the week array
        this.week[i] = {
          date: day.format('DD/MM/YYYY'),
          name: day.format('dddd'),
        };

        let begin = day.clone();
        for (let j = 0; j < 22; j++) {
          // Fill up the hours array
          if (i === 0) {
            if (j === 0) {
              this.hours.push('Prima');
            } else if (j === 21) {
              this.hours.push('Dopo');
            } else {
              this.hours.push(begin.format('HH:mm'));
            }
          }
          this.calendar[i][j] = [];

          let end = begin.clone().add(30, 'minutes');
          if (j === 0) {
            end = begin.clone().hour(7).minute(30);
          }
          for (let k in appointments) {
            let when = Moment(appointments[k].when);
            if (when.isBetween(begin, end)) {
              this.calendar[i][j].push(appointments[k]);
            }
          }
          begin = end.clone();
        }
      }

      this.calendar = this.transpose(this.calendar);

    });

  }

  private transpose(matrix: any[][]): any[][] {
    let output: any[][] = [];

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (!output[j]) {
          output[j] = [];
        }
         output[j].push(matrix[i][j]);
      };
    };

    return output;
  }

}
