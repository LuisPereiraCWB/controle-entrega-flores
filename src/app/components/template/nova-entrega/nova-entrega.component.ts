import { JsonService } from './../../../services/jsonService';
import { EntregaData } from './../../../model/entregaData';
import { Produtos } from './../../../model/produtos';
import { Component, EventEmitter, OnChanges, Input, Output, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { Entrega } from 'src/app/model/entrega';
import { StorageService } from 'src/app/services/StorageService';
import { validateCPF } from 'src/app/util/validateCPF';
import { ActivatedRoute, Router } from '@angular/router';
import { provideNgxMask, NgxMaskDirective } from 'ngx-mask';
import { apenasLetras, apenasNumeros } from '../../../util/validaNome';

@Component({
  selector: 'app-nova-entrega',
  templateUrl: './nova-entrega.component.html',
  styleUrls: ['./nova-entrega.component.css'],
  providers: [ provideNgxMask(), ]
})
export class NovaEntregaComponent  {

  @ViewChild('form') form!: NgForm;

  entregas: Entrega[] = [];
  entregaDados!: Entrega;
  entregaEdit: any;
  novaEntregaForm: any;

  constructor(
    private formBuilder: FormBuilder,
    public storageService: StorageService,
    public jsonService : JsonService,
    private route: ActivatedRoute
    ){}
  ngOnInit() {
    const entregaId = this.route.snapshot.params['id'];
    if (entregaId != null){
      const entrega = this.obterEntregaPorId(entregaId);

      console.log('this.entregaEdit:', this.entregaEdit);

      this.jsonService.setEntregaEdit(entrega);
    }

    this.inicializarFormulario();
  }

  obterEntregaPorId(entregaId: number): any {
    this.jsonService.obterEntregaPorId(entregaId).subscribe(
      entrega => {
        this.entregaEdit = entrega;
        this.inicializarFormulario();
      },
      erro => {
        console.error('Erro ao obter entrega por ID:', erro);
      }
    );
  }

  inicializarFormulario() {

    console.log('this.entregaEdit' + this.entregaEdit);

    if (this.entregaEdit) {
      this.novaEntregaForm = this.formBuilder.group({
        nome: [this.entregaEdit.nome, [Validators.required], [apenasLetras()]],
        cpf: [this.entregaEdit.cpf, [Validators.required], [apenasNumeros()]],
        endereco: [this.entregaEdit.endereco, Validators.required],
        telefone: [this.entregaEdit.telefone, Validators.required],
        quantidade: [this.entregaEdit.quantidade, Validators.required],
        produto: [this.entregaEdit.produto, Validators.required],
        observacao: [this.entregaEdit.observacao, Validators.required]
      });
      this.novaEntregaForm.patchValue(this.entregaEdit);
    } else {
      this.novaEntregaForm = this.formBuilder.group({
        nome: ['', [Validators.required], [apenasLetras()]],
        cpf: ['', [Validators.required], [apenasNumeros()]],
        endereco: ['', Validators.required],
        telefone: ['', Validators.required],
        quantidade: ['', Validators.required],
        produto: ['', Validators.required],
        observacao: ['', Validators.required]
      });
    }
  }

  onSubmitEntregaForm(): void {
    if(this.novaEntregaForm.value && this.novaEntregaForm.valid){
      console.log("Botão salvar");

      // Recuperando os objetos do localStorage
      const chavesLocalStorage = Object.keys(localStorage);

      const objetosRecuperados: Entrega[] = chavesLocalStorage
        .filter(chave => chave.startsWith('entregas'))
        .map(chave => {
          const objetoStringRecuperado: string | null = localStorage.getItem(chave);
          if (objetoStringRecuperado) {
            //console.log('objetoStringRecuperado' + objetoStringRecuperado);
            return JSON.parse(objetoStringRecuperado) as Entrega;
          } else {
            return null;
          }
        })
        .filter(objeto => objeto !== null) as Entrega[];

      console.log('*****' + objetosRecuperados);
      const objetosRecuperadosLocalService: Entrega[] = this.storageService.getAllEntregas();

      const ultimaIdUtilizada = objetosRecuperadosLocalService.reduce((maxId, entrega) => Math.max(maxId, entrega.id!), 0);
      console.log('ultima id: ' + ultimaIdUtilizada);

      const entregaData = {
        id: ultimaIdUtilizada +1,
        nome: this.novaEntregaForm.value.nome!,
        endereco: this.novaEntregaForm.value.endereco!,
        cpf: this.novaEntregaForm.value.cpf!,
        telefone: this.novaEntregaForm.value.telefone!,
        produto: this.novaEntregaForm.value.produto!,
        quantidade: this.novaEntregaForm.value.quantidade!,
        observacao: this.novaEntregaForm.value.observacao!,
        entregue: false
      };

      console.log(entregaData);
      this.entregas = objetosRecuperados;
      const entregaString: string = JSON.stringify(entregaData);
      objetosRecuperados.push(entregaData);
      //console.log(this.entrega);

      if (this.entregaEdit) {
        // Atualização de entrega existente
        this.jsonService.atualizarEntrega(this.entregaEdit.id, entregaData).subscribe(
          resposta => {
          console.log('Resposta do servidor:', resposta);
          this.entregaEdit = entregaData;
          this.inicializarFormulario();
          alert('Entrega atualizada');
        },
        erro => {
          console.error('Erro ao enviar dados:', erro);
        }
      );

      } else {
        //salva no local storage
        this.storageService.salvarEntrega(entregaData);
        //salva no json server
        this.jsonService.salvarEntregaJson(entregaData).subscribe(
          resposta => {
            console.log('Resposta do servidor:', resposta);
            alert('Entrega cadastrada');
          },
          erro => {
            console.error('Erro ao enviar dados:', erro);
          }
        );
      }

      this.limparFormulario();
      this.inicializarFormulario();
    }
  }

  limparFormulario(): void{
    this.novaEntregaForm.reset();
    this.form.resetForm();
  }
}
