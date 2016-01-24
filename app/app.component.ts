import {Component}                      from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {FaqComponent}                   from './faq/faq.component';
import {TestimonialComponent}           from './testimonial/testimonial.component';
import {HomeComponent}                  from './home/home.component';

// Defines the AppComponent, which is the root component.

@Component({
  selector:    'app',
  templateUrl: 'app/app.component.html',
  styleUrls:   [ 'app/app.component.css' ],
  directives:  [ ROUTER_DIRECTIVES ],
  providers:   [],
})
@RouteConfig([
  { path: '/home',        name: 'Home',        component: HomeComponent, useAsDefault: true },
  { path: '/testimonial', name: 'Testimonial', component: TestimonialComponent },
  { path: '/faq',         name: 'Faq',         component: FaqComponent }
])
export class AppComponent {}
