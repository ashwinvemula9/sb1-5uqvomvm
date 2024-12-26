import { useRef, useEffect } from 'react';
import { socketService } from '../services/socket.service';
import { initializeCanvas, drawLine, clearCanvas } from '../utils/canvas.utils';

export const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const handleDraw = (e: MouseEvent) => {
      if (!isDrawing.current || !canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      drawLine(
        context,
        lastPos.current.x,
        lastPos.current.y,
        x,
        y,
        context.strokeStyle as string,
        context.lineWidth
      );

      socketService.emitDraw({
        x1: lastPos.current.x,
        y1: lastPos.current.y,
        x2: x,
        y2: y,
        color: context.strokeStyle as string,
        width: context.lineWidth
      });

      lastPos.current = { x, y };
    };

    const handleStartDrawing = (e: MouseEvent) => {
      isDrawing.current = true;
      const rect = canvas.getBoundingClientRect();
      lastPos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleStopDrawing = () => {
      isDrawing.current = false;
    };

    socketService.onDraw(({ x1, y1, x2, y2, color, width }) => {
      drawLine(context, x1, y1, x2, y2, color, width);
    });

    socketService.onClear(() => {
      clearCanvas(context, canvas);
    });

    canvas.addEventListener('mousedown', handleStartDrawing);
    canvas.addEventListener('mousemove', handleDraw);
    canvas.addEventListener('mouseup', handleStopDrawing);
    canvas.addEventListener('mouseout', handleStopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', handleStartDrawing);
      canvas.removeEventListener('mousemove', handleDraw);
      canvas.removeEventListener('mouseup', handleStopDrawing);
      canvas.removeEventListener('mouseout', handleStopDrawing);
    };
  }, []);

  return canvasRef;
};