import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { Event } from 'src/app/models/event.model';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: [
    trigger ('list', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('* => void', [
        animate(300, style({
          transform: 'translateX(100px)',
          opacity: 0
        }))
      ])
  ]),
]  
})
export class AdminComponent implements OnInit {

  placements: string[] = ['top', 'left', 'right', 'bottom'];
  popoverMessage: string = '<b>Biztosan</b> törölni akarja?';
  confirmText: string = 'Igen';
  cancelText: string = 'Nem';
  confirmClicked: boolean = false;
  cancelClicked: boolean = false;

  event: Event[];
  currentUser: User;

  addForm = this.fB.group({
    eventType: ['', Validators.required],
    imageURL: [''],
    date: ['', Validators.required],
    time: ['', Validators.required],
    location: ['', [Validators.required, Validators.maxLength(80)]],
    text: ['', [Validators.required, Validators.maxLength(180)]],
    eventURL: ['']
  })

  constructor(private route: ActivatedRoute,
              private hS: HttpService,
              private router: Router,
              private location: Location,
              private fB: FormBuilder,
              private authenticationService: AuthenticationService) { this.authenticationService.currentUser.subscribe(x => this.currentUser = x); }

  ngOnInit() {
    this.getEventFromService()
  }

  changeType(e) {
    this.eventType.setValue(e.target.value, {
      onlySelf: true
    })
  }

  get eventType() {
    return this.addForm.get('eventType');
  }

  getEventFromService() {
    this.hS.getEvents()
      .subscribe(updatedevent => this.event = updatedevent);
     }

  addEventNav() {
    this.router.navigate(['add-event']);
  }

  addEvent() {
    this.hS.addEvent(this.addForm.value)
      .subscribe(data => {  
        this.router.navigate(['admin']);
        this.addForm.reset();
        this.getEventFromService(); 
    });  
  }  

  deleteEvent(eventid) {
    this.hS.deleteEvent(eventid) 
      .subscribe(data => {
        this.event = this.event.filter(valami => valami.id !== eventid)
      }
    ) 
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['home']);
  }

  home() {
    this.router.navigate(['home']);
  }
 
}


