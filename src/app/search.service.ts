import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { URLSearchParams, Jsonp } from '@angular/http';
import { mergeMap, switchMap, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private _http: HttpClient, private jsonp: Jsonp) { }

  hackerEarthPublicSearch(searchstring) {
    return this._http.get("https://hn.algolia.com/api/v1/search?query=" + searchstring)
  }

  getSubmissionCount(author) {
    return this._http.get("https://hn.algolia.com/api/v1/users/" + author)
  }

  wikisearch(searchstring) {
    //return this._http.get("http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=test")
    return this._http.get(`https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${searchstring}&origin=*`).pipe(
      map(data => data[1]));
  }
}
