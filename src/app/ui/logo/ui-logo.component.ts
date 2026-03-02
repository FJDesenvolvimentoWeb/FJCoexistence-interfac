import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ui-logo',
  templateUrl: './ui-logo.component.html',
  styleUrls: ['./ui-logo.component.scss'],
})
export class UiLogoComponent {
  @Input() iconOnly = false;
  @Input() stacked = true;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
}
