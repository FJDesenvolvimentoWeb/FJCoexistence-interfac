import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'ui-notification-button',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './ui-notification-button.component.html',
  styleUrls: ['./ui-notification-button.component.scss'],
})
export class UiNotificationButtonComponent {
  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    this.clicked.emit();
  }
}
