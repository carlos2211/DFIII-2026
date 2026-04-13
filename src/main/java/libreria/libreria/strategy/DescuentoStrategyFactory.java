package libreria.libreria.strategy;

/**
 * Fábrica que selecciona la estrategia de descuento correcta según el género del libro.
 */
public class DescuentoStrategyFactory {

    public static DescuentoStrategy obtenerEstrategia(String genero) {
        if (genero == null) return new SinDescuentoStrategy();
        return switch (genero.toLowerCase()) {
            case "novela"         -> new DescuentoNovelaStrategy();
            case "texto escolar"  -> new DescuentoTextoEscolarStrategy();
            case "infantil"       -> new DescuentoInfantilStrategy();
            default               -> new SinDescuentoStrategy();
        };
    }
}
