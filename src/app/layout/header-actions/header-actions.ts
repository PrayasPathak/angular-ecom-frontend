import { Component, inject } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatBadge } from '@angular/material/badge';
import { RouterLink } from '@angular/router';
import { EcommerceStore } from '../../ecommerce-store';
@Component({
  selector: 'app-header-actions',
  imports: [MatIcon, MatButton, MatIconButton, RouterLink, MatBadge],
  templateUrl: './header-actions.html',
  styleUrl: './header-actions.scss',
})
export class HeaderActions {
  store = inject(EcommerceStore);
}
