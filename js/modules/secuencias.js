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

  // 5. Secuencia Dual (operaciones alternadas)
  // Ejemplo: 6, 3, 12, 9, 36, 35
  //   pasos pares   (6->3, 12->9, 36->35): -3, -3, -1  (sin regla fija)
  //   pasos impares (3->12, 9->36)       : x4, x4      (regla fija)
  // El siguiente paso (35 -> ?) es impar, entonces se aplica x4 => 140
  const dual = analizarDual(arr);
  if (dual) {
    return dual;
  }

  return {
    tipo: "PATRON_COMPLEJO",
    descripcion: "Patron no elemental o serie combinada",
    siguienteTermino: null
  };
}

/**
 * Revisa si una lista de pasos [desde, hasta] sigue una sola regla:
 * siempre sumar el mismo numero o siempre multiplicar por el mismo numero.
 * @param {number[][]} pasos - Pares [valorAnterior, valorSiguiente]
 * @returns {{ operacion: string, valor: number } | null}
 */
function buscarReglaConstante(pasos) {
  if (pasos.length < 2) return null;

  // Regla de suma: la diferencia (hasta - desde) es igual en todos los pasos
  const dif = pasos[0][1] - pasos[0][0];
  if (pasos.every(([desde, hasta]) => Math.abs((hasta - desde) - dif) < 1e-9)) {
    return { operacion: "suma", valor: dif };
  }

  // Regla de multiplicacion: la razon (hasta / desde) es igual en todos los pasos
  if (pasos.every(([desde]) => desde !== 0)) {
    const razon = pasos[0][1] / pasos[0][0];
    if (pasos.every(([desde, hasta]) => Math.abs(hasta / desde - razon) < 1e-9)) {
      return { operacion: "multiplica", valor: razon };
    }
  }

  return null;
}

/**
 * Detecta secuencias duales: los pasos se alternan entre dos grupos
 * (pasos pares y pasos impares) y al menos el grupo del siguiente paso
 * tiene una regla constante.
 * @param {number[]} arr - Secuencia (minimo 5 terminos)
 * @returns {object | null} Resultado o null si no es dual
 */
function analizarDual(arr) {
  if (arr.length < 5) return null;

  const pasosPares = [];
  const pasosImpares = [];
  for (let j = 0; j < arr.length - 1; j++) {
    const paso = [arr[j], arr[j + 1]];
    if (j % 2 === 0) {
      pasosPares.push(paso);
    } else {
      pasosImpares.push(paso);
    }
  }

  const reglaPares = buscarReglaConstante(pasosPares);
  const reglaImpares = buscarReglaConstante(pasosImpares);

  // El siguiente paso tiene indice (arr.length - 1): si es par usa la regla de pasos pares
  const indiceSiguiente = arr.length - 1;
  const reglaSiguiente = indiceSiguiente % 2 === 0 ? reglaPares : reglaImpares;
  if (!reglaSiguiente) return null;

  const ultimo = arr[arr.length - 1];
  const siguienteTermino = reglaSiguiente.operacion === "suma"
    ? ultimo + reglaSiguiente.valor
    : ultimo * reglaSiguiente.valor;

  const texto = (regla) => {
    if (!regla) return "sin regla fija";
    if (regla.operacion === "suma") {
      return regla.valor >= 0 ? `+${regla.valor}` : `${regla.valor}`;
    }
    return `x${regla.valor}`;
  };

  return {
    tipo: "DUAL_ALTERNADA",
    descripcion: `Secuencia dual con operaciones alternadas: pasos pares (${texto(reglaPares)}), pasos impares (${texto(reglaImpares)})`,
    reglaPares,
    reglaImpares,
    siguienteTermino
  };
}
