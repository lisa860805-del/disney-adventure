export interface Room {
  stateroom: string;
  category: string;
  occupancy: number;
  theme: string;
  deck: number;
  roomType: string;
  isConcierge: boolean;
  image: string | null;
}
