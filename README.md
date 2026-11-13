# Suite Matematica y Algoritmica (Proyecto Integrador)

Evaluacion practica de logica computacional, algebra y precision numerica.
Proyecto integrador para trabajo en casa con control de versiones en GitHub y despliegue en GitHub Pages.

## 1. Modulos del Proyecto
- Modulo A: Retos Logicos BairesDev (probabilidad de dados, torneos, divisores O(1), logistica).
- Modulo B: Motor Cuadratico & Graficador Canvas (ax^2 + bx + c = 0, raices, vertice y grafica).
- Modulo C: Detector de Secuencias (patrones aritmeticos, geometricos y de segundo orden).
- Modulo D: Suite de Autoevaluacion (10 pruebas unitarias en el navegador).

## 2. Estructura de Archivos
- index.html: Interfaz con pestañas.
- css/style.css: Estilos responsivos.
- js/app.js: Coordinador principal de eventos y canvas.
- js/modules/bairesdev.js: Retos logicos.
- js/modules/cuadratica.js: Solucionador cuadratico estable.
- js/modules/secuencias.js: Detector de secuencias.
- js/modules/test-suite.js: Suite de 10 pruebas unitarias.

## 3. Ejecucion Local
Ejecutar un servidor local HTTP:
```bash
python3 -m http.server 8000
```
Abrir http://localhost:8000 en el navegador.

## 4. Desafios de Precision Numerica (Cascaritas)
1. Cancelacion Catastrofica: Usar formula de Citardauq / Muller cuando b^2 >> 4ac.
2. Caso Degenerado: Manejar a = 0 como ecuacion lineal sin dividir entre cero.
3. Precision Flotante IEEE-754: Usar tolerancia Number.EPSILON para comparar porcentajes.

## 5. Requisitos de Git y GitHub
- Minimo 10 commits significativos con Conventional Commits (feat, fix, style, test, docs).
- Trabajo con ramas y Pull Requests.
- Despliegue activo en GitHub Pages.

## 6. Rubrica (100 Puntos)
- Logica y Matematicas: 25 pts
- Superacion de Casos Borde: 25 pts
- Gestion de Git y Commits: 20 pts
- Despliegue y UX/UI: 15 pts
- Sustentacion Presencial: 15 pts
