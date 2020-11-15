import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { CreditCard } from '../../models/credit-card.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit, OnDestroy {

  creditCard: CreditCard;
  minDate: Date;
  disabled = false;
  private subcription: Subscription;

  constructor(private paymentService: PaymentService) {
  }

  ngOnInit() {
    this.minDate = new Date();
    this.creditCard = new CreditCard();
  }

  // method used to save user provided payment details
  submit() {
    this.subcription = this.paymentService.savePaymentData(this.creditCard).subscribe((data) => {
      if (data) {
        this.disabled = true;
        alert('Payment made successfully. Refresh page to make another payment');
      }
    })
  }

  // unsubcribe the observables
  ngOnDestroy() {
    if (this.subcription) {
      this.subcription.unsubscribe();
    }
  }

}
