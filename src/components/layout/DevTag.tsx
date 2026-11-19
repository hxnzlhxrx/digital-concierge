import React, { useEffect, useRef } from 'react';
import './devtag.css';

/* Devtag </gishikoDev_> — portado de DovelaPortal (public-app.js · initDevtagShowcase).
   En pantallas táctiles (sin hover) el efecto Expressive (trazo 1.5→3px + ondas) se muestra
   con la clase .is-showcase:
   1) una vez al llegar a la vista (≥ 8 s entre repeticiones, nunca en bucle);
   2) al tocar: el efecto arranca bajo el dedo y el enlace se abre tras 800 ms para que se vea
      completo. La reapertura repite el clic sobre el mismo enlace, conservando target="_blank"
      y rel. 800 ms queda bajo el límite de WebKit (~1 s) para abrir pestañas tras un gesto.
   Mouse, teclado y clics con modificadores no cambian: abren al instante. */
const DURACION_VITRINA = 2400;
const PAUSA_VITRINA = 8000;
const VENTANA_TOQUE = 800;
const PAUSA_APERTURA = 800;

export const DevTag: React.FC = () => {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const link = ref.current;
    if (!link || !window.matchMedia) return;
    const tactil = window.matchMedia('(hover: none), (pointer: coarse)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let ocultarTimer = 0;
    let abrirTimer = 0;
    let respaldoTimer = 0;
    let ultimaVitrina = -Infinity;
    let ultimoToque = -Infinity;
    let pendiente = false;
    let dejarPasar = false;

    const mostrar = (duracion = DURACION_VITRINA) => {
      window.clearTimeout(ocultarTimer);
      link.classList.remove('is-showcase');
      void link.offsetWidth; // reinicia las ondas aunque la clase ya estuviera puesta
      link.classList.add('is-showcase');
      ultimaVitrina = performance.now();
      ocultarTimer = window.setTimeout(() => link.classList.remove('is-showcase'), duracion);
    };

    const limpiar = () => {
      window.clearTimeout(ocultarTimer);
      window.clearTimeout(abrirTimer);
      pendiente = false;
      link.classList.remove('is-showcase');
    };

    let observer: IntersectionObserver | undefined;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (!tactil.matches || pendiente || !entries[0].isIntersecting) return;
          if (performance.now() - ultimaVitrina < PAUSA_VITRINA) return;
          mostrar();
        },
        { threshold: 0.6 }
      );
      observer.observe(link);
    }

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== 'touch' && event.pointerType !== 'pen') return;
      ultimoToque = performance.now();
      if (!pendiente) mostrar();
    };

    const onClick = (event: MouseEvent) => {
      if (dejarPasar) return; // la reapertura programada sigue su curso normal
      const deToque = performance.now() - ultimoToque < VENTANA_TOQUE;
      const conModificador =
        event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0;
      if (!deToque || conModificador) return;
      event.preventDefault();
      if (pendiente) return; // un segundo toque durante la pausa no abre otra pestaña
      pendiente = true;
      mostrar();
      abrirTimer = window.setTimeout(
        () => {
          pendiente = false;
          let salio = false;
          const marcarSalida = () => {
            salio = true;
          };
          window.addEventListener('blur', marcarSalida, { once: true });
          window.addEventListener('pagehide', marcarSalida, { once: true });
          document.addEventListener('visibilitychange', marcarSalida, { once: true });
          dejarPasar = true;
          link.click();
          dejarPasar = false;
          // Respaldo: si el navegador bloqueó la pestaña nueva, abrir en esta misma pestaña.
          respaldoTimer = window.setTimeout(() => {
            window.removeEventListener('blur', marcarSalida);
            window.removeEventListener('pagehide', marcarSalida);
            document.removeEventListener('visibilitychange', marcarSalida);
            if (!salio && document.visibilityState === 'visible' && document.hasFocus()) {
              window.location.assign(link.href);
            }
          }, 600);
        },
        reducedMotion.matches ? 250 : PAUSA_APERTURA
      );
    };

    // Al volver de Linktree el efecto no queda pegado.
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') limpiar();
    };

    link.addEventListener('pointerdown', onPointerDown);
    link.addEventListener('click', onClick, true);
    window.addEventListener('pagehide', limpiar);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      observer?.disconnect();
      limpiar();
      window.clearTimeout(respaldoTimer);
      link.removeEventListener('pointerdown', onPointerDown);
      link.removeEventListener('click', onClick, true);
      window.removeEventListener('pagehide', limpiar);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <a
      ref={ref}
      className="footer__devtag"
      href="https://linktr.ee/gishikoDev"
      target="_blank"
      rel="me noopener noreferrer"
      data-devtag-link
      aria-label="gishikoDev — Linktree (opens in a new tab)"
    >
      <span className="footer__dev-glow" aria-hidden="true"></span>
      <span className="footer__dev-ripples" aria-hidden="true"></span>
      <span className="footer__logo">&lt;/gishikoDev_&gt; &copy;</span>
      <svg
        className="footer__dev-icon"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M7 5h8v8" />
        <path d="m15 5-9 9" />
      </svg>
    </a>
  );
};
