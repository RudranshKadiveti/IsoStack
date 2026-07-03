import type { ArchNode } from './types';

export function nextAvailableCell(
  existingNodes: ArchNode[]
): { col: number; row: number } {
  const occupied = new Set(
    existingNodes.map((n) => `${n.grid_hint.col},${n.grid_hint.row}`)
  );
  for (let col = 0; col <= 7; col++) {
    for (let row = 0; row <= 7; row++) {
      if (!occupied.has(`${col},${row}`)) return { col, row };
    }
  }
  return { col: 7, row: 7 }; // fallback
}
