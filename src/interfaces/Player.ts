import { Identifiable } from './Identifiable';

export interface IPlayer extends Identifiable {
  name: string;
  gameTime?: Date;
  level?: number;
  score?: number;
  lives?: number;
}
