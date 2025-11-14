import { TitleCasePipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { MatListItem, MatListItemTitle, MatNavList } from '@angular/material/list';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { ProductCard } from '../../components/product-card/product-card';
import { ToggleWishlistButton } from '../../components/toggle-wishlist-button/toggle-wishlist-button';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-products-grid',
  imports: [
    ProductCard,
    MatSidenavContainer,
    MatSidenavContent,
    MatSidenav,
    MatNavList,
    MatListItem,
    MatListItemTitle,
    RouterLink,
    TitleCasePipe,
    ToggleWishlistButton,
  ],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.scss',
})
export class ProductsGrid {
  category = input<string>('all');

  store = inject(EcommerceStore);

  categories = signal<string[]>([
    'all',
    'electronics',
    'clothes',
    'fitness',
    'accessories',
    'home',
  ]);

  constructor() {
    this.store.setCategory(this.category);
  }
}
