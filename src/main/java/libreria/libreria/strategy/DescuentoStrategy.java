package libreria.libreria.strategy;

/**
 * Patrón Strategy - Interfaz para estrategias de descuento.
 * Permite cambiar dinámicamente la lógica de descuento según el género del libro.
 */
public interface DescuentoStrategy {
    /**
     * Aplica el descuento al precio original.
     * @param precioOriginal precio base del libro
     * @return precio final con descuento aplicado
     */
    double aplicarDescuento(double precioOriginal);

    /**
     * Retorna el nombre descriptivo de la estrategia.
     */
    String getNombreDescuento();
}
