# Suite Matemática y Algorítmica (Proyecto Integrador)

[![pages-build-deployment](https://github.com/Pabloquiroga255/suite-logica/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/Pabloquiroga255/suite-logica/actions/workflows/pages/pages-build-deployment)

🌐 **Demo en vivo:** https://pabloquiroga255.github.io/suite-logica/

Aplicación web interactiva que reúne retos de lógica (BairesDev), un solucionador de ecuaciones cuadráticas con gráfica, un detector de secuencias y una suite de pruebas unitarias en el navegador.

**Estudiante:** Pablo Quiroga — SENA, Análisis y Desarrollo de Software (ADSO)

## 1. Módulos

| Módulo | Descripción |
|---|---|
| A: Simulador BairesDev | 10 retos: dados, torneo, múltiplos, viajes, conteo de dígitos, edades, recipiente, ingresos, cuotas y porcentaje inverso. |
| B: Motor Cuadrático | Resuelve `ax² + bx + c = 0` (raíces reales, doble o complejas), calcula discriminante y vértice, y grafica la parábola en Canvas. |
| C: Detector de Secuencias | Reconoce progresiones aritméticas, geométricas, de segundo orden y duales, y predice el siguiente término. |
| D: Suite de Pruebas | Ejecuta 10 pruebas automáticas (incluye las 3 cascaritas) y muestra badges Pass / Fail. |

## 2. Arquitectura

Proyecto sin frameworks: HTML5 semántico, CSS3 y JavaScript vanilla (ES6+) con módulos `import` / `export`. Cada archivo JS tiene una sola responsabilidad.

```
suite-logica/
├── index.html                 # Interfaz con pestañas (4 módulos)
├── css/
│   └── style.css              # Estilos responsivos
└── js/
    ├── app.js                 # Coordinador: eventos de botones, lectura de inputs y Canvas
    └── modules/
        ├── bairesdev.js       # Módulo A: retos lógicos + validaciones
        ├── cuadratica.js      # Módulo B: solucionador cuadrático estable
        ├── secuencias.js      # Módulo C: detector de secuencias
        └── test-suite.js      # Módulo D: 10 pruebas unitarias
```

**Flujo:** el usuario escribe datos → `app.js` los lee y llama a la función del módulo → el módulo valida y calcula → `app.js` muestra el resultado o el error en rojo.

## 3. Ejecución local

Los módulos ES6 no funcionan abriendo el archivo con doble clic (`file://`), se necesita un servidor local:

```bash
git clone https://github.com/Pabloquiroga255/suite-logica.git
cd suite-logica
python -m http.server 8000
```

Abrir http://localhost:8000 en el navegador.

## 4. Casos borde (Cascaritas)

1. **Cancelación catastrófica:** cuando `b² ≫ 4ac` se usa la fórmula de Citardauq: `q = -½(b + sgn(b)·√Δ)`, `x₁ = q/a`, `x₂ = c/q`.
2. **Ecuación degenerada:** si `a = 0` se resuelve como lineal (`x = -c/b`); si además `b = 0` se reporta "sin solución" o "infinitas soluciones" sin dividir entre cero.
3. **Precisión IEEE-754:** los porcentajes se comparan con tolerancia `Number.EPSILON` y el dinero se calcula en centavos enteros.

## 5. Flujo de trabajo con Git

- `main`: solo código estable desplegado en GitHub Pages.
- `develop`: integración de cambios.
- `feature/*`: una rama por funcionalidad, unida a `develop` mediante Pull Request.
- Commits con Conventional Commits: `feat:`, `fix:`, `style:`, `test:`, `docs:`.

## 6. Análisis de complejidad

`n` = cantidad de términos de la secuencia, `N` = límite superior, `d` = cantidad de dígitos de `N`.

| Algoritmo | Archivo | Tiempo | Espacio | Por qué |
|---|---|---|---|---|
| Probabilidad de dados | bairesdev.js | O(1) | O(1) | Recorre siempre las 36 combinaciones (6 × 6), no depende de la entrada. |
| Partidos del torneo | bairesdev.js | O(1) | O(1) | Fórmula directa `n(n-1)/2`. |
| Múltiplos menores | bairesdev.js | O(1) | O(1) | División entera `⌊(límite-1)/divisor⌋`, sin bucle. |
| Viajes mínimos | bairesdev.js | O(1) | O(1) | Función techo `⌈total/capacidad⌉`. |
| Conteo de dígitos | bairesdev.js | O(N · d) | O(d) | Recorre los N números y revisa cada dígito de su texto. |
| Edades | bairesdev.js | O(1) | O(1) | Despeje algebraico `t = edad - 2·hermana`. |
| Peso del recipiente | bairesdev.js | O(1) | O(1) | Sistema de 2 ecuaciones resuelto con una fórmula. |
| Diferencia de ingresos | bairesdev.js | O(1) | O(1) | Dos multiplicaciones en centavos. |
| Cuotas vs contado | bairesdev.js | O(1) | O(1) | Una multiplicación y una resta en centavos. |
| Porcentaje inverso | bairesdev.js | O(1) | O(1) | Una división y una comparación con `Number.EPSILON`. |
| Ecuación cuadrática | cuadratica.js | O(1) | O(1) | Número fijo de operaciones (discriminante, raíz, Citardauq). |
| Gráfica de la parábola | app.js | O(S) | O(1) | Evalúa S = 120 puntos del Canvas. |
| Detector de secuencias | secuencias.js | O(n) | O(n) | Calcula una vez las diferencias Δ₁ y Δ₂ y las guarda en arreglos. |
| Secuencia dual | secuencias.js | O(n) | O(n) | Separa los pasos en pares e impares y revisa cada grupo una vez. |
| Suite de pruebas | test-suite.js | O(T) | O(T) | Ejecuta T = 10 pruebas y guarda un resultado por prueba. |
