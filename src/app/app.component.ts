import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

  styleUrls: ['./app.component.css']
})
export class AppComponent{ //implements AfterViewInit{
  @ViewChild('mobile') sideNav?: ElementRef;

  title = 'controle-entrega-flores-app';

  ngAfterViewInit(): void {
    const $sideNav = this.sideNav?.nativeElement;
    M.Sidenav.init($sideNav);
  }


}
