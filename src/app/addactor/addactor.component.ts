import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-addactor',
  templateUrl: './addactor.component.html',
  styleUrls: ['./addactor.component.css']
})
export class AddactorComponent implements OnInit {
  
  fullName = "";
  bYear = 0;
  constructor(private db: DatabaseService, private router: Router) { }

  ngOnInit(): void {
  }

  onSaveActor() {
    let actor = {name: this.fullName, bYear: this.bYear};
    this.db.createActor(actor).subscribe(result => {
      this.router.navigate(["/listactors"]);
    })
  }

}
