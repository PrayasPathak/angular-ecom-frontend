import { Component, computed, inject, input, signal } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductCard } from '../../components/product-card/product-card';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatNavList, MatListItem, MatListItemTitle } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
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
