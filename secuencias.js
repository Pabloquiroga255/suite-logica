/**
 * Modulo C: Detector y Analizador de Secuencias Numericas
 */

/**
 * Analiza un arreglo numerico y predice el siguiente termino
 * @param {number[]} arr - Lista de al menos 3 numeros
 * @returns {object} Informacion del patron y siguiente valor
 */
export function analizarSecuencia(arr) {
  if (!Array.isArray(arr) || arr.length < 3) {
    throw new Error("Se requieren al menos 3 terminos para detectar un patron.");
  }

  const n = arr.length;

  // 1. Verificar Progresion Geometrica: ratio constante (r = arr[i+1] / arr[i])
  let esGeometrica = true;
  const r0 = arr[0] !== 0 ? arr[1] / arr[0] : null;

  if (r0 !== null && Number.isFinite(r0)) {
    for (let i = 1; i < n - 1; i++) {
      if (arr[i] === 0 || Math.abs((arr[i + 1] / arr[i]) - r0) > 1e-6) {
        esGeometrica = false;
        break;
      }
    }
  } else {
    esGeometrica = false;
  }

  if (esGeometrica) {
    const siguiente = arr[n - 1] * r0;
    return {
      tipo: "GEOMETRICA",
      descripcion: `Progresion Geometrica con razon constante r = ${r0}`,
      razon: r0,
      siguienteTermino: siguiente
    };
  }

  // 2. Primeras Diferencias (Delta 1)
  const d1 = [];
  for (let i = 0; i < n - 1; i++) {
    d1.push(arr[i + 1] - arr[i]);
  }

  // Verificar si d1 es constante (Progresion Aritmetica)
  const d1Constante = d1.every(val => Math.abs(val - d1[0]) < 1e-6);
  if (d1Constante) {
    const siguiente = arr[n - 1] + d1[0];
    return {
      tipo: "ARITMETICA",
      descripcion: `Progresion Aritmetica de 1er orden con diferencia d = ${d1[0]}`,
      diferencia: d1[0],
      siguienteTermino: siguiente
    };
  }

  // 3. Segundas Diferencias (Delta 2)
  const d2 = [];
  for (let i = 0; i < d1.length - 1; i++) {
    d2.push(d1[i + 1] - d1[i]);
  }

  // Verificar si d2 es constante (Secuencia Cuadratica de 2do Orden)
  const d2Constante = d2.length > 0 && d2.every(val => Math.abs(val - d2[0]) < 1e-6);
  if (d2Constante) {
    const delta2 = d2[0];
    const siguienteD1 = d1[d1.length - 1] + delta2;
    const siguiente = arr[n - 1] + siguienteD1;
    return {
      tipo: "CUADRATICA_2DO_ORDEN",
      descripcion: `Secuencia de 2do Orden (Diferencias crecientes con paso constante +${delta2})`,
      segundaDiferencia: delta2,
      siguienteDiferencia: siguienteD1,
      siguienteTermino: siguiente
    };
  }

  // 4. Patron Alternado o Progresion Decreciente Especial
  // Ejemplo: 100, 93, 84, 73 (-7, -9, -11 => paso -2 en diferencias)
  // O secuencia dual 6, 3, 12, 9, 36, 35
  if (d1.length >= 3) {
    const pasoDiferencias = d1[1] - d1[0];
    let diferenciasEnProgresion = true;
    for (let i = 1; i < d1.length - 1; i++) {
      if (Math.abs((d1[i + 1] - d1[i]) - pasoDiferencias) > 1e-6) {
        diferenciasEnProgresion = false;
        break;
      }
    }
    if (diferenciasEnProgresion) {
      const siguienteD1 = d1[d1.length - 1] + pasoDiferencias;
      const siguiente = arr[n - 1] + siguienteD1;
      return {
        tipo: "DIFERENCIAS_PROGRESIVAS",
        descripcion: `Diferencias sucesivas en progresion con variacion ${pasoDiferencias}`,
        siguienteTermino: siguiente
      };
    }
  }

  return {
    tipo: "PATRON_COMPLEJO",
    descripcion: "Patron no elemental o serie combinada",
    siguienteTermino: null
  };
}
