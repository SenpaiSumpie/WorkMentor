import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-search-results',
  templateUrl: './main-search-results.component.html',
  styleUrls: ['./main-search-results.component.css']
})
export class MainSearchResultsComponent implements OnInit {

  searchField : string = "";

  constructor(
    private _Activatedroute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    // https://stackoverflow.com/questions/36835123/how-do-i-pass-data-to-angular-routed-components
    // https://www.tektutorialshub.com/angular/angular-passing-parameters-to-route/
    this._Activatedroute.params.subscribe(params => {
      this.searchField = params['careerSearch']
    });

    this.searchField = this.searchField?.replace(/-/g, ' ');
  }

  updateSearchField() : void {
    this.searchField = this.searchField?.replace(/-/g, ' ');
  }
}
