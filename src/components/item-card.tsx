import { CURRENCY } from 'helpers/constants';
import {
  ItemCardBase,
  ItemCardImage,
  ItemCardContent,
  ItemCardPrice,
} from './utils/theme';
import config from '../config'

interface ItemProps {
  image: string;
  name: string;
  price: number;
  is_rented: boolean;
  is_sent: boolean;
  rental_amount: number;
  payment_mode: string;
}

interface ItemCardProps {
  item: ItemProps;
  onClick?: (e: any) => void;
}

export default function ItemCard({ item, onClick }: ItemCardProps) {
  return (
    <div className={ItemCardBase} onClick={onClick}>
      <div className={ItemCardImage}>
        {/* <Image
          src={item.image}
          alt={'Alt ' + item.name}
          fill
          sizes="(max-width: 768px) 100vw"
          blurDataURL={item.image}
          className="object-cover"
        /> */}
        <img
          src={config.apiUrl+item.image}
          alt={'Alt ' + item.name}
          className="object-cover"
        />
      </div>

      <div className={ItemCardContent}>
        <span className="text-16px"><b>Nom :</b> {item.name}</span>
        {
          item.is_sent &&
          <span className="text-13px">
            <b>Prix pour l'achat :</b> {item.price}
            {CURRENCY}
          </span>
        }
        {
          item.is_rented &&
          <span className="text-13px">
            <b>Montant pour la location :</b> {item.rental_amount}
            {CURRENCY}
            par {item.payment_mode}
          </span>
        }
        <span className="text-13px"><b>En location :</b> {item.is_rented ? "OUI" : "NON"}</span>
        <span className="text-13px"><b>En vente :</b> {item.is_sent ? "OUI" : "NON"}</span>
      </div>
    </div>
  );
}
