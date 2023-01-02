import { Component, Input } from '@angular/core';
import { EventlistComponent } from './eventlist/eventlist.component';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'event-page';
  filteredEvents: any;
  filteredEventsList=[]
  allTags: any;
  allTagsList=[]
  updateResults: any
  updateTags: any
  tagMap = new Map();
  changeToNext: any
  singlePageEvents=[]
  changeToPrev: any
  tags=""
  @Input() eventCategory="";
  @Input() eventSubCategory=""
  @Input() eventTags=[]
  @Input() i=0
  constructor(private http : HttpClient){
    
    this.http.get('https://api.codingninjas.com/api/v3/event_tags')
    .subscribe(Response => {
 
      // If response comes hideloader() function is called
      // to hide that loader
      if(Response){ 
        // hideloader();
        this.allTags=Response
        this.allTagsList=this.allTags.data.tags
        this.allTagsList.forEach((tag)=>{  
          this.tagMap.set(tag, "");  
        });  

      }
      // console.log(Response)
      // this.li=Response;
      // this.lis=this.li.list;
    });
    // this.http.get(`https://api.codingninjas.com/api/v3/events?event_category=${this.eventCategory}&event_sub_category=${this.eventSubCategory}&tag_list=Career Guidance,Coding Concepts,Competitive Programming,Futuristic Tech&offset=0`)
    // .subscribe(Response => {
 
    //   // If response comes hideloader() function is called
    //   // to hide that loader
    //   if(Response){ 
    //     // hideloader();
    //     this.filteredEvents=Response
    //     this.filteredEventsList=this.filteredEvents.data.events
    //     console.log(this.filteredEventsList)
    //   }
    //   // console.log(Response)
    //   // this.li=Response;
    //   // this.lis=this.li.list;
    // });

     this.updateResults= () => {
      
      http.get(`https://api.codingninjas.com/api/v3/events?event_category=${this.eventCategory}&event_sub_category=${this.eventSubCategory}&tag_list=${this.tags}&offset=0`)
    .subscribe(Response => {
 
      // If response comes hideloader() function is called
      // to hide that loader
      if(Response){ 
        // hideloader();
        
        this.filteredEvents=Response
        this.filteredEventsList=this.filteredEvents.data.events
        this.i=0
        this.singlePageEvents=this.filteredEventsList.slice(this.i*2, Math.min(this.filteredEventsList.length, this.i*2+2))
        // console.log(this.filteredEventsList);
      }
      // console.log(Response)
      // this.li=Response;
      // this.lis=this.li.list;
    });
    
  
  this.changeToPrev=()=>{
    if(this.i>0){
      this.i--;
    this.singlePageEvents=this.filteredEventsList.slice(this.i*2, Math.min(this.filteredEventsList.length, this.i*2+2))
    }
  }
  this.changeToNext=()=>{
    if(this.i*2<this.filteredEventsList.length){
      this.i++;
    this.singlePageEvents=this.filteredEventsList.slice(this.i*2, Math.min(this.filteredEventsList.length, this.i*2+2))
    }
    
  }
  } 

  this.updateTags=(e: Event)=>{
    this.tags="";
    if(this.tagMap.get(e)===""){
      this.tagMap.set(e, e);}
      else{
        this.tagMap.set(e, "");
      }
    this.tagMap.forEach((value: string, key: string) => {
      this.tags=this.tags.concat(",",value)
  });
  
    console.log(this.tags);
    this.updateResults();
  }
}

}
