import { PatternFormat } from 'react-number-format';
import Input from 'components/input';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import {
    InputBase,
    TextBoxCommonBase,
    TextBoxEnable,
  } from 'components/utils/theme';
import { useState } from 'react';
import Button from 'components/button';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
    telephone: '',
    nom: '',
    prenom: '',
    email: '',
    adresse: '',
    password1: '',
    password2: '',
    culture: ''
};

export default function Signing() {
    const [formData, setFormData] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const router = useRouter()

    const handleChange = (adresse) => {
      setFormData({ ...formData, adresse });
    };
  
    const handleSelect = async (adresse) => {
      try {
        const results = await geocodeByAddress(adresse);
        const latLng = await getLatLng(results[0]);
        // console.log('Address:', address);
        // console.log('Latitude and Longitude:', latLng);
      } catch (error) {
        console.error('Error selecting address:', error);
      }
    };

    
    const onChange = (e) => {
        const { value, name } = e.currentTarget;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const submitForm = async () => {
        const { nom, prenom, adresse, telephone, culture, email, password1, password2 } = formData;
        if (!telephone.trim()) {
          setError({
            field: 'telephone',
            message: 'Le numéro de téléphone est obligatoire',
          });
          return;
        }

        if(password1 !== password2){
            setError({
                field: 'password2',
                message: 'Les deux mots de passe ne correspondent pas',
              });
            return;
        }
    
        setLoading(true);

        try{
            const res = await fetch('https://agriconnectapi.pythonanywhere.com/comptes/register/user/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  adresse: adresse,
                  telephone: telephone,
                  nom: nom,
                  culture: culture,
                  email: email,
                  username: email,
                  password: password1,
                  prenom: prenom,
                }),
              });
      
              const data = await res.json()
              localStorage.setItem('user', JSON.stringify(data))

              toast.success('Création de compte réussie !', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                router.push('/')
        }catch(erreur){
            console.error("Erreur ==> ", erreur)
        }

        setLoading(false);
      };

    return (
        <div className="flex flex-col px-30px pt-20px">
          <span className="flex font-semibold text-gray-900 text-18px mb-15px">
            Inscription d'un agriculteur
          </span>
          <div className="flex flex-col">
            <Input
              placeholder="Nom"
              className="mb-10px"
              name="nom"
              value={formData.nom}
              onChange={onChange}
            />
            <Input
              placeholder="Prénom"
              className="mb-10px"
              name="prenom"
              value={formData.prenom}
              onChange={onChange}
            />

        <PlacesAutocomplete
            value={formData.adresse}
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
              placeholder="Culture"
              className="mb-10px mt-4"
              name="culture"
              value={formData.culture}
              onChange={onChange}
            />

            <div className="flex flex-col mb-45px">
                <PatternFormat
                format="+242 (##) ### ## ##"
                mask="_"
                placeholder="Numéro de télephone"
                className={`${InputBase} ${TextBoxCommonBase} ${TextBoxEnable}`}
                value={formData.telephone}
                onValueChange={({ formattedValue }) => {
                    setFormData({
                    ...formData,
                    telephone: formattedValue,
                    });
                }}
                />
                {error?.field === 'telephone' && (
                <p className="text-12px font-semibold text-error pt-10px pl-15px">
                    {error.message}
                </p>
                )}
                <Input
                placeholder="Adresse Email"
                name="email"
                value={formData.email}
                onChange={onChange}
                className="mt-15px"
                />
                <Input
                placeholder="Mot de passe"
                myType="password"
                name="password1"
                value={formData.password1}
                onChange={onChange}
                className="mt-15px"
                />
                <Input
                placeholder="Confirmez votre mot de passe"
                name="password2"
                myType="password"
                value={formData.password2}
                onChange={onChange}
                className="mt-15px"
                />
            </div>
            <div className="flex flex-col p-30px">
                <Button className="big w-full" onClick={submitForm} loading={loading}>
                S'inscrire
                </Button>
            </div>
          </div>

        </div>
    );
  }