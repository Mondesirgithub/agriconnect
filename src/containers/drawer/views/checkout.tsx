"use client";
import { useContext, useEffect, useState } from 'react';
import { PatternFormat } from 'react-number-format';
import { DrawerContext } from 'contexts/drawer/drawer.provider';
import { Scrollbar } from 'components/scrollbar';
import ArrowLeft from 'assets/icons/arrow-left';
import Input from 'components/input';
import Button from 'components/button';
import { useCart } from 'contexts/cart/cart.provider';
import PlacesAutocomplete, { geocodeByAddress, getLatLng, Suggestion } from 'react-places-autocomplete';
import OrderSubmit from './order-submit';
import {
  InputBase,
  TextBoxCommonBase,
  TextBoxEnable,
} from 'components/utils/theme';

const initialState = {
  phone_number: '',
  name: '',
  email: '',
  address: '',
  postal_code: '',
  suite: '',
};

export default function Checkout() {
  const { state, dispatch } = useContext(DrawerContext);
  const [formData, setFormData] = useState(initialState);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { items, calculatePrice, calculatePrice1, clearCart, items1, clearCart1 } = useCart();
  const [user , setUser] = useState(null)


  useEffect(() => {
    setUser(localStorage.getItem('user'))
  }, [])

  const handleChange = (address: string) => {
    setFormData({ ...formData, address });
  };

  const handleSelect = async (address: string) => {
    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
      // console.log('Address:', address);
      // console.log('Latitude and Longitude:', latLng);
    } catch (error) {
      console.error('Error selecting address:', error);
    }
  };

  const hideCheckout = () => {
    dispatch({
      type: 'TOGGLE_CHECKOUT_VIEW',
      payload: {
        showCheckout: false,
      },
    });
  };

  const submitOrder = async () => {
    const { address,phone_number } = formData;

    const numericValue = phone_number.replace(/\D/g, '');

    // Extraire les parties nécessaires
    const countryCode = numericValue.substring(0, 3);
    const areaCode = numericValue.substring(3, 5);
    const firstPart = numericValue.substring(5, 8);
    const secondPart = numericValue.substring(8, 10);
    const thirdPart = numericValue.substring(10);
    
    // Format final
    const goodformattedValue = `+${countryCode}${areaCode}${firstPart}${secondPart}${thirdPart}`;


    if (!phone_number.trim()) {
      setError({
        field: 'phone_number',
        message: 'Numéro de téléphone est obligatoire',
      });
      return;
    }

    setLoading(true);
    const form = new FormData();

    // Ajouter les champs à FormData
    form.append('items', state.openLocation ? JSON.stringify(items1) : JSON.stringify(items));
    form.append('name', user && JSON.parse(user).last_name);
    form.append('address', address);
    form.append('phone_number', goodformattedValue);
    form.append('email', user && JSON.parse(user).username);
    form.append('openLocation', state.openLocation);
    form.append(
      'bill_amount',
      state.openLocation ? calculatePrice1() : calculatePrice()
    );
    const res = await fetch('https://agriconnectapi.pythonanywhere.com/agriculture/checkout/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user && JSON.parse(user).token}`,
      },
      body: form,
    });
    
    const data = await res.json()
    if (res.status === 200) {
      setSuccess(true);
      if(state.openLocation){
        clearCart1()
      }else{
        clearCart();
      }
    } else {
      setError(true);
    }
    setLoading(false);
  };

  const onChange = (e) => {
    const { value, name } = e.currentTarget;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  if (success) {

    return <OrderSubmit />;
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full flex justify-center relative px-30px py-20px">
        <button
          className="w-auto h-10 flex items-center justify-center text-gray-500 absolute top-half -mt-20px left-30px transition duration-300 focus:outline-none hover:text-gray-900"
          onClick={hideCheckout}
          aria-label="close"
        >
          <ArrowLeft />
        </button>
        <h2 className="font-bold text-24px m-0">Paiement {state.openLocation ? "(Location)" : "(Achat)"}</h2>
      </div>

      <Scrollbar className="checkout-scrollbar flex-grow">
        <div className="flex flex-col px-30px pt-20px">
          <div className="flex flex-col mb-45px">
            <span className="flex font-semibold text-gray-900 text-18px mb-15px">
              Informations de contacts
            </span>
            <Input
              placeholder="Nom"
              className="mb-10px"
              name="name"
              disabled={true}             
              value={user && JSON.parse(user).last_name+" "+JSON.parse(user).first_name}
              onChange={onChange}
            />

            <PatternFormat
              format="+242 (##) ### ## ##"
              mask="_"
              placeholder="Numéro airtel pour le paiement"
              className={`${InputBase} ${TextBoxCommonBase} ${TextBoxEnable}`}
              value={formData.phone_number}
              onValueChange={({ formattedValue }) => {


                setFormData({
                  ...formData,
                  phone_number: formattedValue,
                });
              }}
            />
            {error?.field === 'phone_number' && (
              <p className="text-12px font-semibold text-error pt-10px pl-15px">
                {error.message}
              </p>
            )}
            <Input
              placeholder="Email Address"
              name="email"
              value={user && JSON.parse(user).username}
              disabled={true}
              onChange={onChange}
              className="mt-15px"
            />
          </div>

          <div className="flex flex-col">
            <span className="flex font-semibold text-gray-900 text-18px mb-15px">
              Addresse
            </span>
            {/* <Input
              placeholder="Name"
              className="mb-10px"
              name="name"
              value={formData.name}
              onChange={onChange}
            /> */}

            {/* <Textarea
              placeholder="Entrer l'adresse de livraison"
              className="mb-10px"
              name="address"
              value={formData.address}
              onChange={onChange}
            /> */}
            <PlacesAutocomplete
              value={formData.address}
              onChange={handleChange}
              onSelect={handleSelect}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <Input
                    {...getInputProps({
                      placeholder: "Entrer l'adresse de livraison",
                      name: 'address',
                    })}
                  />
                  <div>
                    {loading ? <div>Chargement...</div> : null}
                    {suggestions.map((suggestion: Suggestion, i) => {
                      const style = {
                        backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
                      };
                      return (
                        <div key={i} {...getSuggestionItemProps(suggestion, { style })}>
                          {suggestion.description}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </div>
        </div>
      </Scrollbar>

      <div className="flex flex-col p-30px">
        <Button className="big w-full" onClick={submitOrder} loading={loading}>
          Commander maintenant
        </Button>
      </div>
    </div>
  );
}
