package libreria.libreria.strategy;

/**
 * Estrategia de descuento para libros de género Novela: 15% de descuento.
 */
public class DescuentoNovelaStrategy implements DescuentoStrategy {

    private static final double DESCUENTO = 0.15;

    @Override
    public double aplicarDescuento(double precioOriginal) {
        return precioOriginal * (1 - DESCUENTO);
    }

    @Override
    public String getNombreDescuento() {
        return "Descuento Novela (15%)";
    }
}
