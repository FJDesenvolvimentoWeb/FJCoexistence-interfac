import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'ui-logout-button',
  imports: [MatButtonModule],
  templateUrl: './ui-logout-button.component.html',
  styleUrls: ['./ui-logout-button.component.scss'],
})
export class UiLogoutButtonComponent {
  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    this.clicked.emit();
  }
}
