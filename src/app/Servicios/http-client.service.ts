import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  public marcas: any[];
  public submarcas: any[];
  public modelos: any[];
  public descripciones: any[];
  public estado: String;
  public municipio: String;
  public colonias: any[];
  


  constructor(private clienteHttp: HttpClient) {
    this.marcas = [];
    this.submarcas = [];
    this.modelos = [];
    this.descripciones = [];
    this.estado = "";
    this.municipio = "";
    this.colonias = [];
  }

  getMarcas(): void{
    this.submarcas = [];
    this.modelos = [];
    this.descripciones = [];
    this.clienteHttp.get("http://localhost:8080/api/marcas").subscribe((resp: any) => {
      console.log(resp);
      this.marcas = resp
    });
  }

  getSubMarcasByMarca(idMarca: number): void{
    this.modelos = [];
    this.descripciones = [];
    this.clienteHttp.get("http://localhost:8080/api/submarcas/" + idMarca).subscribe((resp: any) => {
      console.log(resp);
      this.submarcas = resp;
    });
  }

  getModelosBySubmarca(idSubmarca: number): void{
    this.descripciones = [];
    this.clienteHttp.get("http://localhost:8080/api/modelos/" + idSubmarca).subscribe((resp: any) => {
      console.log(resp);
      this.modelos = resp;
    });
  }

  getDescripcionesByModelo(idModelo: number): void{
    this.clienteHttp.get("http://localhost:8080/api/descripciones/" + idModelo).subscribe((resp: any) => {
      console.log(resp);
      this.descripciones = resp;
    });
  }

  getInfoCP(CP: String): void{
    this.clienteHttp.get("https://api-test.aarco.com.mx/api-examen/api/examen/sepomex/" + CP).subscribe((resp: any) => {
      let jsonObj = JSON.parse(resp.CatalogoJsonString);
      console.log(jsonObj);
      this.estado = jsonObj[0].Municipio.Estado.sEstado;
      this.municipio = jsonObj[0].Municipio.sMunicipio;
      console.log(this.estado);
      console.log(this.municipio);
      this.colonias = jsonObj[0].Ubicacion
      //this.descripciones = resp;
    });
  }


  createRequest(idDescripcion: String){
    console.log("debo hacer peticion con id " + idDescripcion);
    this.clienteHttp.post("https://api-test.aarco.com.mx/api-examen/api/examen/crear-peticion", {"DescripcionId": idDescripcion}).subscribe((resp: any) => {
      console.log(resp);
      this.clienteHttp.get("https://api-test.aarco.com.mx/api-examen/api/examen/peticion/" + resp).subscribe(async (resp2: any) => {
        await this.delay(25000, resp2);
        console.log(resp2);
      })
    });
  }

  delay(ms: number, r: any) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }


  

 

}
