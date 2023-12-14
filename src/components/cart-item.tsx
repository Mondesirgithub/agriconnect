import Counter from './counter';
import { CURRENCY } from 'helpers/constants';
import { useCart } from 'contexts/cart/cart.provider';
import {
  CartItemBase,
  CartItemImage,
  CartItemContent,
  CartItemName,
  CartItemSinglePrice,
  CartItemTotalWrapper,
  CartItemTotalPrice,
} from './utils/theme';

type CartItemProps = {
  item: any;
  location: boolean;
};

const CartItem: React.FC<CartItemProps> = ({ item, location }) => {
  const { addItem, removeItem } = useCart();

  return (
    <div className={CartItemBase}>
      <div className={CartItemImage}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={"http://localhost:8000"+item.image} alt={item.name} />
      </div>

      <div className={CartItemContent}>
        <span className={CartItemName}>{item.name} {item.valide_location ? "(En location)" : ""} </span>
        <span className={CartItemSinglePrice}>
          Prix unitaire : &nbsp;
          {item.valide_location ? item.rental_amount : item.price}{CURRENCY}
        </span>
        {
          item.valide_location &&
          <span className={CartItemSinglePrice}>
            Modalité de location : &nbsp;
            {item.payment_mode}
          </span>
        }
        <div className={CartItemTotalWrapper}>
          <Counter
            type={location}
            value={item.quantity}
            onIncrement={() => addItem(item)}
            onDecrement={() => removeItem(item)}
          />

          <span className={CartItemTotalPrice}>
            {
              item.valide_location ? (item.rental_amount * item.quantity) : (item.price * item.quantity)
            }
            {CURRENCY}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
