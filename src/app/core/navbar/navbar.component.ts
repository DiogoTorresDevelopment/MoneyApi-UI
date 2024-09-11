import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../security/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  exibindoMenu: boolean;

  ngOnInit()  {
  }

  constructor(private auth: AuthService){

  }

}
