import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { UiLogoComponent } from '../../../../ui/logo/ui-logo.component';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive, MatIconModule, UiLogoComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() isMobileOpen = false;
  @Output() navigated = new EventEmitter<void>();
  @Output() closeRequested = new EventEmitter<void>();

  readonly menuItems: MenuItem[] = [
    { label: 'Hoje', icon: 'today', route: '/app/dashboard' },
    { label: 'Conversas', icon: 'chat', route: '/app/inbox' },
    { label: 'Funil', icon: 'filter_alt', route: '/app/funnel' },
    { label: 'Contatos', icon: 'contacts', route: '/app/contacts' },
  ];

  onNavigate(): void {
    this.navigated.emit();
  }

  onRequestClose(): void {
    this.closeRequested.emit();
  }
}
