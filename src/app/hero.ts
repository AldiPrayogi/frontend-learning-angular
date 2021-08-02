import { Type } from './type';

export interface Hero {
  id: string;
  name: string;
  description: string,
  level: number,
  type: Type,
  image: any,
}
