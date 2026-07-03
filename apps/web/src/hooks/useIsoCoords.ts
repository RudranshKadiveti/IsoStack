import type { LayerType } from '../lib/types';

const ISO_CELL_W = 2.2;
const ISO_CELL_H = 1.4;
const ISO_LAYER_Z = 0.6;

const LAYER_Z_INDEX: Record<LayerType, number> = {
  client:        0,
  gateway:       1,
  auth:          1.5,
  compute:       2,
  queue:         2.5,
  cache:         3,
  data:          3.5,
  storage:       4,
  external:      4.5,
  observability: 1,
};

export function gridToIso(
  col: number,
  row: number,
  layer: LayerType
): [number, number, number] {
  const x = (col - row) * (ISO_CELL_W / 2);
  const y = (col + row) * (ISO_CELL_H / 2) * -0.5;
  const z = (LAYER_Z_INDEX[layer] ?? 0) * ISO_LAYER_Z;
  return [x, y, z];
}
