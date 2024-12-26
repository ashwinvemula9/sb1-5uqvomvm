import React, { useRef } from 'react';
import { Eraser, Save } from 'lucide-react';
import { useCanvas } from '../hooks/useCanvas';
import { socketService } from '../services/socket.service';

const Canvas: React.FC = () => {
  const canvasRef = useCanvas();
  const colorRef = useRef<HTMLInputElement>(null);
  const widthRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    socketService.emitClear();
  };

  const handleColorChange = () => {
    const context = canvasRef.current?.getContext('2d');
    if (!context || !colorRef.current) return;
    context.strokeStyle = colorRef.current.value;
  };

  const handleWidthChange = () => {
    const context = canvasRef.current?.getContext('2d');
    if (!context || !widthRef.current) return;
    context.lineWidth = parseInt(widthRef.current.value);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'whiteboard.png';
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
        <input
          ref={colorRef}
          type="color"
          onChange={handleColorChange}
          className="w-8 h-8 rounded cursor-pointer"
        />
        <div className="flex items-center gap-2">
          <input
            ref={widthRef}
            type="range"
            min="1"
            max="20"
            defaultValue="2"
            onChange={handleWidthChange}
            className="w-32"
          />
          <span className="text-sm text-gray-600">Stroke Width</span>
        </div>
        <button
          onClick={handleClear}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        >
          <Eraser className="w-4 h-4" />
          Clear
        </button>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        >
          <Save className="w-4 h-4" />
          Save
        </button>
      </div>
      
      <canvas
        ref={canvasRef}
        className="border border-gray-300 rounded-lg bg-white shadow-sm"
        width={800}
        height={600}
      />
    </div>
  );
};

export default Canvas;