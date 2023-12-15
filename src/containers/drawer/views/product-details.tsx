import React, { useState, useContext } from 'react';
import { Scrollbar } from 'components/scrollbar';
import Button from 'components/button';
import { CURRENCY } from 'helpers/constants';
import { useCart } from 'contexts/cart/cart.provider';
import { DrawerContext } from 'contexts/drawer/drawer.provider';
import ArrowLeft from 'assets/icons/arrow-left';
import Counter from 'components/counter';
import Link from 'next/link';

export default function ProductDetails() {
  const [visibility, setVisibility] = useState(false);
  const { addItem, getItem, removeItem, getItem1 } = useCart();
  const { state, dispatch } = useContext(DrawerContext);

  const count = getItem(state.item.id)?.quantity;
  const count1 = getItem1(state.item.id)?.quantity;

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  const hideDetails = () => {
    dispatch({
      type: 'TOGGLE_PRODUCT_DETAIL',
      payload: {
        showDetails: false,
      },
    });

    dispatch({
      type: 'SLIDE_CART',
      payload: {
        open: false,
      },
    });
  };

  const addToCart = (location=false) => {
    if(location){
      state.item.valide_location = true
      addItem(state.item);

      dispatch({
        type: 'TOGGLE_CART_VIEW1',
        payload: {
          showCart1: true,
        },
      });
    }else{
      state.item.valide_location = false
      addItem(state.item);
      dispatch({
        type: 'TOGGLE_CART_VIEW',
        payload: {
          showCart: true,
        },
      });
    }
    
  };

  console.log("count : ", count , "count1 : ", count1, 'state : ', state)


  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full flex justify-center relative px-30px py-20px">
        <button
          className="w-auto h-10 flex items-center justify-center text-gray-500 absolute top-half -mt-20px left-30px transition duration-300 focus:outline-none hover:text-gray-900"
          onClick={hideDetails}
          aria-label="close"
        >
          <ArrowLeft />
        </button>

        <h2 className="font-bold text-24px m-0">Details</h2>
      </div>

      <Scrollbar className="details-scrollbar flex-grow">
        <div className="flex flex-col p-30px pt-0">
          <div className="relative flex items-center justify-center w-full h-360px overflow-hidden rounded mb-30px">
            {/* <Image
              className="object-cover"
              src={state.item.image}
              alt={`${state.item.name}-img`}
              fill
              sizes="(max-width: 768px) 100vw"
            /> */}
            <img
              className="object-cover"
              src={"https://agriconnectapi.pythonanywhere.com"+state.item.image}
              alt={`${state.item.name}-img`}
              sizes="(max-width: 768px) 100vw"
            />
          </div>

          <div className="flex flex-col items-start mb-4">
            {
              state.item.is_sent &&
              <h2 className="text-gray-900 font-semibold mb-2">
                {state.item.price}
                {CURRENCY}
              </h2>
            }
            
            <b><span className="mb-3">{state.item.name}</span></b>
            <p className="flex items-center mb-5">
              {/* <span className=" text-gray-500 text-11px capitalize">
                {state.item.type}
              </span> */}
              {
                state.item.is_sent &&
                <span className=" text-gray-500 text-11px">
                  {state.item.stock}{' '}
                  {state.item.stock > 1 ? 'exemplaires' : 'exemplaire'}
                </span>
              }
            </p>

            {visibility === true ? (
              <p className="my-5">{state.item.description}</p>
            ) : (
              ''
            )}

            {state.item.description && (
              <button
                className="font-semibold text-11px text-gray-800 mt-2 focus:outline-none"
                onClick={toggleVisibility}
                aria-label="details"
              >
                {visibility === true ? 'Moins de détails' : 'Plus de détails'}
              </button>
            )}
          </div>

          <div className="flex w-full flex-col">
            <div className="flex flex-col justify-start full mt-10 pr-30px even:pr-0">
              <h2 className="text-gray-500 text-11px mb-2">Catégorie</h2>
              <span className="font-normal text-13px text-gray-900 capitalize">
                {state.item.categorie.name}
              </span>
            </div>

            <div className="flex flex-col justify-start full mt-10 pr-30px even:pr-0">
              <h2 className="text-gray-500 text-11px mb-2">Emplacement de l'équipement</h2>
              <span className="font-normal text-13px text-gray-900 capitalize">
                {state.item.address}
              </span>
            </div>

            <div className="flex flex-col justify-start full mt-10 pr-30px even:pr-0">
              <h2 className="text-gray-500 text-11px mb-2">
                Est ce que l'on peut louer un ou des exemplaires de l'équipement ??
              </h2>
              <span className="font-normal text-13px text-gray-900 capitalize">
              {
                state.item.is_rented ? 
                <div>
                  <p>
                    <strong>Modalité de location:</strong> {state.item.payment_mode}
                  </p>
                  <p>
                    <strong>Montant de location:</strong> {state.item.rental_amount} FCFA
                  </p>
                  <p>
                    <strong>Nombre d'exemplaires pour location:</strong> {state.item.rental_stock}
                  </p>
                  <p>
                    <strong>Date de début de location prévue par le propriétaire:</strong> {state.item.rental_start_date}
                  </p>
                  <p>
                    <strong>Date de fin de location prévue par le propriétaire:</strong> {state.item.rental_end_date}
                  </p>
                </div>

                :
                <span className="font-normal text-13px text-gray-900">
                  Non , achat seulement
                </span>
              }
              </span>
            </div>

            <div className="flex flex-col justify-start full mt-10 pr-30px even:pr-0">
              <h2 className="text-gray-500 text-11px mb-2">
                Nom(s) et prénom(s) du propriétaire
              </h2>
              <span className="font-normal text-13px text-gray-900 capitalize">
              {state.item.owner.last_name} {state.item.owner.first_name}
              </span>
            </div>

            <div className="flex flex-col justify-start full mt-10 pr-30px even:pr-0">
              <h2 className="text-gray-500 text-11px mb-2">Adresse du propriétaire</h2>
              <span className="font-normal text-13px text-gray-900 capitalize">
                {state.item.owner.adresse}
              </span>
              <a href='#' style={{fontSize: 11, marginTop: 10}}>Voir sur le maps</a>
            </div>
          </div>
        </div>
      </Scrollbar>
      
      {
        localStorage.getItem('user') ?
      <div className="flex flex-col p-30px">
      {count1 > 0 ? (
          <Counter
            value={count1}
            type={state.item.is_rented}
            className="ml-auto w-full big mb-5"
            size="big"
            onIncrement={() => {
              addItem(state.item);
            }}
            onDecrement={() => removeItem(state.item)}
          />
        ) : (
          state.item.is_rented &&
          <Button className="w-full big mb-5" onClick={() => addToCart(true)}>
            Ajouter au panier de location
          </Button>
          
          
          // state.item.is_rented ?
          // <>
          // <Button className="w-full big" onClick={() => addToCart(true)}>
          //   Ajouter au panier de location
          // </Button>
          // <br/>
          // <Button className="w-full big" onClick={() => addToCart()}>
          //   Ajouter au panier d'achat
          // </Button>
          // </>
          // :
          // <Button className="w-full big" onClick={() => addToCart()}>
          //   Ajouter au panier d'achat
          // </Button>
        )}

        {count > 0 ? (
          <Counter
            value={count}
            type={false}
            className="ml-auto w-full big mb-5"
            size="big"
            onIncrement={() => {
              addItem(state.item);
            }}
            onDecrement={() => removeItem(state.item)}
          />
        ) : (
          state.item.is_sent &&
          <Button className="w-full big" onClick={() => addToCart()}>
            Ajouter au panier d'achat
          </Button>
          
          
          // state.item.is_rented ?
          // <>
          // <Button className="w-full big" onClick={() => addToCart(true)}>
          //   Ajouter au panier de location
          // </Button>
          // <br/>
          // <Button className="w-full big" onClick={() => addToCart()}>
          //   Ajouter au panier d'achat
          // </Button>
          // </>
          // :
          // <Button className="w-full big" onClick={() => addToCart()}>
          //   Ajouter au panier d'achat
          // </Button>
        )}
      </div>:
      <div className="flex flex-col p-30px">
          <Button className="w-full big">
          <Link href={'/connexion'}>
            Se connecter
          </Link>
          </Button>
      </div>
      }
    </div>
  );
}
