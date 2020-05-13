import { Injectable } from '@angular/core';
// import {google} from 'googleapis';


@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  // private cal = google.calendar({
  //   version:'v3',
  //   auth: 'API key here'
  // });

  constructor() {}

  getEvent(){
    // console.log(this.cal.events.get());
  }
}
