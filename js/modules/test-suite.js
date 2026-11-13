/**
 * Modulo D: Suite de Pruebas Unitarias Automatizadas
 */

import { calcularProbabilidadDados, calcularPartidosTorneo, contarMultiplosMenores, calcularViajesMinimos } from "./bairesdev.js";
import { resolverCuadratica } from "./cuadratica.js";
import { analizarSecuencia } from "./secuencias.js";

/**
 * Compara dos numeros flotantes con tolerancia de error relativo/absoluto (Epsilon)
 */
function casiIguales(a, b, eps = 1e-7) {
  if (a === b) return true;
  const diff = Math.abs(a - b);
  return diff < eps || diff / (Math.abs(a) + Math.abs(b)) < eps;
}

/**
 * Lista de las 10 pruebas unitarias requeridas por el proyecto
 */
export const tests = [
  {
    id: 1,
    nombre: "Probabilidad Suma de 2 Dados = 7",
    categoria: "BairesDev",
    esCascarita: false,
    ejecutar: () => {
      const res = calcularProbabilidadDados(7);
      const ok = res.casosFavorables === 6 && casiIguales(res.probabilidad, 6 / 36);
      return {
        pass: ok,
        detalle: `Esperado: 6/36 (0.1667). Obtenido: ${res.casosFavorables}/${res.casosTotales} (${res.probabilidad.toFixed(4)})`
      };
    }
  },
  {
    id: 2,
    nombre: "Torneo Round-Robin de 4 Equipos",
    categoria: "BairesDev",
    esCascarita: false,
    ejecutar: () => {
      const res = calcularPartidosTorneo(4);
      const ok = res === 6;
      return {
        pass: ok,
        detalle: `Esperado: 6 partidos. Obtenido: ${res} partidos.`
      };
    }
  },
  {
    id: 3,
    nombre: "Multiplos Positivos Menores a 904 Divisibles por 3",
    categoria: "BairesDev",
    esCascarita: false,
    ejecutar: () => {
      const res = contarMultiplosMenores(904, 3);
      const ok = res === 301;
      return {
        pass: ok,
        detalle: `Esperado: 301. Obtenido: ${res}.`
      };
    }
  },
  {
    id: 4,
    nombre: "Minimo de Viajes para 17 Botellas (Capacidad 3)",
    categoria: "BairesDev",
    esCascarita: false,
    ejecutar: () => {
      const res = calcularViajesMinimos(17, 3);
      const ok = res === 6;
      return {
        pass: ok,
        detalle: `Esperado: 6 viajes. Obtenido: ${res} viajes.`
      };
    }
  },
  {
    id: 5,
    nombre: "Cuadratica con Raices Reales Distintas (x^2 - 5x + 6 = 0)",
    categoria: "Algebra",
    esCascarita: false,
    ejecutar: () => {
      const res = resolverCuadratica(1, -5, 6);
      const ok = res.tipo === "REALES_DISTINTAS" &&
                 casiIguales(res.raices[0], 3) &&
                 casiIguales(res.raices[1], 2);
      return {
        pass: ok,
        detalle: `Esperado: [3, 2]. Obtenido: [${res.raices.map(r => r.toFixed(2)).join(", ")}]`
      };
    }
  },
  {
    id: 6,
    nombre: "Cuadratica con Raiz Doble (x^2 - 4x + 4 = 0)",
    categoria: "Algebra",
    esCascarita: false,
    ejecutar: () => {
      const res = resolverCuadratica(1, -4, 4);
      const ok = res.tipo === "RAIZ_DOBLE" && casiIguales(res.raices[0], 2);
      return {
        pass: ok,
        detalle: `Esperado: x = 2 (raiz doble). Obtenido: x = ${res.raices[0]}`
      };
    }
  },
  {
    id: 7,
    nombre: "Cuadratica Complejas Conjugadas (x^2 + 2x + 5 = 0)",
    categoria: "Algebra",
    esCascarita: false,
    ejecutar: () => {
      const res = resolverCuadratica(1, 2, 5);
      const ok = res.tipo === "COMPLEJAS_CONJUGADAS" &&
                 casiIguales(res.raices[0].real, -1) &&
                 casiIguales(res.raices[0].imag, 2);
      return {
        pass: ok,
        detalle: `Esperado: -1 +/- 2i. Obtenido: ${res.raices[0].texto}, ${res.raices[1].texto}`
      };
    }
  },
  {
    id: 8,
    nombre: "Cascarita 1: Cancelacion Catastrofica (a=1, b=10^8, c=1)",
    categoria: "Cascarita Numérica",
    esCascarita: true,
    ejecutar: () => {
      const a = 1, b = 1e8, c = 1;
      const res = resolverCuadratica(a, b, c);

      // Raices teoricas exactas: x1 approx -1e8, x2 approx -1e-8
      // La formula naive evalua x2 a 0 debido a cancelacion catastrofica en flotante.
      const rPequeña = Math.min(Math.abs(res.raices[0]), Math.abs(res.raices[1]));
      const noEsCero = rPequeña > 0 && Math.abs(rPequeña - 1e-8) < 1e-12;

      return {
        pass: noEsCero,
        detalle: noEsCero
          ? `Superado: Raiz menor calculada con precision: ${rPequeña.toExponential(4)} (cercana a 1.0000e-8)`
          : `Fallo de Cancelacion Catastrofica: la raiz menor dio ${rPequeña} en vez de ~1e-8. Requiere formula de Citardauq.`
      };
    }
  },
  {
    id: 9,
    nombre: "Cascarita 2: Ecuacion Cuadratica Degenerada (a=0, 4x - 8 = 0)",
    categoria: "Cascarita Numérica",
    esCascarita: true,
    ejecutar: () => {
      const res = resolverCuadratica(0, 4, -8);
      const ok = res.tipo === "LINEAL_DEGENERADA" && casiIguales(res.raices[0], 2);
      return {
        pass: ok,
        detalle: ok
          ? `Superado: Detectada ecuacion lineal degenerada con solucion x = 2.`
          : `Fallo: El algoritmo intento dividir entre 2*a (0) o arrojo NaN/Infinity.`
      };
    }
  },
  {
    id: 10,
    nombre: "Cascarita 3: Comparacion Segura IEEE-754 ($2.80 respecto a $8.75)",
    categoria: "Cascarita Numérica",
    esCascarita: true,
    ejecutar: () => {
      // 2.80 / 8.75 * 100 produce 32.00000000000001 en JS
      const calculo = (2.80 / 8.75) * 100;
      const comparacionNaive = (calculo === 32); // Da false en JS
      const comparacionRobusta = Math.abs(calculo - 32) < Number.EPSILON * 100;

      return {
        pass: comparacionRobusta,
        detalle: `Calculo JS crudo: ${calculo}. Comparacion estricta === da: ${comparacionNaive}. Comparacion segura con Epsilon da: ${comparacionRobusta}.`
      };
    }
  }
];

/**
 * Ejecuta todas las pruebas y devuelve un reporte estructurado
 */
export function ejecutarSuiteCompleta() {
  const resultados = tests.map(t => {
    try {
      const res = t.ejecutar();
      return {
        id: t.id,
        nombre: t.nombre,
        categoria: t.categoria,
        esCascarita: t.esCascarita,
        pass: res.pass,
        detalle: res.detalle
      };
    } catch (err) {
      return {
        id: t.id,
        nombre: t.nombre,
        categoria: t.categoria,
        esCascarita: t.esCascarita,
        pass: false,
        detalle: `Excepcion de ejecucion: ${err.message}`
      };
    }
  });

  const total = resultados.length;
  const pasados = resultados.filter(r => r.pass).length;
  const fallados = total - pasados;

  return {
    total,
    pasados,
    fallados,
    todosAprobados: fallados === 0,
    resultados
  };
}
