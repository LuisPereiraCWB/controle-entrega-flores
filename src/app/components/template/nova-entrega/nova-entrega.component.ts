import { Produtos } from './../../../model/produtos';
import { Component, EventEmitter, OnChanges, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-nova-entrega',
  templateUrl: './nova-entrega.component.html',
  styleUrls: ['./nova-entrega.component.css']
})
export class NovaEntregaComponent {




  modal = {
    show: false,
    title: '',
    text: '',
  };
  
onItemValidationEvent(event: boolean){
  this.modal.show = event;
  this.modal.title = 'Aviso';
  this.modal.text = `Valor máximo permitido de 5 unidades`;
}

onCloseModal(){
  this.modal.show = false;
}

}
