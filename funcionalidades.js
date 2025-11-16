
//NAVBAR NAVIGATION
// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {

    // NAVEGACION DE LA BARRA DE NAVEGACION
    document.getElementById('navHome').addEventListener('click', function () {
        window.location.href = 'mapa_capitulos.html';
    });

    document.getElementById('navPerfil').addEventListener('click', function () {
        window.location.href = 'perfil.html';
    });

    document.getElementById('navRanking').addEventListener('click', function () {
        window.location.href = 'ranking.html';
    });

    document.getElementById('navRepasos').addEventListener('click', function () {
        window.location.href = 'repas_temes.html';
    });

    document.getElementById('navConfig').addEventListener('click', function () {
        window.location.href = 'configuracio.html';
    });

    //PASAR DE LA PAGINA DE CAPITULOS A NIVELES
    if (document.getElementById('ch1')) {
        document.getElementById('ch1').addEventListener('click', function () {
            window.location.href = 'mapa_niveles.html';
        });
        document.getElementById('ch2').addEventListener('click', function () {
            window.location.href = 'mapa_niveles.html';
        });
        document.getElementById('ch3').addEventListener('click', function () {
            window.location.href = 'mapa_niveles.html';
        });
        document.getElementById('ch4').addEventListener('click', function () {
            window.location.href = 'mapa_niveles.html';
        });
        document.getElementById('ch5').addEventListener('click', function () {
            window.location.href = 'mapa_niveles.html';
        });
    }



    if (document.getElementById('p1')) {
        document.getElementById('p1').addEventListener('click', function () {
            window.location.href = '/pages/capitulos/capitulo1/pregunta1.html';
        });
        document.getElementById('p2').addEventListener('click', function () {
            window.location.href = '/pages/capitulos/capitulo1/pregunta2.html';
        });
        document.getElementById('p3').addEventListener('click', function () {
            window.location.href = '/pages/capitulos/capitulo1/pregunta3.html';
        });
        document.getElementById('p4').addEventListener('click', function () {
            window.location.href = '/pages/capitulos/capitulo1/pregunta4.html';
        });
        document.getElementById('p5').addEventListener('click', function () {
            window.location.href = '/pages/capitulos/capitulo1/pregunta5.html';
        });
        document.getElementById('p6').addEventListener('click', function () {
            window.location.href = '/pages/capitulos/capitulo1/pregunta6.html';
        });
        document.getElementById('p7').addEventListener('click', function () {
            window.location.href = '/pages/capitulos/capitulo1/pregunta7.html';
        });
        document.getElementById('p8').addEventListener('click', function () {
            window.location.href = '/pages/capitulos/capitulo1/pregunta8.html';
        });
        document.getElementById('p9').addEventListener('click', function () {
            window.location.href = '/pages/capitulos/capitulo1/pregunta9.html';
        });
        document.getElementById('p10').addEventListener('click', function () {
            window.location.href = '/pages/capitulos/capitulo1/pregunta10.html';
        });
    }




});

