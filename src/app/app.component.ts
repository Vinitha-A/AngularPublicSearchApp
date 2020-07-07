import { Component } from '@angular/core';
import { SearchService } from './search.service';
import { mergeMap, map } from 'rxjs/operators';
import { merge } from 'rxjs';
import { parse } from 'querystring';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'searchapp1';
  searchval = '';
  searchsrclist = { 'active': 'HackerEarth', 'sources': ['HackerEarth', 'Wiki'] }
  resulthits;
  formattedhitresults = [];
  parseobj;
  wikiresults = [];

  constructor(private SearchService: SearchService) { }

  hitSearch() {
    this.wikiresults = [];
    this.formattedhitresults = [];
    console.log(this.searchsrclist.active);

    if (this.searchsrclist.active.toUpperCase() === 'HACKEREARTH') {
      this.SearchService.hackerEarthPublicSearch(this.searchval)
.pipe(map(res=>))
        .subscribe(res => {
          this.resulthits = res;
          let obj;
          for (var item of this.resulthits.hits) {
            let activeone = JSON.parse(JSON.stringify(item))
            let author = item.author;
            this.SearchService.getSubmissionCount(author).subscribe(response => {
              //  this.parseobj = { 'title': item.title, 'url': item.url, 'author': item.author, 'count': 0 }

              let current = response;

              let obj = { 'title': activeone.title, 'url': activeone.url, 'author': activeone.author, 'count': '' };
              obj.count = response["submission_count"];

              this.formattedhitresults.push(obj);

            },
              errgetsub => {

              });
          }
        },
          err => {
            console.log("Error occured");
          });
    }
    else {
      this.SearchService.wikisearch(this.searchval).subscribe(response => {
        console.log(JSON.stringify(response));
        this.wikiresults = response;
      },
        err => {
          console.log("error while fetching wiki results");
        })
    }

  }

  addNewSource(val) {

    this.searchsrclist.sources.push(val)
   }

  deleteSource(val) {
    this.searchsrclist.sources.splice(this.searchsrclist.sources.indexOf(val),0);

   }

}
