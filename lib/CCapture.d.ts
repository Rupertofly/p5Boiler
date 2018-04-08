class CCapture {
  constructor(settings?: object);

  save(): any;
  start(): void;
  capture(canvas: HTMLElement): void;
  stop(): void;
}
