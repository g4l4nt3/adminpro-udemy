import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(private _usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  logout(){
    this._usuarioService.logout();
    window.location.href = '#/login';
  }

}
