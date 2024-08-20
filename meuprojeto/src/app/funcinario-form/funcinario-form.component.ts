import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-funcinario-form',
  templateUrl: './funcinario-form.component.html',
  styleUrls: ['./funcinario-form.component.css']
})
export class FuncinarioFormComponent {

  ultimoId = 0;
  nome = 'Diogo';
  adicionado = false;
  @Output() funcionarioAdicionado = new EventEmitter();

  adicionar() {
    this.adicionado = true;

    const funcionario = {
      id: ++this.ultimoId,
      nome: this.nome
    };

    this.funcionarioAdicionado.emit(funcionario);
  }

}
