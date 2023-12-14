import React, { useReducer, useContext, createContext } from 'react';
import { reducer, cartItemsTotalPrice, cartItemsTotalPrice1 } from './cart.reducer';
import { useStorage } from 'helpers/use-storage';

const CartContext = createContext({} as any);

const INITIAL_STATE = {
  isOpen: false,
  items: [],
  coupon: null,
  isOpen1: false,
  items1: [],
  coupon1: null,
};

const useCartActions = (initialCart = INITIAL_STATE) => {
  const [state, dispatch] = useReducer(reducer, initialCart);

  // useEffect(() => {
  //   const fetchItems = async () => {
  //     try {
  //       // Fetch items from API for the first array
  //       const response = await fetch('http://localhost:8000/agriculture/articles/', {
  //         method :'GET'
  //       });
  //       const data = await response.json();
  //       dispatch({ type: 'REHYDRATE', payload: { items: data } });
  //     } catch (error) {
  //       console.error('Error fetching items:', error);
  //     }
  //   };

  //   const fetchItems1 = async () => {
  //     try {
  //       // Fetch items from API for the second array
  //       const response = await fetch('http://localhost:8000/agriculture/articles_location/', {
  //         method: "GET"
  //       });
  //       const data = await response.json();
  //       dispatch({ type: 'REHYDRATE', payload: {items1: data}});

  //     } catch (error) {
  //       console.error('Error fetching items1:', error);
  //     }
  //   };

  //   // Appeler la fonction fetchItems lors de l'initialisation du composant
  //   fetchItems();
  //   fetchItems1();
  // }, []); // Le tableau de dépendances vide signifie que cet effet est exécuté une seule fois lors du montage du composant


  const addItemHandler = (item, quantity = 1) => {

      if(item.valide_location){        
        if(Number(item.rental_stock) >= Number(item.quantity ? item.quantity : quantity )+1){
          dispatch({ type: 'ADD_ITEM1', payload: { ...item, quantity } });
          const user = JSON.parse(localStorage.getItem('user'))
          fetch(`http://localhost:8000/agriculture/ajouter_au_panier_location/${item.id}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${user.token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({quantity : quantity})
          })
          .then(res => res.json())
          .then(data => {
            console.log(data)
          })
          .catch(erreur => console.error("Erreur => ", erreur)) 
        }else{
          alert("stock insuffisant pour la location")
        }
      }else{
        if(Number(item.stock) >= Number(item.quantity ? item.quantity : quantity )+1){
          dispatch({ type: 'ADD_ITEM', payload: { ...item, quantity } });
          const user = JSON.parse(localStorage.getItem('user'))
          fetch(`http://localhost:8000/agriculture/ajouter_au_panier/${item.id}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${user.token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({quantity : quantity})
          })
          .then(res => res.json())
          .then(data => {
            console.log(data)
          })
          .catch(erreur => console.error("Erreur => ", erreur)) 
        }else{
          alert("stock insuffisant pour l'achat")
        }
      }
  };


  const removeItemHandler = (item, quantity = 1) => {
    if(item.valide_location){
      dispatch({ type: 'REMOVE_ITEM1', payload: { ...item, quantity } });
      const user = JSON.parse(localStorage.getItem('user'))
      fetch(`http://localhost:8000/agriculture/supprimer_au_panier_location/${item.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({quantity : quantity})
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
      .catch(erreur => console.error("Erreur => ", erreur))
    }else{
      dispatch({ type: 'REMOVE_ITEM', payload: { ...item, quantity } });
      const user = JSON.parse(localStorage.getItem('user'))
      fetch(`http://localhost:8000/agriculture/supprimer_au_panier/${item.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({quantity : quantity})
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
      .catch(erreur => console.error("Erreur => ", erreur))
    }
  };


  const clearItemFromCartHandler = (item) => {
    if(item.valide_location){
      dispatch({ type: 'CLEAR_ITEM_FROM_CART1', payload: item });
      const user = JSON.parse(localStorage.getItem('user'))
      fetch(`http://localhost:8000/agriculture/retirer_produit_location/${item.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
      .catch(erreur => console.error("Erreur => ", erreur))
    }else{
      dispatch({ type: 'CLEAR_ITEM_FROM_CART', payload: item });
      const user = JSON.parse(localStorage.getItem('user'))
      fetch(`http://localhost:8000/agriculture/retirer_produit/${item.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
      .catch(erreur => console.error("Erreur => ", erreur))
    }

  };


  const clearCartHandler = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCartHandler = () => {

    dispatch({ type: 'TOGGLE_CART' });
  };


  const couponHandler = (coupon) => {
    dispatch({ type: 'APPLY_COUPON', payload: coupon });
  };
  const removeCouponHandler = () => {
    dispatch({ type: 'REMOVE_COUPON' });
  };

  const rehydrateLocalState = (payload) => {
    dispatch({ type: 'REHYDRATE', payload });
  };

  
  const isInCartHandler = (id) => {
    return state.items?.some((item) => item.id === id);
  };

  const getItemHandler = (id) => {
    return state.items?.find((item) => item.id === id);
  };

  const getItemHandler1 = (id) => {
    return state.items1?.find((item) => item.id === id);
  };

  const getCartItemsPrice = () => cartItemsTotalPrice(state.items);
  
  const getCartItemsPrice1 = () => cartItemsTotalPrice1(state.items1);
  
  const getCartItemsTotalPrice = () =>
    cartItemsTotalPrice(state.items, state.coupon);

  const getCartItemsTotalPrice1 = () =>
    cartItemsTotalPrice1(state.items1, state.coupon1);

  const getDiscount = () => {
    const total = cartItemsTotalPrice(state.items);
    const discount = state.coupon
      ? (total * Number(state.coupon?.discountInPercent)) / 100
      : 0;
    return discount.toFixed(2);
  };
  const getItemsCount = state.items?.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  
  const getItemsCount1 = state.items1?.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  return {
    state,
    getItemsCount,
    getItemsCount1,
    rehydrateLocalState,
    addItemHandler,
    removeItemHandler,
    clearItemFromCartHandler,
    clearCartHandler,
    isInCartHandler,
    getItemHandler,
    getItemHandler1,
    toggleCartHandler,
    getCartItemsTotalPrice,
    getCartItemsTotalPrice1,
    getCartItemsPrice,
    getCartItemsPrice1,
    couponHandler,
    removeCouponHandler,
    getDiscount,
  };
};

export const CartProvider = ({ children }) => {
  const {
    state,
    rehydrateLocalState,
    getItemsCount,
    getItemsCount1,
    addItemHandler,
    removeItemHandler,
    clearItemFromCartHandler,
    clearCartHandler,
    isInCartHandler,
    getItemHandler,
    getItemHandler1,
    toggleCartHandler,
    getCartItemsTotalPrice,
    getCartItemsTotalPrice1,
    couponHandler,
    removeCouponHandler,
    getCartItemsPrice,
    getDiscount,
  } = useCartActions();
  const { rehydrated, error } = useStorage(state, rehydrateLocalState);

  return (
    <CartContext.Provider
      value={{
        isOpen: state.isOpen,
        items: state.items,
        coupon: state.coupon,
        cartItemsCount: state.items?.length,
        itemsCount: getItemsCount,

        isOpen1: state.isOpen1,
        items1: state.items1,
        coupon1: state.coupon1,
        cartItemsCount1: state.items1?.length,
        itemsCount1: getItemsCount1,

        addItem: addItemHandler,
        removeItem: removeItemHandler,
        removeItemFromCart: clearItemFromCartHandler,
        clearCart: clearCartHandler,
        isInCart: isInCartHandler,
        getItem: getItemHandler,
        getItem1: getItemHandler1,
        toggleCart: toggleCartHandler,
        calculatePrice: getCartItemsTotalPrice,
        calculatePrice1: getCartItemsTotalPrice1,
        calculateSubTotalPrice: getCartItemsPrice,
        applyCoupon: couponHandler,
        removeCoupon: removeCouponHandler,
        calculateDiscount: getDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
