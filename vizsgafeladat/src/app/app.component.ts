import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slider } from './route-animations';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    slider,
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vizsgafeladat';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
