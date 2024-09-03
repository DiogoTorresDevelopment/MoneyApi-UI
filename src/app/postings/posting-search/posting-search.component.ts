import { Component, OnInit } from '@angular/core';
import { PostingFilter, PostingsService } from '../postings.service';
import { LazyLoadEvent } from 'primeng/components/common/api';

@Component({
  selector: 'app-posting-search',
  templateUrl: './posting-search.component.html',
  styleUrls: ['./posting-search.component.css']
})
export class PostingSearchComponent implements OnInit {


  totalElements = 0;
  postings = [];
  filter = new PostingFilter();

  ngOnInit(): void {
  }

  constructor(private postingsService: PostingsService) {

  }

  search(page = 0): void {

    this.filter.page = page;

    this.postingsService.search(this.filter).then(result => {
      this.totalElements = result.totalElements;
      this.postings = result.content;
    });
  }

  whenChangingPage(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.search(page);
  }
}
