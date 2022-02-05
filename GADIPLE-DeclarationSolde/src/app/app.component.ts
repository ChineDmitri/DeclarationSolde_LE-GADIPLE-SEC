import { Component, OnInit } from '@angular/core';

// import { AdminService } from './service/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'GADIPLE-DeclarationSolde';

  dateToday = new Date(Date.now());

  // constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    // this.adminService.getAllUsers();
    // this.dateToday.toLocaleString('de-DE');
  }
}
