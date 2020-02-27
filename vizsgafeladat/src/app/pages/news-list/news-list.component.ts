import { Component, OnInit } from '@angular/core';
import { Newsitem } from 'src/app/models/news-item.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  newsItem: Newsitem[];

  constructor(private hS: HttpService) { }

  ngOnInit() {
    this.getNewsFromService();
  }

  getNewsFromService(): void {
    this.hS.getNews()
      .subscribe(newsItem => this.newsItem = newsItem);
  }

}
