/**
 * Modulo B: Motor de Ecuaciones Cuadraticas y Precision Numerica
 * Resuelve ax^2 + bx + c = 0
 */

/**
 * Resuelve la ecuacion cuadratica ax^2 + bx + c = 0
 * @param {number} a - Coeficiente cuadratico
 * @param {number} b - Coeficiente lineal
 * @param {number} c - Termino independiente
 * @returns {object} Resultado con clasificacion, discriminante, vertice y raices
 */
export function resolverCuadratica(a, b, c) {
  // -------------------------------------------------------------
  // CASO DEGENERADO: a === 0 (CASCARITA / DESAFIO 2)
  // -------------------------------------------------------------
  if (Math.abs(a) < 1e-15) {
    if (Math.abs(b) < 1e-15) {
      if (Math.abs(c) < 1e-15) {
        return {
          tipo: "INFINITAS_SOLUCIONES",
          descripcion: "Identidad trivial (0 = 0): infinitas soluciones",
          raices: []
        };
      }
      return {
        tipo: "SIN_SOLUCION",
        descripcion: "Contradiccion incompatible (c != 0 con a=0, b=0)",
        raices: []
      };
    }
    // Ecuacion lineal: bx + c = 0 => x = -c / b
    const xLineal = -c / b;
    return {
      tipo: "LINEAL_DEGENERADA",
      descripcion: "Ecuacion lineal degenerada (a = 0)",
      raices: [xLineal],
      vertice: null,
      discriminante: null
    };
  }

  // Discriminante: Delta = b^2 - 4ac
  const delta = b * b - 4 * a * c;

  // Coordenadas del vertice (h, k)
  const h = -b / (2 * a);
  const k = a * h * h + b * h + c;

  // -------------------------------------------------------------
  // CASO 1: Raices complejas conjugadas (Delta < 0)
  // -------------------------------------------------------------
  if (delta < -1e-14) {
    const parteReal = -b / (2 * a);
    const parteImag = Math.sqrt(-delta) / (2 * a);
    return {
      tipo: "COMPLEJAS_CONJUGADAS",
      descripcion: "Dos raices complejas conjugadas",
      discriminante: delta,
      vertice: { h, k },
      raices: [
        { real: parteReal, imag: Math.abs(parteImag), texto: `${parteReal.toFixed(4)} + ${Math.abs(parteImag).toFixed(4)}i` },
        { real: parteReal, imag: -Math.abs(parteImag), texto: `${parteReal.toFixed(4)} - ${Math.abs(parteImag).toFixed(4)}i` }
      ]
    };
  }

  // -------------------------------------------------------------
  // CASO 2: Raiz doble real (Delta === 0)
  // -------------------------------------------------------------
  if (Math.abs(delta) <= 1e-14) {
    const xDoble = -b / (2 * a);
    return {
      tipo: "RAIZ_DOBLE",
      descripcion: "Una raiz real doble",
      discriminante: 0,
      vertice: { h, k },
      raices: [xDoble, xDoble]
    };
  }

  // -------------------------------------------------------------
  // CASO 3: Dos raices reales distintas (Delta > 0)
  // -------------------------------------------------------------
  // ATENCION ESTUDIANTE: AQUI APLICA LA CASCARITA NUMERICA (IEEE-754)
  // La formula escolar naive:
  //   x1 = (-b + sqrt(delta)) / (2*a)
  //   x2 = (-b - sqrt(delta)) / (2*a)
  // Falla por cancelacion catastrofica cuando b^2 >> 4*a*c (ej: a=1, b=1e8, c=1).
  //
  // Algoritmo numericamente estable (Citardauq / Muller):
  //   sgn = b >= 0 ? 1 : -1
  //   q = -0.5 * (b + sgn * Math.sqrt(delta))
  //   x1 = q / a
  //   x2 = c / q
  // -------------------------------------------------------------
  const sgn = b >= 0 ? 1 : -1;
  const sqrtDelta = Math.sqrt(delta);
  const q = -0.5 * (b + sgn * sqrtDelta);

  const x1 = q / a;
  const x2 = c / q;

  return {
    tipo: "REALES_DISTINTAS",
    descripcion: "Dos raices reales distintas",
    discriminante: delta,
    vertice: { h, k },
    raices: [Math.max(x1, x2), Math.min(x1, x2)]
  };
}

/**
 * Evalua el polinomio cuadratico f(x) = ax^2 + bx + c
 */
export function evaluarPolinomio(a, b, c, x) {
  return a * x * x + b * x + c;
}
