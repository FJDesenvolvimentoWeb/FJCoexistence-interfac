import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'ui-divider-label',
  imports: [CommonModule],
  templateUrl: './ui-divider-label.component.html',
  styleUrls: ['./ui-divider-label.component.scss']
})
export class UiDividerLabelComponent {
  @Input() label = '';
}
