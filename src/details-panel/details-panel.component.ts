import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { ITeamMember } from '../models/models';

@Component({
  selector: 'app-details-panel',
  standalone: true,
  templateUrl: './details-panel.component.html',
  styleUrl: './details-panel.component.css'
})
export class DetailsPanelComponent {
  @Input() teamMember!: any;
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey() {
    this.close.emit();
  }

  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('details-overlay')) {
      this.close.emit();
    }
  }
}
