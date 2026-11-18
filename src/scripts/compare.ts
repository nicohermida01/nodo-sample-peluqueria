/**
 * Before/after comparator. The range input carries value, keyboard and a11y;
 * pointer drag (mouse, touch, pen) anywhere on the frame sets the same value.
 */
export function bindCompare(root: HTMLElement, signal: AbortSignal): void {
  const input = root.querySelector<HTMLInputElement>('[data-ba-input]');
  if (!input) return;
  const beforeLabel = root.dataset.beforeLabel ?? '';

  const render = () => {
    const value = Number(input.value);
    root.style.setProperty('--pos', `${value}%`);
    input.setAttribute('aria-valuetext', `${beforeLabel} ${Math.round(value)}%`);
  };

  const fromPointer = (event: PointerEvent) => {
    const rect = root.getBoundingClientRect();
    if (rect.width === 0) return; // Hidden or not laid out yet.
    const pct = ((event.clientX - rect.left) / rect.width) * 100;
    input.value = String(Math.min(100, Math.max(0, pct)));
    render();
  };

  let dragging = false;
  root.addEventListener(
    'pointerdown',
    (event) => {
      if (event.button !== 0) return;
      dragging = true;
      root.setPointerCapture(event.pointerId);
      fromPointer(event);
      input.focus({ preventScroll: true });
    },
    { signal },
  );
  root.addEventListener('pointermove', (event) => dragging && fromPointer(event), { signal });
  const stop = () => {
    dragging = false;
  };
  root.addEventListener('pointerup', stop, { signal });
  root.addEventListener('pointercancel', stop, { signal });
  input.addEventListener('input', render, { signal });

  render();
}

export function setCompareValue(root: HTMLElement, value: number): void {
  const input = root.querySelector<HTMLInputElement>('[data-ba-input]');
  if (!input) return;
  input.value = String(value);
  input.dispatchEvent(new Event('input'));
}
