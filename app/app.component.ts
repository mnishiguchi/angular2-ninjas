import {
  Component,
  provide
} from 'angular2/core';

import {
  ROUTER_DIRECTIVES,
  ROUTER_PROVIDERS,
  RouteConfig,
  Location,
  LocationStrategy,
  HashLocationStrategy
} from 'angular2/router';

import { FaqComponent }         from './faq/faq.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { HomeComponent }        from './home/home.component';

// Defines the AppComponent, which is the root component.

@Component({
  selector:    'app',
  templateUrl: 'app/app.component.html',
  styleUrls:   [ 'app/app.component.css' ],
  directives:  [ ROUTER_DIRECTIVES ],
  providers:   [ ROUTER_PROVIDERS,
                   provide( LocationStrategy, {
                     useClass: HashLocationStrategy
                   })
               ]
})
@RouteConfig([
  { path: '/home',        name: 'Home',        component: HomeComponent, useAsDefault: true },
  { path: '/testimonial', name: 'Testimonial', component: TestimonialComponent },
  { path: '/faq',         name: 'Faq',         component: FaqComponent }
])
export class AppComponent {

  private baseTitle: string = "The Official Ninja Webpage";
  private pages: string[]   = [ "Home", "Testimonial", "Faq" ];
  private selectedId: string;

  // Inject the Location service.
  constructor( private _location: Location ) {}

  // Initialize the selectedId based on the current path.
  ngOnInit() {
    var path = this._location.path();

    this.selectedId = ( path.length < 1 )
                    ? "Home"
                    : path.substring( 1 );

  } // end ngOnInit


  /**
   * Checks if the specified page id is selected.
   * @param {string} id  A page name
   * @return {boolean}   true if the page is selected, else false.
   */
  private isSelected( id: string ) {

    return this.selectedId.toUpperCase() === id.toUpperCase();

  } // end isSelected


  /**
   * Sets the specified page to be selected, and updates the page title.
   * @param {string} id  A page name
   */
  private setSelected( id: string ) {

    // Update the selectedId.
    this.selectedId = id;

    // Update the page title.
    window.document.title = [ id, " | ", this.baseTitle ].join("");

  } // end setSelected

} // end AppComponent
