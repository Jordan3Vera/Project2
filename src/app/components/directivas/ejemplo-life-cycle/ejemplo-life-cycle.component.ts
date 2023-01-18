import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ejemplo-life-cycle',
  templateUrl: './ejemplo-life-cycle.component.html',
  styleUrls: ['./ejemplo-life-cycle.component.scss']
})
export class EjemploLifeCycleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
