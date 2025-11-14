import { Component, inject } from '@angular/core';
import { BackButton } from '../../components/back-button/back-button';
import { SummarizeOrder } from '../../components/summarize-order/summarize-order';
import { PaymentForm } from './payment-form/payment-form';
import { ShippingForm } from './shipping-form/shipping-form';
import { EcommerceStore } from '../../ecommerce-store';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-checkout',
  imports: [BackButton, ShippingForm, PaymentForm, SummarizeOrder, MatButton],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  store = inject(EcommerceStore);
}
