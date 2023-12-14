import React, { useReducer, createContext } from 'react';
export const DrawerContext = createContext<{
  state?: any;
  dispatch?: React.Dispatch<any>;
}>({});

const INITIAL_STATE = {
  showDetails: false,
  showCart: false,
  showCheckout: false,
  menu: false,
  open: false,
  item: [],

  showDetails1: false,
  showCart1: false,
  showCheckout1: false,
  menu1: false,
  open1: false,
  item1: [],
};

type ActionType =
  | { type: 'STORE_PRODUCT_DETAIL'; payload: any }
  | { type: 'STORE_PRODUCT_DETAIL1'; payload: any }
  | { type: 'TOGGLE_PRODUCT_DETAIL'; payload: any }
  | { type: 'TOGGLE_PRODUCT_DETAIL1'; payload: any }
  | { type: 'TOGGLE_CART_VIEW'; payload: any }
  | { type: 'TOGGLE_CART_VIEW1'; payload: any }
  | { type: 'TOGGLE_CHECKOUT_VIEW'; payload: any }
  | { type: 'TOGGLE_CHECKOUT_VIEW1'; payload: any }
  | { type: 'SLIDE_CART'; payload: any }
  | { type: 'SLIDE_CART1'; payload: any }
  | { type: 'OPEN_MENU'; payload: any }
  | { type: 'OPEN_MENU1'; payload: any };

type StateType = typeof INITIAL_STATE;

function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case 'STORE_PRODUCT_DETAIL':
      return {
        ...state,
        item: action.payload.item,
      };
    case 'STORE_PRODUCT_DETAIL1':
      return {
        ...state,
        item1: action.payload.item,
      };

    case 'TOGGLE_PRODUCT_DETAIL':
      return {
        ...state,
        showDetails: action.payload.showDetails,
        showCart: false,
        showCheckout: false,
      };
    case 'TOGGLE_PRODUCT_DETAIL1':
      return {
        ...state,
        showDetails1: action.payload.showDetails,
        showCart1: false,
        showCheckout1: false,
      };
    case 'TOGGLE_CART_VIEW':
      return {
        ...state,
        showDetails: false,
        showCart: action.payload.showCart,
        showCart1: false,
        showCheckout: false,
      };
    case 'TOGGLE_CHECKOUT_VIEW':
      return {
        ...state,
        showDetails: false,
        showCart: false,
        showCheckout: action.payload.showCheckout,
      };
    case 'SLIDE_CART':
      return {
        ...state,
        open: action.payload.open,
        open1: false,
      };

    case 'SLIDE_CART1':
      return {
        ...state,
        open1: action.payload.open1,
        open: false,
        showDetails1: false,
        showDetails: false,
        showCart1: false,
        showCart: false,
        showCheckout1: false,
        showCheckout: false,
      };
    case 'OPEN_MENU':
      return {
        ...state,
        menu: action.payload.menu,
      };



    case 'TOGGLE_CHECKOUT_VIEW1':
      return {
        ...state,
        showDetails1: false,
        showCart1: false,
        showCheckout1: action.payload.showCheckout1,
      };
    case 'OPEN_MENU1':
      return {
        ...state,
        menu: action.payload.menu,
      };
    default:
      return state;
  }
}

export const DrawerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <DrawerContext.Provider value={{ state, dispatch }}>
      {children}
    </DrawerContext.Provider>
  );
};
