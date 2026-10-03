import {
  CaretLeft,
  CaretRight,
  CornersIn,
  CornersOut,
  QrCode,
  Sun,
  Moon,
  Pause,
  Play,
} from "@phosphor-icons/react";
import type { SlideTheme } from "./useSlideTheme";

type SlideControlsProps = {
  activeIndex: number;
  slideCount: number;
  title: string;
  busy: boolean;
  ended: boolean;
  focusMode: boolean;
  isLive: boolean;
  theme: SlideTheme;
  ambientMotion?: boolean;
  motionPaused: boolean;
  reducedMotion: boolean;
  onToggleMotion: () => void;
  onToggleTheme: () => void;
  onMove: (index: number) => void;
  onFullscreen: () => void;
  onShare: () => void;
};

export function SlideControls({
  activeIndex,
  slideCount,
  title,
  busy,
  ended,
  focusMode,
  isLive,
  theme,
  ambientMotion,
  motionPaused,
  reducedMotion,
  onToggleMotion,
  onToggleTheme,
  onMove,
  onFullscreen,
  onShare,
}: SlideControlsProps) {
  const motionLabel = reducedMotion
    ? "Movimiento reducido activado"
    : motionPaused
      ? "Reanudar animación"
      : "Pausar animación";
  return (
    <div className="slide-controlbar">
      <span className="slide-position">
        <strong>{String(activeIndex + 1).padStart(2, "0")}</strong>
        <span>/ {String(slideCount).padStart(2, "0")}</span>
        <span className="current-slide-name">{title}</span>
      </span>
      <div className="slide-controls">
        <button
          className="icon-button"
          aria-label="Slide anterior"
          disabled={activeIndex === 0 || busy || ended}
          onClick={() => onMove(activeIndex - 1)}
        >
          <CaretLeft size={20} />
        </button>
        <button
          className="icon-button"
          aria-label="Slide siguiente"
          disabled={activeIndex === slideCount - 1 || busy || ended}
          onClick={() => onMove(activeIndex + 1)}
        >
          <CaretRight size={20} />
        </button>
        <span className="control-divider" />
        {ambientMotion && (
          <button
            className="icon-button"
            aria-label={motionLabel}
            aria-pressed={motionPaused || reducedMotion}
            title={reducedMotion
              ? "Animación desactivada por tu preferencia de movimiento reducido"
              : motionLabel}
            disabled={reducedMotion}
            onClick={onToggleMotion}
          >
            {motionPaused || reducedMotion
              ? <Play size={20} />
              : <Pause size={20} />}
          </button>
        )}
        <button
          className="icon-button"
          aria-label="Modo claro de las slides"
          aria-pressed={theme === "light"}
          title={
            theme === "dark"
              ? "Cambiar slides a modo claro"
              : "Cambiar slides a modo oscuro"
          }
          onClick={onToggleTheme}
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button
          className="icon-button"
          aria-label={
            focusMode ? "Salir de pantalla completa" : "Pantalla completa"
          }
          onClick={onFullscreen}
        >
          {focusMode ? <CornersIn size={20} /> : <CornersOut size={20} />}
        </button>
        {isLive && (
          <button
            className="icon-button"
            aria-label="Mostrar QR"
            onClick={onShare}
          >
            <QrCode size={21} />
          </button>
        )}
      </div>
    </div>
  );
}
