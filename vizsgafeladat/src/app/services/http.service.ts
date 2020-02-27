import { Injectable } from '@angular/core';
import { Newsitem } from '../models/news-item.model';
import { Observable, of } from 'rxjs';
import { Event } from '../models/event.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiUrl = 'http://localhost:3000/news-item';
  private apiUrl2 = 'http://localhost:3000/event';

  constructor(private http: HttpClient) { }

  getNews(): Observable<Newsitem[]> {
    return this.http.get<Newsitem[]>(this.apiUrl,httpOptions);
  }

  getNewsById(id): Observable<Newsitem[]> {
    return this.http.get<Newsitem[]>(`${this.apiUrl}/${id}`, httpOptions)
  };

  getEvents(): Observable<Event[]> {
     return this.http.get<Event[]>(this.apiUrl2, httpOptions);
  }

  getEventById(id): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl2}/${id}`, httpOptions)
  };

  addEvent(data): Observable<Event[]> {
    return this.http.post<Event[]>(this.apiUrl2, data, httpOptions);
  }

  deleteEvent(id): Observable<Event[]> {
    return this.http.delete<Event[]>(`${this.apiUrl2}/${id}`, httpOptions)
  }

  updateEvent(data): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl2}/${data.id}`, data ,httpOptions);
  }

}
