package usuarios.usuarios.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usuarios.usuarios.model.Usuario;
import usuarios.usuarios.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    public List<Usuario> obtenerTodos() {
        return repository.findAll();
    }

    public Usuario crearUsuario(Usuario usuario) {
        return repository.save(usuario);
    }

    public Optional<Usuario> login(String correo, String password) {
        Optional<Usuario> usuario = repository.findByCorreo(correo);

        if (usuario.isPresent() && usuario.get().getPassword().equals(password)) {
            return usuario;
        }

        return Optional.empty();
    }

    public Optional<Usuario> obtenerUsuario(Long id) {
        return repository.findById(id);
    }

    public Usuario actualizarUsuario(Long id, Usuario usuario) {
        usuario.setId(id);
        return repository.save(usuario);
    }

    public void eliminarUsuario(Long id) {
        repository.deleteById(id);
    }
}