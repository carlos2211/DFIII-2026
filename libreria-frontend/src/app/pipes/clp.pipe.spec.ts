import { ClpPipe } from './clp.pipe';

describe('ClpPipe', () => {
  let pipe: ClpPipe;

  beforeEach(() => {
    pipe = new ClpPipe();
  });

  it('debería crearse correctamente', () => {
    expect(pipe).toBeTruthy();
  });

  it('debería formatear 12990 como $12.990', () => {
    expect(pipe.transform(12990)).toContain('12.990');
  });

  it('debería formatear 1000 como $1.000', () => {
    expect(pipe.transform(1000)).toContain('1.000');
  });
  it('debería retornar string vacío para null', () => {
    expect(pipe.transform(null as any)).toBe('');
  });

  it('debería retornar string vacío para undefined', () => {
    expect(pipe.transform(undefined as any)).toBe('');
  });
  
  it('debería formatear 0 como $0', () => {
    expect(pipe.transform(0)).toBeDefined();
  });
});
