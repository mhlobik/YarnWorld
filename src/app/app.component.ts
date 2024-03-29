import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from './shared/services/auth.service';
import { User } from './shared/models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'YarnWorld';
  menuItems: MenuItem[] = [];
  currentUser: User | undefined;
  currentUserSubscription: Subscription | undefined;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.getMenuItems();

    this.currentUserSubscription = this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.getMenuItems();
      }
    });
  }

  ngOnDestroy(): void {
    this.currentUserSubscription?.unsubscribe();
  }

  getMenuItems() {
    if (this.currentUser?.role === 'admin') {
      this.menuItems = [
        {
          icon: 'pi pi-cog',
          label: 'Pattern Administration',
          command: () => this.router.navigate(['/pattern-administration'])
        },
        {
          icon: 'pi pi-cog',
          label: 'Logout',
          command: () => {
            this.authService.logout(true);
            this.currentUser = undefined;
            this.menuItems = [];
          }
        }
      ];
    } else {
      this.menuItems = [
        {
          icon: 'pi pi-cog',
          label: 'Logout',
          command: () => {
            this.authService.logout(true);
            this.currentUser = undefined;
            this.menuItems = [];
          }
        }
      ];
    }
  }
}