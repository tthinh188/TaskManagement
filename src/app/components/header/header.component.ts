import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  access_token = localStorage.getItem('access_token');

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToHome():void {
    this.router.navigate(['/'])
    // window.location.href = "/"
  }

  logout():void {
    localStorage.removeItem('access_token')
    this.access_token = '';
  }
}
