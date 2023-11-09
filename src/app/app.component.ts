import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  @ViewChild('mobile') sideNAv?: ElementRef;
  
  title = 'controle-entrega-flores-app';

  ngAfterViewInit(): void {
    let $sideNav = $('#mobile-demo');
    M.Sidenav.init($sideNav);
  }

}
