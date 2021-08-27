import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dados } from '../models/dados.model';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  public retornaListaDeDados(): Observable<Dados[]> {
    return this.httpClient.get('http://localhost:9000/dados') as Observable<Dados[]>;
  }

  public adicionarDados(dados: Dados): Observable<Dados> {
    return this.httpClient.post('http://localhost:9000/dados', dados) as Observable<Dados>;
  }
}
