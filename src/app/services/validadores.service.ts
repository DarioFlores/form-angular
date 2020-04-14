import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidador{
  [s:string]: boolean
}


@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  existeUsuario( control: FormControl ): Promise<ErrorValidador> | Observable<ErrorValidador>{
    return new Promise( (res, rej) => {

      if ( !control.value ) {
        res( null );
      }

      setTimeout( () => {
        
        if ( control.value === 'dario321') {
          res({ existe: true });
        } else {
          res( null );
        }

      }, 200)
    })
  }

  noFlores( control: FormControl ): ErrorValidador {
    if ( control.value?.toLowerCase() === 'flores' ) {
      return {
        noFlores: true
      }
    }

    return null;
  }


  passwordsIguales(pass1Name: string, pass2Name:string) {

    return ( formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];

      if ( pass1Control.value === pass2Control.value ) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({
          noEsIgual: true
        });
        
      }

    }
  }
}
