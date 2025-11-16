package com.soundup.soundup.service;

import com.soundup.soundup.dto.ContagemPorPaisDTO;
import com.soundup.soundup.model.Artista;
import com.soundup.soundup.model.Usuario;
import com.soundup.soundup.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository UsuarioRepository;

    public UsuarioService(UsuarioRepository UsuarioRepository) {
        this.UsuarioRepository = UsuarioRepository;
    }

    public List<Usuario> getAllUsuarios() {
        return UsuarioRepository.findAll();
    }

    public Usuario getUsuarioById(int id) {
        return UsuarioRepository.findById(id);
    }

    public Usuario save(Usuario usuario) {
        // salva e já retorna o objeto com ID preenchido
        return UsuarioRepository.save(usuario);
    }

    public void updateUsuario(Usuario usuario) {
        UsuarioRepository.update(usuario);
    }

    public void deleteUsuario(int id) {
        UsuarioRepository.delete(id);
    }

    public List<ContagemPorPaisDTO> getContagemUsuariosPorPais() {
        return UsuarioRepository.getContagemUsuariosPorPais();
    }
}
