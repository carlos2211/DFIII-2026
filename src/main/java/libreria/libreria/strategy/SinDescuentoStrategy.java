package libreria.libreria.strategy;

/**
 * Estrategia sin descuento: retorna el precio original sin modificación.
 * Es el comportamiento por defecto para géneros no especificados.
 */
public class SinDescuentoStrategy implements DescuentoStrategy {

    @Override
    public double aplicarDescuento(double precioOriginal) {
        return precioOriginal;
    }

    @Override
    public String getNombreDescuento() {
        return "Sin Descuento (0%)";
    }
}
