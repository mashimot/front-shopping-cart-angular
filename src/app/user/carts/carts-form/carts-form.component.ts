import {
  Component,
  Input,
  OnInit,
  SimpleChanges
} from '@angular/core'
import {
  Validators,
  FormControl,
  AbstractControl,
  FormGroup,
  FormBuilder,
  FormArray,
} from '@angular/forms'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AddressService } from './../../../services/addresses/address.service';
import { CartService } from './../../../services/carts/cart.service';
import { ArrayValidators } from './../../../shared/validators';

@Component({
  selector: 'app-carts-form',
  templateUrl: './carts-form.component.html',
  styleUrls: ['./carts-form.component.css']
})
export class CartsFormComponent implements OnInit {
    @Input() product: any;
    
    form!: FormGroup;
    formSubmitAttempt: boolean = false;
    addresses$?: Observable<any>;

    get f() {
        return this.form;
    }

    get cart(): FormArray {
        return this.form.get('cart') as FormArray;
    }

    get userAddressId() : FormControl {
        return this.f.get('user_address_id') as FormControl;
    }

    constructor(
        private formBuilder: FormBuilder,
        private addressService: AddressService,
        private cartService: CartService,
        private router: Router
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (this.product && this.product.id) {
            this.cart.push(this.createCart());
            this.cart.at(
                this.cart.value.length - 1
            )
                .patchValue({
                    name: this.product.name,
                    product_id: this.product.id || '',
                    price: this.product.price
                });
        }
    }

    ngOnInit(): void {
        this.addresses$ = this.getAddresses();
        this.form = this.formBuilder.group({
            "cart": this.formBuilder.array(
                [], 
                [
                    ArrayValidators.minLengthArray(1)
                ]
            ),
            "user_address_id": ['', [Validators.required]]
        });
    }

    onSubmit(): void {
        this.formSubmitAttempt = true;
        if (this.f.valid) {
            this
                .cartService
                .pay(this.f.value)
                .subscribe(r => {
                    if(r){
                        console.log('r', r);
                        this.router.navigate(['user', 'orders', r.order_id ])
                        this.cart.clear();
                        this.f.reset();
                    }
                });
        } else {
            this.validateAllFormFields(this.f);
        }
    }

    validateAllFormFields(control: AbstractControl) {
        if (control instanceof FormControl) {
            control.markAsTouched({
                onlySelf: true
            });
        } else if (control instanceof FormGroup) {
            Object.keys(control.controls).forEach((field: string) => {
                const groupControl = control.get(field) !;
                this.validateAllFormFields(groupControl);
            });
        } else if (control instanceof FormArray) {
            const controlAsFormArray = control as FormArray;
            controlAsFormArray.controls.forEach((arrayControl: AbstractControl) => this.validateAllFormFields(arrayControl));
        }
    }

    isFieldValid(field: string) {
        return !this.f.get(field)?.valid && this.f.get(field)?.touched;
    }

    getField(field: string) {
        return this.f.get(field);
    }

    deleteCart(indexCart: number): void {
        this.cart.removeAt(indexCart);
    }

    createCart() {
        return this.formBuilder.group({
            "price": ['', [Validators.required]],
            "name": ['', []],
            "quantity": [1, [Validators.required, Validators.minLength(1), Validators.maxLength(9999)]],
            "product_id": ['', [Validators.required]],
        })
    }

    public getAddresses(){
        return this.addressService.getAddresses();
    }
}