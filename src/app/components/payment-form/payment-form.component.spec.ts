import { Component, DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentFormComponent } from './payment-form.component';
import { PaymentService } from '../../services/payment.service';

describe('PaymentFormComponent', () => {
    let component: PaymentFormComponent;
    let fixture: ComponentFixture<PaymentFormComponent>;
    let debugElement: DebugElement;
    let formElem: DebugElement;
    let formControl: NgForm;
    let paymentService: PaymentService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
                HttpClientModule,
            ],
            providers: [
                PaymentService,
            ],
            declarations: [
                PaymentFormComponent,
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PaymentFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        debugElement = fixture.debugElement;
        formElem = debugElement.query(By.directive(NgForm));
        formControl = formElem && formElem.injector.get(NgForm);
        paymentService = TestBed.get(PaymentService);
    });

    beforeEach((done) => {
        fixture.whenStable().then(done);
    });

    it('has a form control', () => {
        expect(formControl).toBeTruthy('form should have NgForm control');
    });

    it('should validate creditCardNumber is required', () => {
        const control = getFormControl('creditCardNumber');
        expect(control).toBeTruthy('Expected creditCardNumber control was not found');
        if (control) {
            control.setValue('');
            expect(control.valid).toBeFalsy('creditCardNumber invalid when empty');

            control.setValue('1234567890');
            expect(control.valid).toBeTruthy('creditCardNumber valid when not empty');
        }
    });

    it('should validate cardholder is required', () => {
        const control = getFormControl('cardholder');
        expect(control).toBeTruthy('Expected cardholder control was not found');
        if (control) {
            control.setValue('');
            expect(control.valid).toBeFalsy('cardholder invalid when empty');

            control.setValue('test user');
            expect(control.valid).toBeTruthy('cardholder valid when not empty');
        }
    });

    it('should validate expirationDate is required', () => {
        const control = getFormControl('expirationDate');
        expect(control).toBeTruthy('Expected expirationDate control was not found');
        if (control) {
            control.setValue('');
            expect(control.valid).toBeFalsy('expirationDate invalid when empty');

            control.setValue(new Date());
            expect(control.valid).toBeTruthy('expirationDate valid when not empty');
        }
    });

    it('should validate amount is required', () => {
        const control = getFormControl('amount');
        expect(control).toBeTruthy('Expected amount control was not found');
        if (control) {
            control.setValue(0);
            expect(control.valid).toBeFalsy('amount invalid when empty or 0');

            control.setValue(200);
            expect(control.valid).toBeTruthy('amount valid when not empty');
        }
    });

    function getFormControl(name) {
        return formControl && formControl.form.get(name);
    }
});

