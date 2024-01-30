import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'YarnWorld';
  menuItems: MenuItem[] | undefined;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = [
      {
        icon: 'pi pi-cog',
        label: 'Pattern Administration',
        command: () => this.router.navigate(['/pattern-administration'])
      }
    ];
  }
}
