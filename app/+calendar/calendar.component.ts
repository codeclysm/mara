import { Component, OnInit } from '@angular/core';
import * as Moment from 'moment';
import { ActivatedRoute, Params } from '@angular/router';

import { Appointment, CalendarService } from '../core/calendar.service';

interface Slot {
  date: string; // Formatted as '20/12/2016'
  time: string;
  appointments: Appointment[];
}

interface Day {
  date: string;  // Formatted as '20/12/2016'
  name: string;  // Formatted as 'Martedì'
}

@Component({
  selector: 'mara-calendar',
  templateUrl: 'app/+calendar/calendar.component.html',
  styleUrls: ['app/+calendar/calendar.component.css']
})
export class CalendarComponent implements OnInit {
  constructor(private route: ActivatedRoute, private service: CalendarService) { }

  // week contains a list of the days in the current week
  public week: Day[] = [];

  // hours contains a list of the hours in a day
  public hours: string[] = [];

  // calendar contains a table of appointments by time and date
  public calendar: Slot[][] = [];

  // today is used to highlight a day in the calendar view if it matches
  public today = Moment().format('DD/MM/YYYY');

  // month, where, nextWeek and prevWeek are used for the title and the date selector
  public month: string;
  public where: string;
  public nextWeek: string;
  public prevWeek: string;

  // lastUpdated tells us that a appointment was last updated
  public lastUpdated: string = '';

  ngOnInit() {
    // Ensure that the translation is correct
    Moment.locale('it');

    this.lastUpdated = this.service.lastUpdated;

    this.route.params.forEach((params: Params) => {
      let date = Moment(params['date']);
      this.month = date.format('MMMM');
      this.where = params['where'];

      // Find the days of the selected week
      let monday = date.subtract(date.day() - 1, 'days');
      this.prevWeek = monday.clone().subtract(7, 'days').format('YYYY-MM-DD');
      this.nextWeek = monday.clone().add(7, 'days').format('YYYY-MM-DD');

      this.service.list({where: this.where, date: monday}).then((appointments: Appointment[]) => {
        // Fill the calendar with dates and times
        this.calendar = [];
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
            this.calendar[i][j] = {
              date: begin.format('DD/MM/YYYY'),
              time: begin.format(),
              appointments: []
            };

            let end = begin.clone().add(30, 'minutes');
            if (j === 0) {
              end = begin.clone().hour(7).minute(30);
            }
            for (let k in appointments) {
              let when = Moment(appointments[k].when);
              if (when.isBetween(begin, end, 'minute', '[)')) {
                this.calendar[i][j].appointments.push(appointments[k]);
              }
            }
            begin = end.clone();
          }
        }

        this.calendar = this.transpose(this.calendar);
      });
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
