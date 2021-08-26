import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { Dados } from './models/dados.model';
import { TestService } from './service/test.service';
import { TestesComponent } from './testes.component';

// Testes devem ser feito dentro de um describe.
describe('TestesComponent', () => {
  // Cria uma váriavel com o tipo Do componente.
  let component: TestesComponent;

  //Cria uma variável que vai receber a instancia do componente.
  let fixture: ComponentFixture<TestesComponent>;

  let testService: TestService;


  // BeforeEach é sempre chamado antes de rodar um teste.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      //declara o componente utilizado.
      declarations: [TestesComponent],
      imports: [
        // Usado para simular http request.
        HttpClientTestingModule
      ],
      providers: [
        // Informa as serviços injetados no teste.
        TestService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    testService = TestBed.inject(TestService);

    // Cria uma instancia do componente.
    fixture = TestBed.createComponent(TestesComponent);

    // Variável recebe a instancia do componente
    component = fixture.componentInstance;

    // Detecta se uma variável foi alterada.
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve popular listadeDados com dados da api', () => {
    // Dados que vão ser retornados.
    const dataResponse: Dados[] = [
      {
        id: 0,
        texto: 'Texto'
      }
    ];
    //Observable que vai ser retornado pelo metodo retornaListaDeDados.
    const ObservableReturn = new Observable<Dados[]>(observable => {
      observable.next(dataResponse);
    });
    // SpyOn serve para mockar o retorno de um método.
    spyOn(testService, 'retornaListaDeDados').and.returnValue(ObservableReturn);

    // Chama o metodo que vai executar a ação.
    component.buscaListaDeDados();

    //Verifica as alterações.
    fixture.detectChanges();

    //Pega o texto que está na div.
    const div = fixture.debugElement.nativeElement.getElementsByTagName('div')[1]?.innerText;

    // Faz as verificações.
    expect(component.listaDeDados).toEqual(dataResponse);
    expect(component.showError).toBeFalse();
    expect(div).toEqual(undefined);
  });

  it('Não deve popular listaDeDados se API retornar um erro ', () => {

    //Observable que vai ser retornado pelo metodo retornaListaDeDados.
    const ObservableReturn = new Observable<Dados[]>(observable => {
      observable.error(new Error("Erro"));
    });

    // SpyOn serve para mockar o retorno de um método.
    spyOn(testService, 'retornaListaDeDados').and.returnValue(ObservableReturn);

    // Chama o metodo que vai executar a ação.
    component.buscaListaDeDados();

    //Verifica as alterações.
    fixture.detectChanges();

    //Pega o texto que está na div.
    const div = fixture.debugElement.nativeElement.getElementsByTagName('div')[1]?.innerText;


    // Faz as verificações.
    expect(component.listaDeDados).toEqual(undefined);
    expect(component.showError).toBeTrue();
    expect(div).toEqual('Erro ao carregar Lista!!');
  });

  it('Deve mudar o valor da variável show para false', () => {
    // Definir um valor inicial.
    component.show = true;

    //Verifica as alterações.
    fixture.detectChanges();

    // Chama o metodo que vai executar a ação.
    component.showList();

    // Faz as verificações.
    expect(component.show).toBeFalse();
  });

  it('Deve mudar o valor da variável show para true', () => {
    // Definir um valor inicial.
    component.show = false;

    //Verifica as alterações.
    fixture.detectChanges();

    // Chama o metodo que vai executar a ação.
    component.showList();

    // Faz as verificações.
    expect(component.show).toBeTrue();
  });

  it('Metodo buttonText deve retornar o texto OCULTAR LISTA', () => {
    // Definir um valor inicial.
    component.show = true;

    //Verifica as alterações.
    fixture.detectChanges();

    //Salva o retorno do metodo na variável response.
    const response = component.buttonText();

    // Verifica se o valor da variável é OCULTAR LISTA.
    expect(response).toEqual('OCULTAR LISTA');
  });

  it('Metodo buttonText deve retornar o texto EXIBIR LISTA', () => {
    // Definir um valor inicial.
    component.show = false;

    //Verifica as alterações.
    fixture.detectChanges();

    //Salva o retorno do metodo na variável response
    const response = component.buttonText();

    // Verifica se o valor da variável é EXIBIR LISTA.
    expect(response).toEqual('EXIBIR LISTA');
  });

  it('Deve chamar o metodo showList se clicar no botão EXIBIR LISTA', () => {
    // Definir um valor inicial.
    component.show = false;

    // SpyOn também serve para ficar verificar se o metodo foi chamado.
    spyOn(component, 'showList');

    // Pega o botão pela tag button e simula click.
    fixture.debugElement.nativeElement.getElementsByTagName('button')[0].click();

    //Verifica se o metodo foi chamado ao clicar no botão.
    expect(component.showList).toHaveBeenCalled();
  });
});
