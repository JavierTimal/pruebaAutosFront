import { Component, ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpClientService } from './Servicios/http-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ConsumoApiAutos';
  @ViewChild("marca") marca!: ElementRef;
  @ViewChild("submarca") submarca!: ElementRef;
  @ViewChild("modelo") modelo!: ElementRef;
  @ViewChild("descripcion") descripcion!: ElementRef;

  /**
   *
   */
  constructor(private servicio: HttpClientService) {
    this.servicio.getMarcas();
    
  }

  get marcas(){
    return this.servicio.marcas;
  }

  onChangeMarca(value: any) {
    console.log(value.target.value);
    this.servicio.getSubMarcasByMarca(value.target.value);
  }

  get submarcas(){
    return this.servicio.submarcas;
  }

  onChangeSubmarca(value: any) {
    console.log(value.target.value);
    this.servicio.getModelosBySubmarca(value.target.value);
  }

  get modelos(){
    return this.servicio.modelos;
  }

  onChangeModelo(value: any) {
    console.log(value.target.value);
    this.servicio.getDescripcionesByModelo(value.target.value);
  }

  get descripciones(){
    return this.servicio.descripciones;
  }
  onChangeDescripcion(value: any) {
    console.log(value.target.value);
    //this.servicio.getDescripcionesByModelo(value.target.value);
  }

  onChangeCP(value: any) {
    console.log(value.target.value);
    this.servicio.getInfoCP(value.target.value);
  }

  get municipio(){
    return this.servicio.municipio
  }

  
  get estado(){
    return this.servicio.estado
  }

  get colonias(){
    return this.servicio.colonias;
  }

  validarDatos(): void{
    const marca: number = this.marca.nativeElement.value;
    const submarca: number = this.submarca.nativeElement.value;
    const modelo: number = this.modelo.nativeElement.value;
    const descripcion: string = this.descripcion.nativeElement.value;
    console.log(marca)
    console.log(submarca)
    console.log(modelo)
    console.log(descripcion)
    if(marca == -1 || submarca == -1 || modelo == -1 || descripcion == "-1"){
      console.log("validar");
      Swal.fire(
        'Error',
        'Favor de ingresar todos los datos del auto',
        'warning'
      )
      return;
    }
    this.servicio.createRequest(descripcion);

  }
}
