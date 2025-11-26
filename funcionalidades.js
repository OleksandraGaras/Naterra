//NAVBAR NAVIGATION
document.addEventListener('DOMContentLoaded', function () {

    // NAVEGACION DE LA BARRA DE NAVEGACION
    if (document.getElementById('navHome')) {
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
    }

    // FUNCIONES PARA GESTIONAR ESTADO DE PREGUNTAS
    function guardarEstadoPregunta(numeroPregunta, estado) {
        const estadoPreguntas = JSON.parse(localStorage.getItem('estadoPreguntas')) || {};
        estadoPreguntas[numeroPregunta] = estado;
        localStorage.setItem('estadoPreguntas', JSON.stringify(estadoPreguntas));
    }

    function obtenerEstadoPregunta(numeroPregunta) {
        const estadoPreguntas = JSON.parse(localStorage.getItem('estadoPreguntas')) || {};
        return estadoPreguntas[numeroPregunta] || 'no-completada';
    }

    function validarCapitulo(capitulo) {
        let correctas = 0;
        let incorrectas = 0;
        
        const inicio = (capitulo - 1) * 10 + 1;
        const fin = capitulo * 10;
        
        for (let i = inicio; i <= fin; i++) {
            const estado = obtenerEstadoPregunta(i);
            if (estado === 'correcta') {
                correctas++;
            } else if (estado === 'incorrecta') {
                incorrectas++;
            }
        }
        
        return { correctas, incorrectas };
    }

    function guardarResultadoCapitulo(capitulo, correctas, incorrectas) {
        const resultados = JSON.parse(localStorage.getItem('resultadosCapitulos')) || {};
        resultados[`capitulo${capitulo}`] = {
            correctas: correctas,
            incorrectas: incorrectas,
            fecha: new Date().toISOString()
        };
        localStorage.setItem('resultadosCapitulos', JSON.stringify(resultados));
    }

    function actualizarCirculosEnMapa() {
        const capitulo = localStorage.getItem('capituloActual') || '1';
        
        for (let i = 1; i <= 10; i++) {
            const circulo = document.getElementById(`p${i}`);
            if (circulo) {
                const preguntaGlobal = (parseInt(capitulo) - 1) * 10 + i;
                const estado = obtenerEstadoPregunta(preguntaGlobal);
                circulo.className = `chapter ${estado}`;
            }
        }
    }

    // NAVEGACIÓN A CAPÍTULOS (desde mapa_capitulos.html)
    if (document.getElementById('ch1')) {
        document.getElementById('ch1').addEventListener('click', function () {
            localStorage.setItem('capituloActual', '1');
            window.location.href = 'mapa_niveles.html';
        });

        document.getElementById('ch2').addEventListener('click', function () {
            localStorage.setItem('capituloActual', '2');
            window.location.href = 'mapa_niveles.html';
        });

        document.getElementById('ch3').addEventListener('click', function () {
            localStorage.setItem('capituloActual', '3');
            window.location.href = 'mapa_niveles.html';
        });

        document.getElementById('ch4').addEventListener('click', function () {
            localStorage.setItem('capituloActual', '4');
            window.location.href = 'mapa_niveles.html';
        });

        document.getElementById('ch5').addEventListener('click', function () {
            localStorage.setItem('capituloActual', '5');
            window.location.href = 'mapa_niveles.html';
        });
    }

    // CONFIGURACIÓN PARA mapa_niveles.html
    if (window.location.href.includes('mapa_niveles.html')) {
        actualizarCirculosEnMapa();
        
        // Configurar eventos para los círculos de preguntas
        for (let i = 1; i <= 10; i++) {
            const circulo = document.getElementById(`p${i}`);
            if (circulo) {
                circulo.addEventListener('click', function () {
                    const capitulo = localStorage.getItem('capituloActual') || '1';
                    const preguntaGlobal = (parseInt(capitulo) - 1) * 10 + i;
                    window.location.href = `/pages/capitulos/capitulo${capitulo}/pregunta${preguntaGlobal}.html`;
                });
            }
        }
    }

    // CONFIGURACIÓN PARA PÁGINAS DE PREGUNTAS
    if (window.location.href.includes('pregunta')) {
        const nombreArchivo = window.location.pathname.split('/').pop() || window.location.href.split('/').pop();
        const numeroPregunta = parseInt(nombreArchivo.replace('pregunta', '').replace('.html', ''));
        const capituloActual = Math.ceil(numeroPregunta / 10);
        const esUltimaPregunta = numeroPregunta % 10 === 0;
        
        // Configurar botones de respuesta
        const botonesRespuesta = document.querySelectorAll('.btn-respuesta');
        if (botonesRespuesta.length > 0) {
            botonesRespuesta.forEach(boton => {
                boton.addEventListener('click', function() {
                    const esCorrecta = this.getAttribute('data-correcta') === 'true';
                    
                    if (esCorrecta) {
                        guardarEstadoPregunta(numeroPregunta, 'correcta');
                        this.classList.add('correcta');
                    } else {
                        guardarEstadoPregunta(numeroPregunta, 'incorrecta');
                        this.classList.add('incorrecta');
                    }
                    
                    // Deshabilitar todos los botones después de responder
                    botonesRespuesta.forEach(btn => {
                        btn.disabled = true;
                    });
                    
                    // Mostrar botón de siguiente pregunta o validar
                    setTimeout(() => {
                        if (esUltimaPregunta) {
                            // Última pregunta del capítulo - mostrar botón de validar
                            const validarBtn = document.getElementById('validar-capitulo');
                            if (validarBtn) validarBtn.style.display = 'block';
                        } else {
                            // Pregunta normal - mostrar botón siguiente
                            const siguienteBtn = document.getElementById('siguiente-pregunta');
                            if (siguienteBtn) siguienteBtn.style.display = 'block';
                        }
                    }, 1000);
                });
            });
        }
        
        // Botón siguiente pregunta (solo para preguntas que NO son la última del capítulo)
        const siguienteBtn = document.getElementById('siguiente-pregunta');
        if (siguienteBtn && !esUltimaPregunta) {
            siguienteBtn.addEventListener('click', function() {
                const siguienteNumero = numeroPregunta + 1;
                if (siguienteNumero <= 50) {
                    const siguienteCapitulo = Math.ceil(siguienteNumero / 10);
                    window.location.href = `/pages/capitulos/capitulo${siguienteCapitulo}/pregunta${siguienteNumero}.html`;
                } else {
                    window.location.href = 'mapa_capitulos.html';
                }
            });
        }
        
        // Botón validar capítulo (solo para última pregunta del capítulo: 10, 20, 30, 40, 50)
        const validarBtn = document.getElementById('validar-capitulo');
        if (validarBtn && esUltimaPregunta) {
            validarBtn.addEventListener('click', function() {
                const resultado = validarCapitulo(capituloActual);
                guardarResultadoCapitulo(capituloActual, resultado.correctas, resultado.incorrectas);
                // CORRECCIÓN: Navegar directamente al archivo en el mismo nivel
                window.location.href = '../resultado_capitulo.html?capitulo=' + capituloActual;
            });
        }

        // Botón volver al mapa
        const volverBtn = document.getElementById('volver-mapa');
        if (volverBtn) {
            volverBtn.addEventListener('click', function() {
                window.location.href = '../mapa_niveles.html';
            });
        }
    }

    // CONFIGURACIÓN PARA resultado_capitulo.html
    if (window.location.href.includes('resultado_capitulo.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const capitulo = parseInt(urlParams.get('capitulo')) || 1;
        
        // Obtener resultados del localStorage
        const resultados = JSON.parse(localStorage.getItem('resultadosCapitulos')) || {};
        const resultadoCapitulo = resultados[`capitulo${capitulo}`] || { correctas: 0, incorrectas: 0 };
        
        const correctas = resultadoCapitulo.correctas;
        const incorrectas = resultadoCapitulo.incorrectas;
        
        // Actualizar la interfaz
        if (document.getElementById('capitulo-numero')) {
            document.getElementById('capitulo-numero').textContent = capitulo;
        }
        if (document.getElementById('correctas-count')) {
            document.getElementById('correctas-count').textContent = correctas;
        }
        if (document.getElementById('incorrectas-count')) {
            document.getElementById('incorrectas-count').textContent = incorrectas;
        }
        
        // Mensaje según el resultado
        if (document.getElementById('mensaje-resultado')) {
            const mensajeElement = document.getElementById('mensaje-resultado');
            if (correctas === 10) {
                mensajeElement.innerHTML = '<h3 style="color: #28a745;">🎉 Perfecte! Has encertat totes les preguntes!</h3>';
            } else if (correctas >= 7) {
                mensajeElement.innerHTML = '<h3 style="color: #17a2b8;">👍 Molt bé! Bon treball!</h3>';
            } else if (correctas >= 5) {
                mensajeElement.innerHTML = '<h3 style="color: #ffc107;">💪 No està malament! Pots millorar!</h3>';
            } else {
                mensajeElement.innerHTML = '<h3 style="color: #dc3545;">📚 No et rendeixis! Torna a intentar-ho!</h3>';
            }
        }
        
        // Botón continuar al siguiente capítulo
        if (document.getElementById('btn-continuar')) {
            document.getElementById('btn-continuar').addEventListener('click', function() {
                if (capitulo < 5) {
                    localStorage.setItem('capituloActual', (capitulo + 1).toString());
                    window.location.href = 'mapa_niveles.html';
                } else {
                    window.location.href = 'mapa_capitulos.html';
                }
            });
        }
        
        // Botón repetir capítulo
        if (document.getElementById('btn-repetir')) {
            document.getElementById('btn-repetir').addEventListener('click', function() {
                // Resetear las preguntas de este capítulo
                const inicio = (capitulo - 1) * 10 + 1;
                const fin = capitulo * 10;
                const estadoPreguntas = JSON.parse(localStorage.getItem('estadoPreguntas')) || {};
                
                for (let i = inicio; i <= fin; i++) {
                    estadoPreguntas[i] = 'no-completada';
                }
                
                localStorage.setItem('estadoPreguntas', JSON.stringify(estadoPreguntas));
                localStorage.setItem('capituloActual', capitulo.toString());
                window.location.href = 'mapa_niveles.html';
            });
        }
        
        // Botón volver al mapa
        if (document.getElementById('btn-mapa')) {
            document.getElementById('btn-mapa').addEventListener('click', function() {
                window.location.href = 'mapa_capitulos.html';
            });
        }
    }

    // INICIALIZAR ESTADO SI NO EXISTE
    function inicializarEstadoPreguntas() {
        if (!localStorage.getItem('estadoPreguntas')) {
            const estadoInicial = {};
            for (let i = 1; i <= 50; i++) {
                estadoInicial[i] = 'no-completada';
            }
            localStorage.setItem('estadoPreguntas', JSON.stringify(estadoInicial));
        }
    }

    // Inicializar al cargar cualquier página
    inicializarEstadoPreguntas();
});