
//NAVBAR NAVIGATION
// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    
    // Configurar la navegación para cada botón
    document.getElementById('navHome').addEventListener('click', function() {
        window.location.href = 'mapa_capitulos.html';
    });
    
    document.getElementById('navPerfil').addEventListener('click', function() {
        window.location.href = 'perfil.html';
    });
    
    document.getElementById('navRanking').addEventListener('click', function() {
        window.location.href = 'ranking.html';
    });
    
    document.getElementById('navRepasos').addEventListener('click', function() {
        window.location.href = 'repas_temes.html';
    });
    
    document.getElementById('navConfig').addEventListener('click', function() {
        window.location.href = 'configuracio.html';
    });
    
});