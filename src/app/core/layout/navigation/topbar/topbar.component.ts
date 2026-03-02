import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Logout } from '../../../auth/auth.actions';
import { AuthSelectors } from '../../../auth/auth.selectors';
import { UiLogoComponent } from '../../../../ui/logo/ui-logo.component';
import { UiLogoutButtonComponent } from '../../../../ui/topbar-actions/logout-button/ui-logout-button.component';
import { UiNotificationButtonComponent } from '../../../../ui/topbar-actions/notification-button/ui-notification-button.component';

@Component({
  standalone: true,
  selector: 'app-topbar',
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatIconModule,
    UiLogoComponent,
    UiNotificationButtonComponent,
    UiLogoutButtonComponent,
  ],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  @Output() menuToggle = new EventEmitter<void>();

  readonly userDisplayName$: Observable<string> = this.store.select(
    AuthSelectors.userDisplayName,
  );

  onMenuToggle(): void {
    this.menuToggle.emit();
  }

  logout(): void {
    this.store.dispatch(new Logout());
    void this.router.navigate(['/login']);
  }
}
