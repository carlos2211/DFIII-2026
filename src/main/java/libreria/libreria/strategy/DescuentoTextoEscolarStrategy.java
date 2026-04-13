package libreria.libreria.strategy;

/**
 * Estrategia de descuento para libros de Texto Escolar: 20% de descuento.
 */
public class DescuentoTextoEscolarStrategy implements DescuentoStrategy {

    private static final double DESCUENTO = 0.20;

    @Override
    public double aplicarDescuento(double precioOriginal) {
        return precioOriginal * (1 - DESCUENTO);
    }

    @Override
    public String getNombreDescuento() {
        return "Descuento Texto Escolar (20%)";
    }
}
