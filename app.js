/**
 * Aplicacion Principal - Integracion de Modulos y UI
 */

import { calcularProbabilidadDados, calcularPartidosTorneo, contarMultiplosMenores, calcularViajesMinimos } from "./modules/bairesdev.js";
import { resolverCuadratica, evaluarPolinomio } from "./modules/cuadratica.js";
import { analizarSecuencia } from "./modules/secuencias.js";
import { ejecutarSuiteCompleta } from "./modules/test-suite.js";

document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  initModuloA();
  initModuloB();
  initModuloC();
  initModuloD();
});

/* -------------------------------------------------------------
   NAVEGACION POR PESTAÑAS
------------------------------------------------------------- */
function initTabs() {
  const tabs = document.querySelectorAll(".nav-tab");
  const panes = document.querySelectorAll(".tab-pane");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      panes.forEach(p => p.classList.remove("active"));

      tab.classList.add("active");
      const targetId = tab.getAttribute("data-tab");
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add("active");
      }
    });
  });
}

/* -------------------------------------------------------------
   MODULO A: SIMULADOR BAIRESDEV
------------------------------------------------------------- */
function initModuloA() {
  // Reto 1: Dados
  const btnDados = document.getElementById("btn-calc-dados");
  const inputDados = document.getElementById("input-dados-suma");
  const resDados = document.getElementById("res-dados");

  btnDados?.addEventListener("click", () => {
    try {
      const suma = parseInt(inputDados.value, 10);
      const res = calcularProbabilidadDados(suma);
      resDados.innerHTML = `Suma Objetivo: <strong>${suma}</strong><br>` +
                           `Casos Favorables: <strong>${res.casosFavorables} / ${res.casosTotales}</strong><br>` +
                           `Probabilidad Decimal: <strong>${res.probabilidad.toFixed(4)}</strong><br>` +
                           `Porcentaje: <strong>${res.porcentaje}</strong>`;
    } catch (e) {
      resDados.innerHTML = `<span style="color: var(--accent-red);">${e.message}</span>`;
    }
  });

  // Reto 2: Torneo
  const btnTorneo = document.getElementById("btn-calc-torneo");
  const inputTorneo = document.getElementById("input-torneo-equipos");
  const resTorneo = document.getElementById("res-torneo");

  btnTorneo?.addEventListener("click", () => {
    try {
      const n = parseInt(inputTorneo.value, 10);
      const partidos = calcularPartidosTorneo(n);
      resTorneo.innerHTML = `Equipos participantes: <strong>${n}</strong><br>` +
                            `Partidos Totales C(${n}, 2): <strong>${partidos} partidos</strong>`;
    } catch (e) {
      resTorneo.innerHTML = `<span style="color: var(--accent-red);">${e.message}</span>`;
    }
  });

  // Reto 3: Divisores
  const btnDiv = document.getElementById("btn-calc-div");
  const inputLimite = document.getElementById("input-div-limite");
  const inputDivisor = document.getElementById("input-div-divisor");
  const resDiv = document.getElementById("res-div");

  btnDiv?.addEventListener("click", () => {
    try {
      const lim = parseInt(inputLimite.value, 10);
      const div = parseInt(inputDivisor.value, 10);
      const cant = contarMultiplosMenores(lim, div);
      resDiv.innerHTML = `Enteros en el rango [1, ${lim - 1}] divisibles por ${div}:<br>` +
                         `Total: <strong>${cant} números</strong> (Calculado en tiempo O(1))`;
    } catch (e) {
      resDiv.innerHTML = `<span style="color: var(--accent-red);">${e.message}</span>`;
    }
  });

  // Reto 4: Botellas
  const btnBotellas = document.getElementById("btn-calc-botellas");
  const inputTotal = document.getElementById("input-botellas-total");
  const inputCap = document.getElementById("input-botellas-cap");
  const resBotellas = document.getElementById("res-botellas");

  btnBotellas?.addEventListener("click", () => {
    try {
      const tot = parseInt(inputTotal.value, 10);
      const cap = parseInt(inputCap.value, 10);
      const viajes = calcularViajesMinimos(tot, cap);
      resBotellas.innerHTML = `Botellas totales: <strong>${tot}</strong> (Capacidad por viaje: ${cap})<br>` +
                              `Viajes requeridos: <strong>${viajes} viajes</strong> (Función techo / ceil)`;
    } catch (e) {
      resBotellas.innerHTML = `<span style="color: var(--accent-red);">${e.message}</span>`;
    }
  });
}

/* -------------------------------------------------------------
   MODULO B: MOTOR CUADRATICO & CANVAS
------------------------------------------------------------- */
function initModuloB() {
  const btnResolver = document.getElementById("btn-resolver-cuadratica");
  const inputA = document.getElementById("coef-a");
  const inputB = document.getElementById("coef-b");
  const inputC = document.getElementById("coef-c");

  const outEq = document.getElementById("out-eq");
  const outDelta = document.getElementById("out-delta");
  const outTipo = document.getElementById("out-tipo");
  const outVertice = document.getElementById("out-vertice");
  const outRaices = document.getElementById("out-raices");

  const canvas = document.getElementById("parabola-canvas");

  function resolverYDibujar() {
    const a = parseFloat(inputA.value);
    const b = parseFloat(inputB.value);
    const c = parseFloat(inputC.value);

    // Representacion textual
    const signoB = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
    const signoC = c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`;
    outEq.textContent = `${a}x² ${signoB}x ${signoC} = 0`;

    const res = resolverCuadratica(a, b, c);

    outDelta.textContent = res.discriminante !== null && res.discriminante !== undefined
      ? res.discriminante.toExponential(4)
      : "N/A";
    outTipo.textContent = res.descripcion;

    if (res.vertice) {
      outVertice.textContent = `(${res.vertice.h.toFixed(2)}, ${res.vertice.k.toFixed(2)})`;
    } else {
      outVertice.textContent = "N/A (Línea o degenerada)";
    }

    if (res.tipo === "REALES_DISTINTAS") {
      outRaices.textContent = `x₁ = ${res.raices[0].toFixed(4)}, x₂ = ${res.raices[1].toFixed(4)}`;
    } else if (res.tipo === "RAIZ_DOBLE") {
      outRaices.textContent = `x = ${res.raices[0].toFixed(4)} (Doble)`;
    } else if (res.tipo === "COMPLEJAS_CONJUGADAS") {
      outRaices.textContent = `${res.raices[0].texto}, ${res.raices[1].texto}`;
    } else if (res.tipo === "LINEAL_DEGENERADA") {
      outRaices.textContent = `x = ${res.raices[0].toFixed(4)} (Solución única lineal)`;
    } else {
      outRaices.textContent = res.descripcion;
    }

    dibujarParabola(canvas, a, b, c, res);
  }

  btnResolver?.addEventListener("click", resolverYDibujar);

  // Chips de presets
  const chips = document.querySelectorAll(".presets-row .btn-chip[data-a]");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      inputA.value = chip.getAttribute("data-a");
      inputB.value = chip.getAttribute("data-b");
      inputC.value = chip.getAttribute("data-c");
      resolverYDibujar();
    });
  });

  // Ejecucion inicial
  resolverYDibujar();
}

/**
 * Renderizado de ejes cartesianos y grafica de f(x) = ax^2 + bx + c en Canvas
 */
function dibujarParabola(canvas, a, b, c, res) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;

  // Limpiar fondo
  ctx.fillStyle = "#020617";
  ctx.fillRect(0, 0, W, H);

  // Rango visible centrado en vertice h o 0
  const centroX = res.vertice ? res.vertice.h : 0;
  const centroY = res.vertice ? res.vertice.k : 0;
  const spanX = Math.max(Math.abs(centroX) * 2, 8);
  const minX = centroX - spanX;
  const maxX = centroX + spanX;

  // Escala
  const scaleX = W / (maxX - minX);
  const originCanvasX = (0 - minX) * scaleX;
  const originCanvasY = H / 2;
  const scaleY = H / 20;

  function toScreen(x, y) {
    return {
      sx: (x - minX) * scaleX,
      sy: originCanvasY - (y - centroY) * (scaleY * 0.4)
    };
  }

  // Dibujar Grid y Ejes
  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 1;
  for (let i = 0; i <= W; i += 40) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, H);
    ctx.stroke();
  }
  for (let j = 0; j <= H; j += 40) {
    ctx.beginPath();
    ctx.moveTo(0, j);
    ctx.lineTo(W, j);
    ctx.stroke();
  }

  // Ejes X e Y
  ctx.strokeStyle = "#475569";
  ctx.lineWidth = 1.5;
  // Eje X
  ctx.beginPath();
  ctx.moveTo(0, originCanvasY);
  ctx.lineTo(W, originCanvasY);
  ctx.stroke();
  // Eje Y
  ctx.beginPath();
  ctx.moveTo(originCanvasX, 0);
  ctx.lineTo(originCanvasX, H);
  ctx.stroke();

  // Curva de la Parabola
  ctx.strokeStyle = "#06b6d4";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  let first = true;

  const steps = 120;
  const dx = (maxX - minX) / steps;
  for (let x = minX; x <= maxX; x += dx) {
    const y = evaluarPolinomio(a, b, c, x);
    const pt = toScreen(x, y);
    if (first) {
      ctx.moveTo(pt.sx, pt.sy);
      first = false;
    } else {
      ctx.lineTo(pt.sx, pt.sy);
    }
  }
  ctx.stroke();

  // Marcar Vertice
  if (res.vertice) {
    const ptV = toScreen(res.vertice.h, res.vertice.k);
    ctx.fillStyle = "#10b981";
    ctx.beginPath();
    ctx.arc(ptV.sx, ptV.sy, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Marcar Raices Reales
  if (res.tipo === "REALES_DISTINTAS" || res.tipo === "RAIZ_DOBLE") {
    ctx.fillStyle = "#ef4444";
    res.raices.forEach(r => {
      const ptR = toScreen(r, 0);
      ctx.beginPath();
      ctx.arc(ptR.sx, ptR.sy, 5, 0, Math.PI * 2);
      ctx.fill();
    });
  }
}

/* -------------------------------------------------------------
   MODULO C: DETECTOR DE SECUENCIAS
------------------------------------------------------------- */
function initModuloC() {
  const btnSecuencia = document.getElementById("btn-analizar-secuencia");
  const inputSec = document.getElementById("input-secuencia");
  const resSec = document.getElementById("res-secuencia");

  function analizar() {
    try {
      const raw = inputSec.value.split(",").map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
      if (raw.length < 3) {
        throw new Error("Por favor introduce al menos 3 números válidos separados por comas.");
      }
      const res = analizarSecuencia(raw);
      resSec.innerHTML = `Secuencia ingresada: <strong>[${raw.join(", ")}]</strong><br>` +
                         `Patrón detectado: <strong>${res.tipo}</strong><br>` +
                         `Descripción Matemática: <strong>${res.descripcion}</strong><br>` +
                         (res.siguienteTermino !== null
                           ? `Próximo Número Estimado: <strong style="color: var(--accent-green); font-size: 1.15rem;">${res.siguienteTermino}</strong>`
                           : `<span style="color: var(--accent-orange);">No fue posible predecir con reglas polinómicas simples.</span>`);
    } catch (e) {
      resSec.innerHTML = `<span style="color: var(--accent-red);">${e.message}</span>`;
    }
  }

  btnSecuencia?.addEventListener("click", analizar);

  const chips = document.querySelectorAll(".presets-row .btn-chip[data-seq]");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      inputSec.value = chip.getAttribute("data-seq");
      analizar();
    });
  });
}

/* -------------------------------------------------------------
   MODULO D: SUITE DE PRUEBAS UNITARIAS
------------------------------------------------------------- */
function initModuloD() {
  const btnRun = document.getElementById("btn-run-all-tests");
  const tableBody = document.getElementById("test-results-body");
  const summaryBadges = document.getElementById("test-summary-badges");

  btnRun?.addEventListener("click", () => {
    const suite = ejecutarSuiteCompleta();

    tableBody.innerHTML = "";
    suite.resultados.forEach(r => {
      const tr = document.createElement("tr");

      const catBadge = r.esCascarita
        ? `<span class="tag-cat trap">${r.categoria}</span>`
        : `<span class="tag-cat">${r.categoria}</span>`;

      const statusBadge = r.pass
        ? `<span class="badge-pass">✔ PASS</span>`
        : `<span class="badge-fail">✖ FAIL</span>`;

      tr.innerHTML = `
        <td style="font-family: var(--font-mono); font-weight: bold;">#${r.id}</td>
        <td><strong>${r.nombre}</strong></td>
        <td>${catBadge}</td>
        <td>${statusBadge}</td>
        <td style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-muted);">${r.detalle}</td>
      `;
      tableBody.appendChild(tr);
    });

    if (suite.todosAprobados) {
      summaryBadges.innerHTML = `<span class="badge-status pass">✔ 10/10 PRUEBAS SUPERADAS (${suite.pasados} PASS)</span>`;
    } else {
      summaryBadges.innerHTML = `<span class="badge-status fail">✖ ${suite.fallados} PRUEBA(S) FALLADA(S) • ${suite.pasados}/10 PASS</span>`;
    }
  });
}
