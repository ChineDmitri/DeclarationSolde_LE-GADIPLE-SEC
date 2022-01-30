import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-one-user',
  templateUrl: './one-user.component.html',
  styleUrls: ['./one-user.component.scss'],
})
export class OneUserComponent implements OnInit {
  @Input() name: string;
  @Input() dateRDC: any;
  @Input() _id: string;

  constructor() {}

  ngOnInit(): void {}
}
