import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
    .ng-ivalid.ng-touched:not(form){
      border: 1px solid red;
    }
  `]
})
export class TemplateComponent implements OnInit{

  usuario = {
    nombre: '',
    apellido:'',
    correo: '',
    pais: ''
  }


  paises: any[] = []

  constructor(
    private paisesService:PaisesService
  ) { }

  ngOnInit(): void{

    this.paisesService.getPaises()
      .subscribe( paises => {
        this.paises = paises
      })

  }

  guardar(form: NgForm){
    
    if ( form.valid ) {
      console.log('Guardado');
      console.log(form.value)
    }

  }

}
