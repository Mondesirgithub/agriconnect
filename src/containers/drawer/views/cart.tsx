import { useState, useContext } from 'react';
import { Scrollbar } from 'components/scrollbar';
import { useCart } from 'contexts/cart/cart.provider';
import { DrawerContext } from 'contexts/drawer/drawer.provider';
import CartItem from 'components/cart-item';
import Button from 'components/button';
import NoItem from './no-item';
import ArrowLeft from 'assets/icons/arrow-left';
import { CURRENCY } from 'helpers/constants';

export default function Cart() {
  const { state, dispatch } = useContext(DrawerContext);

  const { items, calculatePrice, items1, calculatePrice1 } = useCart();


  const showCheckout = (location=false) => {
    if(location){
      state.checkoutLocation = true
    }
    dispatch({
      type: 'TOGGLE_CHECKOUT_VIEW',
      payload: {
        showCheckout: true,
      },
    });
  };


  const hideCart = () => {
    dispatch({
      type: 'SLIDE_CART',
      payload: {
        open: false,
      },
    });
  };

  console.log('items1 => ', items1, "state => ", state)

  return (
    <div className="flex flex-col w-full h-full">
      {
        state.showCart1 || state.openLocation ?
        (
          items1.length ? 
          (
            <>
              <div className="w-full flex justify-center relative px-30px py-20px border-b border-gray-200">
                <button
                  className="w-auto h-10 flex items-center justify-center text-gray-500 absolute top-half -mt-20px left-30px transition duration-300 focus:outline-none hover:text-gray-900"
                  onClick={hideCart}
                  aria-label="close"
                >
                  <ArrowLeft />
                </button>
    
                <h2 className="font-bold text-24px m-0">Votre panier de location</h2>
              </div>
    
              <Scrollbar className="cart-scrollbar flex-grow">
                {items1.map((item) => (
                  <CartItem item={item} key={item.id} location={true} />
                ))}
              </Scrollbar>
            </>
          ):(
            <NoItem location={true} />
          )
        ) : (
          items.length ? 
          (
            <>
              <div className="w-full flex justify-center relative px-30px py-20px border-b border-gray-200">
                <button
                  className="w-auto h-10 flex items-center justify-center text-gray-500 absolute top-half -mt-20px left-30px transition duration-300 focus:outline-none hover:text-gray-900"
                  onClick={hideCart}
                  aria-label="close"
                >
                  <ArrowLeft />
                </button>
    
                <h2 className="font-bold text-24px m-0">Votre panier d'achat</h2>
              </div>
    
              <Scrollbar className="cart-scrollbar flex-grow">
                {items.map((item) => (
                  <CartItem item={item} key={item.id} location={false} />
                ))}
              </Scrollbar>
            </>
          ):(
            <NoItem location={false} />
          )
        )
      }


      <div className="flex flex-col p-30px">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-gray-900">
            Total &nbsp;
          </span>

          <span className="font-semibold text-18px text-gray-900">
            {(state.openLocation || state.showCart1) ? calculatePrice1() : calculatePrice()}
            {CURRENCY}
          </span>
        </div>
      {
        (state.showCart1 || state.openLocation) ?
        <Button
          className="big mt-20px"
          disabled={!items1.length ? true : false}
          onClick={() => showCheckout(true)}
        >
          Confirmer
        </Button>:
        <Button
          className="big mt-20px"
          disabled={!items.length ? true : false}
          onClick={() => showCheckout()}
        >
          Confirmer
        </Button>
      }
      </div>
    </div>
  );
}
