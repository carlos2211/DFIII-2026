import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CarritoComponent } from './carrito.component';
import { ClpPipe } from '../../pipes/clp.pipe';

describe('CarritoComponent', () => {
  let component: CarritoComponent;
  let fixture: ComponentFixture<CarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarritoComponent, ClpPipe],
      imports: [HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();
    fixture = TestBed.createComponent(CarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('carrito debería estar vacío al inicio', () => {
    expect(component.items.length).toBe(0);
  });

  it('getTotal() debería retornar 0 con carrito vacío', () => {
    expect(component.getTotal()).toBe(0);
  });

  it('pedidoConfirmado debería ser false al inicio', () => {
    expect(component.pedidoConfirmado).toBeFalse();
  });

  it('confirmarPedido() debería generar número de pedido', () => {
    component.confirmarPedido();
    expect(component.numeroPedido).toContain('PED-');
    expect(component.pedidoConfirmado).toBeTrue();
  });
});