export interface Cell {
  index: number;
  value: number;
  temporalSelected: boolean;
  selected: boolean;
  player?: number;
}
