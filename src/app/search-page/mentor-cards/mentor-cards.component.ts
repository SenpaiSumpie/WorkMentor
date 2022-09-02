import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/backend/classes/user';
import { UserServiceService } from 'src/app/backend/services/user-service.service';

@Component({
  selector: 'app-mentor-cards',
  templateUrl: './mentor-cards.component.html',
  styleUrls: ['./mentor-cards.component.css']
})
export class MentorCardsComponent implements OnInit {

  search : string = "";
  searchField : string = "";
  users : User[] = [];

  loading : boolean;

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private userService: UserServiceService,
  ) { 
    this.loading = true;
  }

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe(params =>{
      this.searchField = params['careerSearch'];
      this.searchField = this.searchField?.replace(/-/g, ' ');
    });

    this.userService.findAll().subscribe(data =>{
      this.users = data;

      this.users = this.users.filter((search) =>{

        return (search.jobTitle.toLowerCase().replace(' ', '').includes(this.searchField?.toLowerCase().replace(' ', '')) && search.memberType == "Mentor");
      });

      this.loading = false;
    });
  }

  refresh() : void{
    setTimeout(()=>{
      window.location.reload();
    }, 100);
  }

  updateSearchField() : void {
    this.searchField = this.searchField?.replace(/-/g, ' ');
  }
}
