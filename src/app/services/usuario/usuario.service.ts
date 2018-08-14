import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http'
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(private http: HttpClient) { 
    this.cargarStorage(); 
  }

  estaLogueado(){
    return ( this.token );
  }

  private cargarStorage() {
    this.token = localStorage.getItem("token") || null;
    this.usuario = JSON.parse(localStorage.getItem( "usuario" ));
  }

  private guardarStorage( id: string, token: string, usuario: Usuario ){
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  login( usuario: Usuario, recordar = false ){
    
    if ( recordar ){
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
  
    let url = `${ URL_SERVICIOS }/login`;
    return this.http.post( url, usuario ).map( (res: any) => {
      this.guardarStorage( res.id, res.token,res.usuario );
      return true;  
    });  
  }

  loginGoogle( token ){
    let url = `${ URL_SERVICIOS }/login/google`;
    return this.http.post( url, { token }).map( (res: any) => {
      this.guardarStorage( res.id, res.token,res.usuario );
      return true;  
    });  
  }

  crearUsuario( usuario: Usuario ){
    let url = `${ URL_SERVICIOS }/usuario`;
    return this.http.post( url, usuario ).map( (resp: any) => {
      swal('Usuario creado', resp.usuario.email, 'success');
      return resp.usuario;
    });
  } 

  logout(){
    localStorage.clear();
    this.usuario = null;
    this.token = null;
  }

}
