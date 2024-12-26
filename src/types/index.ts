export interface User {
  username: string;
  x: number;
  y: number;
}

export interface ChatMessage {
  username: string;
  message: string;
}

export interface DrawData {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  width: number;
}