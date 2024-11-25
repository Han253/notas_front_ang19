import { Component, OnInit } from '@angular/core';
import { Nota } from '../models/notas';
import { NotaService } from '../service/nota.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-notas',
  standalone: false,  
  templateUrl: './notas.component.html',
  styleUrl: './notas.component.css'
})

export class NotasComponent implements OnInit{

  //Variables para almacenar respuestas de consultas API REST.
  notas:Array<Nota> = new Array<Nota>();

  //Maneja la visualización del modal en la página
  modal = false;

  // @ts-ignore
  // Variable que representa el formulario para crear o actualizar notas
  notaForm: FormGroup;

  // @ts-ignore
  //Variable para almacenar una copia de la nota a actualizar
  nota_up:Nota;


  constructor(private servicio: NotaService, private fbGenerator: FormBuilder){
    this.nota_up = new Nota();
  }

  ngOnInit(): void {
    //Generar valores para formulario en Modal
    this.notaForm = this.fbGenerator.group({
      titulo:[''],
      contenido:['']
    })

    //Obtener notas del backend
    this.servicio.obtenerNotas().subscribe((respuesta)=>{
      this.notas = respuesta.results;
    });      
  }

  //Se ejecuta cuando se muestra el formulario para crear una nota
  nueva_nota(){
    this.notaForm.setValue({
      titulo:'',
      contenido:''
    });
  }

  //Se ejecuta cuando se envía una nota nueva para crear al backend
  agregar_nota(){
    var nota = this.notaForm.value as Nota;
    this.servicio.guardarNota(nota).subscribe((notaNueva)=>{
      //Consultar y actualizar lista de notas.
      this.servicio.obtenerNotas().subscribe((respuesta)=>{
        this.notas = respuesta.results;
        this.modal = false;
      });
    });
  }

  //Se ejecuta cuando se muestra el formulario para actualizar una nota
  see_update(nota:Nota){
    this.nota_up = nota;
    this.notaForm.setValue({
      titulo:nota.titulo,
      contenido:nota.contenido
    });
  }

  //Se ejecuta cuando se envia la actualización de una nota al backend
  actualizar_nota(){
    var nota = this.notaForm.value as Nota;
    nota.id = this.nota_up.id
    this.servicio.actualizarNota(nota).subscribe((notaNueva)=>{
      //Consultar y actualizar lista de notas.
      this.servicio.obtenerNotas().subscribe((respuesta)=>{
        this.notas = respuesta.results;
        this.modal = false;
      });
    });
  }

  

  //Se ejecuta cuando eliminamos una nota
  borrar_Nota(nota:Nota){
    this.servicio.borrarNota(nota).subscribe((response)=>{
      //Consultar y actualizar lista de notas.
      this.servicio.obtenerNotas().subscribe((respuesta)=>{
        this.notas = respuesta.results;
        this.modal = false;
      });
    });
  }

}

