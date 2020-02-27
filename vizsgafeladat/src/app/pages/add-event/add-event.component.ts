import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event } from 'src/app/models/event.model';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  event: Event[];

  addForm = this.fB.group({
    date: ['', Validators.required],
    time: ['', Validators.required],
    location: ['', Validators.required],
    text: ['', [Validators.required, Validators.maxLength(80)]],
  })

  constructor(private route: ActivatedRoute,
              private hS: HttpService,
              private router: Router,
              private fB: FormBuilder) { }

  ngOnInit() {
    this.getEventFromService()
  }

  getEventFromService() {
    this.hS.getEvents()
      .subscribe(event => this.event = event);
  }

  addEvent() {
    this.hS.addEvent(this.addForm.value)
      .subscribe(data => {  
        this.router.navigate(['admin']);  
  },
    error => {  
      alert(error);  
  });  
}  




}
