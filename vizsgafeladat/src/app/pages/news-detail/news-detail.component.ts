import { Component, OnInit } from '@angular/core';
import { Newsitem } from 'src/app/models/news-item.model';
import { HttpService } from 'src/app/services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
Location

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
  newsItem: Newsitem[];

  constructor(private hS: HttpService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    this.getNewsFromRoute();
  }

  getNewsFromRoute(): any {
    const id = +this.route.snapshot.paramMap.get('id');
    this.hS.getNewsById(id)
      .subscribe(newsItemId => this.newsItem = newsItemId);
  }

  goBack() {
    this.location.back();
  }

}
