package com.libreria.pedidos.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "PEDIDO", schema = "ADMIN")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "ID_USUARIO", nullable = false)
    private Long idUsuario;

    @Column(name = "ID_PRODUCTO", nullable = false)
    private Long idProducto;

    @Column(name = "NOMBRE_PRODUCTO")
    private String nombreProducto;

    @Column(name = "CANTIDAD", nullable = false)
    private Integer cantidad;

    @Column(name = "PRECIO_UNITARIO", nullable = false)
    private Double precioUnitario;

    @Column(name = "TOTAL")
    private Double total;

    @Column(name = "ESTADO")
    private String estado; // PENDIENTE, CONFIRMADO, ENVIADO, ENTREGADO, CANCELADO

    @Column(name = "FECHA_PEDIDO")
    private LocalDateTime fechaPedido;

    @Column(name = "DIRECCION_ENVIO")
    private String direccionEnvio;

    // ── Constructor vacío ──────────────────────────────────────────────
    public Pedido() {}

    // ── Getters y Setters ──────────────────────────────────────────────
    public Long getId()                        { return id; }
    public void setId(Long id)                 { this.id = id; }

    public Long getIdUsuario()                 { return idUsuario; }
    public void setIdUsuario(Long idUsuario)   { this.idUsuario = idUsuario; }

    public Long getIdProducto()                { return idProducto; }
    public void setIdProducto(Long idProducto) { this.idProducto = idProducto; }

    public String getNombreProducto()                      { return nombreProducto; }
    public void setNombreProducto(String nombreProducto)   { this.nombreProducto = nombreProducto; }

    public Integer getCantidad()               { return cantidad; }
    public void setCantidad(Integer cantidad)   { this.cantidad = cantidad; }

    public Double getPrecioUnitario()                      { return precioUnitario; }
    public void setPrecioUnitario(Double precioUnitario)   { this.precioUnitario = precioUnitario; }

    public Double getTotal()                   { return total; }
    public void setTotal(Double total)         { this.total = total; }

    public String getEstado()                  { return estado; }
    public void setEstado(String estado)       { this.estado = estado; }

    public LocalDateTime getFechaPedido()                  { return fechaPedido; }
    public void setFechaPedido(LocalDateTime fechaPedido)  { this.fechaPedido = fechaPedido; }

    public String getDireccionEnvio()                      { return direccionEnvio; }
    public void setDireccionEnvio(String direccionEnvio)   { this.direccionEnvio = direccionEnvio; }
}
