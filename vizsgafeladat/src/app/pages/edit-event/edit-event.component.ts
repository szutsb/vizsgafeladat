import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event } from 'src/app/models/event.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  event: Event[];
  editForm: FormGroup;
  editId: any;

  constructor(private route: ActivatedRoute,
              private hS: HttpService,
              private router: Router,
              private fB: FormBuilder,
              private location: Location) { }

  ngOnInit() {
    this.getEventFromRoute();
    this.createForm();
  }

  getEventFromRoute(): any {
    const id = +this.route.snapshot.paramMap.get('id');
      this.editId = id;
      this.hS.getEventById(id)
        .subscribe(eventId => this.event = eventId);
  }

  createForm(): any {
    this.editForm = this.fB.group({
      id: this.editId,
      eventType: ['', Validators.required],
      imageURL: [''],
      date: ['', Validators.required],
      time: ['', Validators.required],
      location: ['', Validators.required],
      text: ['', [Validators.required, Validators.maxLength(180)]],
      eventURL: ['']
   });
  }
  get eventType() {
    return this.editForm.get('eventType');
  }

   changeType(e) {
    console.log(e.value)
    this.eventType.setValue(e.target.value, {
      onlySelf: true
    })
  }

 
  

  updateEvent(): any {
    this.hS.updateEvent(this.editForm.value).subscribe( 
        data => { this.router.navigate(['admin']);
      },
      error => {
        alert(error);
      });
  }

  goBack() {
    this.location.back();
  }
}
