package libreria.libreria.strategy;

/**
 * Estrategia de descuento para libros Infantiles: 10% de descuento.
 */
public class DescuentoInfantilStrategy implements DescuentoStrategy {

    private static final double DESCUENTO = 0.10;

    @Override
    public double aplicarDescuento(double precioOriginal) {
        return precioOriginal * (1 - DESCUENTO);
    }

    @Override
    public String getNombreDescuento() {
        return "Descuento Infantil (10%)";
    }
}
