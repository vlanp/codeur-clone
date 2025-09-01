interface IOffer {
  id: string;
  price: number;
  duration: number;
  message: string;
  publicationDate: Date;
}
interface IParsedOffer {
  id: string;
  price: number;
  duration: number;
  message: string;
  publicationDate: string;
}
export type { IOffer, IParsedOffer };
