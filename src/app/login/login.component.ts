import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  email: string;
  auth2: any;

  constructor( public _router: Router, public _usuarioService: UsuarioService ) { }

  ngOnInit() {
    init_plugins();
    this.email = localStorage.getItem('email') || '';

    this.googleInit();
  }

  private googleInit(){
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '128797127361-i92eecd6forg7duh4dhm99v4de6vg5hn.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSingIn( document.getElementById('btnGoogle') );
  
    });
  }

  attachSingIn( element ){
    this.auth2.attachClickHandler( element , {}, (googleUser) => {     
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;      
      this._usuarioService.loginGoogle(token)
                          .subscribe( correcto => window.location.href = '#/dashboard');
    });
  }

  ingresar( formulario: NgForm ) {    
    if ( formulario.invalid ) return;
    let usuario = new Usuario(null, formulario.value.email, formulario.value.password);
    this._usuarioService.login( usuario , formulario.value.recuerdame )
                        .subscribe( correcto => window.location.href = '#/dashboard');
  }

}
