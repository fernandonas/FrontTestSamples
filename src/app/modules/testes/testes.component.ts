import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Dados } from './models/dados.model';
import { TestService } from './service/test.service';

@Component({
  selector: 'app-testes',
  templateUrl: './testes.component.html',
  styleUrls: ['./testes.component.less']
})

export class TestesComponent implements OnInit {
  @Input() show: boolean;
  showError: boolean;
  public subscription = new Subscription();
  public listaDeDados: Dados[];
  public dados: Dados;
  public texto = "";

  constructor(
    private readonly testeService: TestService
  ) { }

  ngOnInit(): void {
    this.buscaListaDeDados();
  }

  public buscaListaDeDados(): void {
    this.subscription.add(this.testeService.retornaListaDeDados().subscribe({
      next: response => {
        this.listaDeDados = response;
        this.showError = false;
      },
      error: () => {
        this.showError = true;
      }
    }));
  }

  public adicionarDados(): void {
    const dados: Dados = {id: 1, texto: this.texto.toString()};
    this.subscription.add(this.testeService.adicionarDados(dados).subscribe({
      next: response => {
        console.log(`${response.texto} adicionado com sucesso!`);
        this.texto = "";
        this.buscaListaDeDados();
      },
      error: () => {
        console.log("Erro ao adicionar !");
      }
    }));
  }

  public showList(): void {
    this.show = !this.show;
  }

  public buttonText(): string{
    return this.show ? 'OCULTAR LISTA' : 'EXIBIR LISTA';
  }
}
