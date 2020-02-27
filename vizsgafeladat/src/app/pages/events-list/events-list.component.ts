import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { HttpService } from 'src/app/services/http.service';
import { map } from 'rxjs/operators'; 


@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

  event: Event[];
  currentDate = new Date().toISOString().slice(0,10);
  currentTime = new Date().toISOString().slice(11,16);

  constructor(private hS: HttpService) { }

  ngOnInit() {
     this.getEventFromService()
  }

  getEventFromService() {
    this.hS.getEvents().pipe(
      map(event => event.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
  )
  .subscribe(event => this.event = event);
  }

  

}
