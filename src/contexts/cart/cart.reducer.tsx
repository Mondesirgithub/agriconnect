export const cartItemsTotalPrice = (items, coupon = null) => {
  let total = items.reduce((price, product) => {
    if (product.salePrice) {
      return price + product.salePrice * product.quantity;
    }
    return price + product.price * product.quantity;
  }, 0);
  const discount = coupon
    ? (total * Number(coupon.discountInPercent)) / 100
    : 0;

  return total - discount;
};

export const cartItemsTotalPrice1 = (items, coupon = null) => {
  let total = items.reduce((price, product) => {
    if (product.salePrice) {
      return price + product.salePrice * product.quantity;
    }
    return price + product.rental_amount * product.quantity;
  }, 0);
  const discount = coupon
    ? (total * Number(coupon.discountInPercent)) / 100
    : 0;

  return total - discount;
};
// cartItems, cartItemToAdd
const addItemToCart = (state, action) => {
  const existingCartItemIndex = state.items.findIndex(
    (item) => item.id === action.payload.id
  );

  if (existingCartItemIndex > -1) {
    const newState = [...state.items];
    newState[existingCartItemIndex].quantity += action.payload.quantity;
    return newState;
  }
  return [...state.items, action.payload];
};

const addItemToCart1 = (state, action) => {
  const existingCartItemIndex = state.items1.findIndex(
    (item) => item.id === action.payload.id
  );

  if (existingCartItemIndex > -1) {
    const newState = [...state.items1];
    newState[existingCartItemIndex].quantity += action.payload.quantity;
    return newState;
  }
  return [...state.items1, action.payload];
};

// cartItems, cartItemToRemove
const removeItemFromCart = (state, action) => {
  return state.items.reduce((acc, item) => {
    if (item.id === action.payload.id) {
      const newQuantity = item.quantity - action.payload.quantity;

      return newQuantity > 0
        ? [...acc, { ...item, quantity: newQuantity }]
        : [...acc];
    }
    return [...acc, item];
  }, []);
};

const removeItemFromCart1 = (state, action) => {
  return state.items1.reduce((acc, item) => {
    if (item.id === action.payload.id) {
      const newQuantity = item.quantity - action.payload.quantity;

      return newQuantity > 0
        ? [...acc, { ...item, quantity: newQuantity }]
        : [...acc];
    }
    return [...acc, item];
  }, []);
};

const clearItemFromCart = (state, action) => {
  return state.items.filter((item) => item.id !== action.payload.id);
};

const clearItemFromCart1 = (state, action) => {
  return state.items1.filter((item) => item.id !== action.payload.id);
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'REHYDRATE':
      return { ...state, ...action.payload };
      
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    case 'TOGGLE_CART1':
      return { ...state, isOpen1: !state.isOpen1 };
    case 'ADD_ITEM':
      return { ...state, items: addItemToCart(state, action) };
    case 'ADD_ITEM1':
      return { ...state, items1: addItemToCart1(state, action) };
    case 'REMOVE_ITEM':
      return { ...state, items: removeItemFromCart(state, action) };
    case 'REMOVE_ITEM1':
      return { ...state, items1: removeItemFromCart1(state, action) };
    case 'CLEAR_ITEM_FROM_CART':
      return { ...state, items: clearItemFromCart(state, action) };
    case 'CLEAR_ITEM_FROM_CART1':
      return { ...state, items: clearItemFromCart1(state, action) };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'CLEAR_CART1':
      return { ...state, items1: [] };
    case 'APPLY_COUPON':
      return { ...state, coupon: action.payload };
    case 'APPLY_COUPON1':
      return { ...state, coupon1: action.payload };
    case 'REMOVE_COUPON':
      return { ...state, coupon: null };
    case 'REMOVE_COUPON1':
      return { ...state, coupon1: null };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};
