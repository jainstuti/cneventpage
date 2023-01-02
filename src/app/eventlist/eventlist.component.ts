import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css']
})
export class EventlistComponent {
  @Input() filteredEventsList: any;
  
}
