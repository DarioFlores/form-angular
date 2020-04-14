import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  

  forma: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validadores: ValidadoresService
  ) { 
    this.crearFormulario();
    this.cargarFormulario();
  }

  ngOnInit(): void {
  }

  get pasatiempos(){
    return this.forma.get('pasatiempos') as FormArray
  }

  get nombreNoValido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }

  get apellidoNoValido(){
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched
  }
  
  get correoNoValido(){
    return this.forma.get('correo').invalid && this.forma.get('correo').touched
  }

  get usuarioNoValido(){
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched
  }

  get calleNoValido(){
    return this.forma.get('direccion.calle').invalid && this.forma.get('direccion.calle').touched
  }

  get numeroNoValido(){
    return this.forma.get('direccion.numero').invalid && this.forma.get('direccion.numero').touched
  }

  get pass1NoValido(){
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched
  }

  get pass2NoValido(){
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;

    return ( pass1 === pass2 ) ? false : true;
  }
  
  crearFormulario(){
    
    this.forma = this.fb.group({
      nombre    : [
        '',  //Valores por defecto del campo
        [Validators.required, Validators.minLength(5)], // Validaciones sincronas del campo
        []  // Validaciones asincronas del campo
      ],
      apellido  : ['', [Validators.required, this.validadores.noFlores]],
      correo    : ['', [Validators.email, Validators.required]],
      usuario    : ['',  Validators.required, this.validadores.existeUsuario],
      pass1    : ['',  Validators.required],
      pass2    : ['', Validators.required],
      direccion : this.fb.group({
        calle   : ['', [Validators.required, Validators.minLength(3)]],
        numero  : ['', [Validators.required, Validators.min(1)]]
      }),
      pasatiempos: this.fb.array([]) 

    },{
      //validators: this.validadores.passwordsIguales('pass1','pass2')
    });
  }

  agregarPasatiempo(){
    this.pasatiempos.push( this.fb.control('', Validators.required) )
  }

  borrarPasatiempo(i: number){
    this.pasatiempos.removeAt(i);
  }

  cargarFormulario() {
    this.forma.reset({
      nombre: 'Dario',
      apellido: 'Tejada',
      correo: 'dario@gmail.com',
      pass1: '123',
      pass2: '123',
      direccion: {
        calle: 'Pasaje Madueño',
        numero: '137'
      }
    })

    const array:string[] = ['Comer', 'Cagar']

    array.forEach( valor => {
      this.pasatiempos.push( this.fb.control( valor ))
    })
  }



  guardar(){

    if ( this.forma.valid ) {
      console.log(this.forma.value)
    } else {

      // cambia el estado del touched
      return Object.values( this.forma.controls ).forEach( control => {
        
        if (control instanceof FormGroup) {
          Object.values( control.controls ).forEach( control => {
            control.markAsTouched();
          });
        } else {
          control.markAsTouched();
        }
      });
    }
  }

}
