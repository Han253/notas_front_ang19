import { Injectable } from '@angular/core';
import { Nota } from '../models/notas';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//URL DEL BACKEND
const BASE_URL: string = 'http://localhost:8000';


@Injectable({
  providedIn: 'root'
})

export class NotaService {

  //Lista que contendrá la respuesta del backend
  notas:Array<Nota> = new Array<Nota>();

  constructor(private http:HttpClient) { }

  //Método para solicitar el listado de notas al backend
  obtenerNotas(): Observable<any>{
    return this.http.get<any>(BASE_URL+'/notes/')
  }

  //Método para enviar una nota al backend
  guardarNota(nota:Nota): Observable<Nota>{
    return this.http.post<Nota>(BASE_URL+'/notes/',nota);
  }

  //Método para solicitar actualizar la información de una nota en el backend
  actualizarNota(nota:Nota){
    return this.http.put<Nota>(BASE_URL+'/notes/'+nota.id+'/',nota);
  }

  //Método solicitar borrar una nota en el backend
  borrarNota(nota:Nota): Observable<any>{
    return this.http.delete<any>(BASE_URL+'/notes/'+nota.id+'/');
  }
}

