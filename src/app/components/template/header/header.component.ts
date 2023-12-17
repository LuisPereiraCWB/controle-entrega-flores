import { Component, AfterViewInit } from '@angular/core';
import * as M from 'materialize-css';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit{

  ngAfterViewInit() {
    const elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);
  }

  largura: number = 64;
  altura: number = 64;

}
