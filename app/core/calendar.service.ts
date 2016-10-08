import { Injectable } from '@angular/core';
export interface Appointment{
  id: string;
  href: string;  // The url of the resource
  who: string;
  email: string;
  send_email: boolean;
  phone: string;
  send_sms: boolean;
  what: string;
  when: string;
  where: string;
  notes: string;
  urgent: boolean;
  problematic: boolean;
  status: string;
}

@Injectable()
export class CalendarService {
  get(id: string): Promise<Appointment> {
    if (id === 'new') {
      return Promise.resolve(this.empty());
    }
  }

  private empty(): Appointment {
    return {
      id: '',
      href: '',
      who: '',
      email: '',
      send_email: false,
      phone: '',
      send_sms: false,
      what: '',
      when: '',
      where: '',
      notes: '',
      urgent: false,
      problematic: false,
      status: '',
    }
  }
}