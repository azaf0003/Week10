import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-listactors',
  templateUrl: './listactors.component.html',
  styleUrls: ['./listactors.component.css']
})
export class ListactorsComponent implements OnInit {
  actorsDB: any[] = [];
  selectedActor = null;
  
  constructor(private db: DatabaseService) { }

  ngOnInit(): void {
    this.getActors();
  }

  getActors() {
    this.db.getActors().subscribe((data:any[]) => {
      this.actorsDB=data;
    })
  }

  selectActor(actor){
    this.selectedActor = actor;
  }

}
