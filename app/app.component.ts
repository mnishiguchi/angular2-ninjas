import {
  Component,
  provide
} from 'angular2/core';

import {
  ROUTER_DIRECTIVES,
  ROUTER_PROVIDERS,
  Router,
  RouteConfig,
  Location,
  LocationStrategy,
  HashLocationStrategy
} from 'angular2/router';
import { Title } from 'angular2/platform/browser';

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
                 provide( LocationStrategy, { useClass: HashLocationStrategy }),
                 Title
               ]
})
@RouteConfig([
  { path: '/home',        name: 'Home',        component: HomeComponent, useAsDefault: true },
  { path: '/testimonial', name: 'Testimonial', component: TestimonialComponent },
  { path: '/faq',         name: 'Faq',         component: FaqComponent }
])
export class AppComponent {

  // Remember the currently selected page id.
  private selectedId: string;

  // Must match the name properties defined in @RouteConfig.
  private pageIds: string[]  = [ "Home", "Testimonial", "Faq" ];

  // Define page titles.
  private baseTitle: string  = "The Official Ninja Webpage";
  private pageTitles: Object = {
    home:        "Home | "        + this.baseTitle,
    testimonial: "Testimonial | " + this.baseTitle,
    faq:         "Faq | "         + this.baseTitle
  };


  // Inject the Location service.
  constructor( private location: Location,
               private title: Title,
               private router: Router ) {

    // Update the selected page on every path change.
    router.subscribe( ( path ) => {
      this.setSelected( path );
    });

  }

  // Initialize the selectedId based on the current path.
  ngOnInit() {

    // Detect the current path.
    let path = this.location.path();

    // Generate an ID based on the pathname.
    let id = ( path.length < 1 ) ? "home" : path.substring( 1 );

    // Initialize the selected ID.
    this.setSelected( id );

  } // end ngOnInit


  /**
   * Checks if the specified page id is selected.
   * @param {string} id  A page name
   * @return {boolean}   true if the page is selected, else false.
   */
  private isSelected( id: string ) {

    return this.selectedId.toLowerCase() === id.toLowerCase();

  } // end isSelected


  /**
   * Sets the specified page to be selected, and updates the page title.
   * @param {string} id  A page name
   */
  private setSelected( id: string ) {

    // Update the selectedId.
    this.selectedId = id.toLowerCase();

    // Update the page title.
    let title = this.pageTitles[ this.selectedId ];
    this.title.setTitle( title );

  } // end setSelected

} // end AppComponent
