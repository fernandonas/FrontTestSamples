import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ButtonComponent } from '../../components/button/button.component';
import { Dados } from '../../models/dados.model';
import { dadosMock } from '../../models/mocks/_dados.mock';
import { TestService } from '../../service/test.service';
import { TestesComponent } from './testes.component';

@Injectable()
export class TestServiceMock extends TestService {

  public retornaListaDeDados(): Observable<Dados[]> {
    return new Observable<Dados[]>(obs => {
      const response: Dados[] = [{ id: 0, texto: 'Texto' }];
      obs.next(response)
    });
  }

  public adicionarDados(dados: Dados): Observable<Dados> {
    return new Observable<Dados>(obs => {
      const response: Dados = { id: 0, texto: 'Texto' };
      obs.next(response)
    });
  }
}

describe('TestesComponent', () => {
  let component: TestesComponent;
  let fixture: ComponentFixture<TestesComponent>;
  let testService: TestService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestesComponent, ButtonComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule
      ],
      providers: [
        { provide: TestService, useClass: TestServiceMock }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestesComponent);
    testService = fixture.debugElement.injector.get(TestService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve popular listadeDados com dados da api', () => {
    component.buscaListaDeDados();
    const div = fixture.debugElement.nativeElement.getElementsByTagName('div')[1]?.innerText;
    expect(component.listaDeDados).toEqual([{ id: 0, texto: 'Texto' }]);
    expect(component.showError).toBeFalse();
    expect(div).toEqual(undefined);
  });

  it('Não deve popular listaDeDados se API retornar um erro ', () => {
    component.listaDeDados = undefined;
    const ObservableReturn = new Observable<Dados[]>(observable => {
      observable.error(new Error("Erro"));
    });
    spyOn(testService, 'retornaListaDeDados').and.returnValue(ObservableReturn);
    component.buscaListaDeDados();
    fixture.detectChanges();
    const div = fixture.debugElement.nativeElement.getElementsByTagName('div')[1]?.innerText;
    expect(component.listaDeDados).toEqual(undefined);
    expect(component.showError).toBeTrue();
    expect(div).toEqual('Erro ao carregar Lista!!');
  });


  it('Deve adicionar dados', () => {
    component.dados = dadosMock;
    spyOn(window.console, 'log');
    component.adicionarDados();
    expect(window.console.log).toHaveBeenCalledOnceWith(`${dadosMock.texto} adicionado com sucesso!`);
  });


  it('Não deve adicionar dados se conter espaços', () => {
    const observableReturn = new Observable<Dados>(obs => {
      const response: Dados = { id: 0, texto: 'Texto' };
      obs.error(response)
    });
    spyOn(testService, 'adicionarDados').and.returnValues(observableReturn);
    spyOn(window.console, 'log');
    component.adicionarDados();
    expect(window.console.log).toHaveBeenCalledOnceWith("Erro ao adicionar !");
  });

  it('Deve mudar o valor da variável show para false', () => {
    component.show = true;
    fixture.detectChanges();
    component.showList();
    expect(component.show).toBeFalse();
  });

  it('Deve mudar o valor da variável show para true', () => {
    component.show = false;
    fixture.detectChanges();
    component.showList();
    expect(component.show).toBeTrue();
  });

  it('Metodo buttonText deve retornar o texto OCULTAR LISTA', () => {
    component.show = true;
    fixture.detectChanges();
    const response = component.buttonText();
    expect(response).toEqual('OCULTAR LISTA');
  });

  it('Metodo buttonText deve retornar o texto EXIBIR LISTA', () => {
    component.show = false;
    fixture.detectChanges();
    const response = component.buttonText();
    expect(response).toEqual('EXIBIR LISTA');
  });

  it('Deve chamar o metodo showList se clicar no botão EXIBIR LISTA', () => {
    component.show = false;
    spyOn(component, 'showList');
    fixture.debugElement.nativeElement.getElementsByTagName('button')[0].click();
    expect(component.showList).toHaveBeenCalled();
  });
});
