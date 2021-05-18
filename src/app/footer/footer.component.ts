import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {


  updated: Date = new Date;

  constructor(private datePipe: DatePipe) {
    (updated) => {
      updated = this.datePipe.transform(updated);
    }
  }

  ngOnInit() { }

}
