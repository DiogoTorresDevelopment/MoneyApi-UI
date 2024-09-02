import { Component, OnInit } from '@angular/core';
import { PostingFilter, PostingsService } from '../postings.service';

@Component({
  selector: 'app-posting-search',
  templateUrl: './posting-search.component.html',
  styleUrls: ['./posting-search.component.css']
})
export class PostingSearchComponent implements OnInit {
  postingDescription: string;
  dueDateFrom: Date;
  dueDateTo: Date;
  postings = [];


  ngOnInit(): void {
    this.search();
  }

  constructor(private postingsService: PostingsService) {

  }

  search(): void {
    const filter: PostingFilter ={
      postingDescription: this.postingDescription,
      dueDateFrom: this.dueDateFrom,
      dueDateTo: this.dueDateTo
    }
    this.postingsService.search(filter).then(postings => this.postings = postings);
  }

}
