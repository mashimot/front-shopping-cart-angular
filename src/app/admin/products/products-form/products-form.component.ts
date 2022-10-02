import {
  Component,
  OnInit
} from '@angular/core'
import {
  Validators,
  FormControl,
  AbstractControl,
  FormGroup,
  FormBuilder,
  FormArray,
  ValidatorFn
} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import {
  Observable,
  of
} from 'rxjs';
import {
  delay, map, switchMap, tap
} from 'rxjs/operators';
import { ProductService } from 'src/app/services/products/product.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit {
  form!: FormGroup;
  formSubmitAttempt: boolean = false;
  id: any;

  get f() {
    return this.form;
  }

  get name() {
      return this.f.get('name');
  }
  
  get description() {
      return this.f.get('description');
  }
  
  get price() {
      return this.f.get('price');
  }

  constructor(
      private formBuilder: FormBuilder,
      private productService: ProductService,
      private router: Router,
      private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.route.paramMap
      .pipe(
        map(paramMap => paramMap.get('id') || null),
        tap(id => this.id = id),
        switchMap((id: any) => {
          return this.productService.show(id);
        })
      )
        .subscribe(r => {
          this.f.patchValue(r);
        });
  }

  buildForm(){
    this.form = this.formBuilder.group({
      "name": ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      "description": ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      "price": ['', [Validators.required]],
    });
  }

  onSubmit(): void {
      this.formSubmitAttempt = true;
      if (this.f.valid) {
        if(this.id){
          this
            .productService
            .update(this.f.value, this.id)
            .subscribe(r => {
              if(r){
                this.router.navigate(['admin', 'products']);
              }
            });
        } else {
          this
            .productService
            .store(this.f.value)
            .subscribe(r => {
              if(r){
                this.router.navigate(['admin', 'products']);
              }
            });
        }
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
}