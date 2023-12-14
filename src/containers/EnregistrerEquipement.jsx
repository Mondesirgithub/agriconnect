import React, { useState, useEffect } from 'react';
import Button from 'components/button';
import Input from 'components/input';
import Textarea from 'components/textarea';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import {
    TextBoxCommonBase,
    InputBase,
    TextBoxEnable,
  } from 'components/utils/theme';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const initialState = {
  name: '',
  description: '',
  address: '',
  image: '',
  category: '', // Assurez-vous que ce champ correspond à une catégorie valide
};


export default function SigningEquipment() {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const classNames =
    InputBase +
    ' ' +
    TextBoxCommonBase +
    ' ' + TextBoxEnable;


  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8000/agriculture/categories/');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories : ', error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []); 

  const onChange = (e) => {
    const { value, name } = e.currentTarget;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChange = (address) => {
    setFormData({ ...formData, address });
  };

  const handleSelect = async (address) => {
    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
      // console.log('Address:', address);
      // console.log('Latitude and Longitude:', latLng);
    } catch (error) {
      console.error('Error selecting address:', error);
    }
  };


  const submitForm = async () => {
    const { name, description, address, image, category } = formData;
    console.log("image ==> ", image)
    setLoading(true);

    const user = JSON.parse(localStorage.getItem('user'))
    const form = new FormData();

    form.append('name', name);
    form.append('description', description);
    form.append('address', address);
    form.append('image', image);
    form.append('categorie', category);

    try {
      const res = await fetch('http://localhost:8000/agriculture/register_equipement/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
        body: form,
      });

      const data = await res.json();
      toast.success('Enregistrement réussi')
      window.location.href = "/"

    } catch (erreur) {
      console.error('Erreur ==> ', erreur);
    }

    setLoading(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setFormData({...formData, image: file})
    }
  };
  return (
    <div className="flex flex-col px-30px pt-20px">
      <span className="flex font-semibold text-gray-900 text-18px mb-15px">
        Inscription d'un nouveau matériel ... agricole
      </span>
      <div className="flex flex-col">
        <Input
          placeholder="Nom"
          className="mb-10px"
          name="name"
          value={formData.name}
          onChange={onChange}
        />
        <Textarea
          placeholder="Description"
          className="mb-10px"
          name="description"
          value={formData.description}
          onChange={onChange}
        />
        <PlacesAutocomplete
            value={formData.address}
            onChange={handleChange}
            onSelect={handleSelect}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
                <Input
                {...getInputProps({
                    placeholder: "Entrer la localisation",
                    name: 'address',
                })}
                />
                <div>
                {loading ? <div>Chargement...</div> : null}
                {suggestions.map((suggestion, i) => {
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
        <Input
          className="mb-10px mt-10px"
          name="image"
          type="file"
          onChange={handleFileChange}
        />
        <select
        className={classNames}
        name="category"
        value={formData.category}
        onChange={onChange}
        >
        <option value="">Sélectionnez une catégorie</option>
        {categories && categories.map(category => (
            <option key={category.id} value={category.id}>
            {category.name}
            </option>
        ))}
        </select>
        <div className="flex flex-col mt-15px">
          <Button className="big w-full" onClick={submitForm} loading={loading}>
            Enregsitrer
          </Button>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}
