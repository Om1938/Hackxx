import { Option } from './option';
import { selectedOption } from './selectedOption';

export interface Quiz {
  id: number;
  question: string;
  options: Option[];
  category: string;
  marks: number;

  selectedOption?: selectedOption;
}
