export const initializeCanvas = (
  context: CanvasRenderingContext2D,
  color: string,
  width: number
) => {
  context.strokeStyle = color;
  context.lineWidth = width;
  context.lineCap = 'round';
  context.lineJoin = 'round';
};

export const drawLine = (
  context: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string,
  width: number
) => {
  context.beginPath();
  context.strokeStyle = color;
  context.lineWidth = width;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
};

export const clearCanvas = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) => {
  context.clearRect(0, 0, canvas.width, canvas.height);
};