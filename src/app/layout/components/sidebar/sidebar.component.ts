import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  totalCount: number;
  bookmarkCount: number;
  doneCount: number;
  ongoingCount: number;
  constructor() { }

  ngOnInit(): void {
  }

}
