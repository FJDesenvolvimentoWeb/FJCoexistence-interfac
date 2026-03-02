import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../navigation/sidebar/sidebar.component';
import { TopbarComponent } from '../navigation/topbar/topbar.component';

@Component({
  standalone: true,
  selector: 'app-shell',
  imports: [RouterOutlet, SidebarComponent, TopbarComponent],
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
})
export class AppShellComponent {
  isMobileSidebarOpen = false;

  toggleSidebar(): void {
    this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
  }

  closeSidebar(): void {
    this.isMobileSidebarOpen = false;
  }
}
