import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http'
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  crearUsuario( usuario: Usuario ){
      let url = `${ URL_SERVICIOS }/usuario`;
      return this.http.post( url, usuario );
  }

}
