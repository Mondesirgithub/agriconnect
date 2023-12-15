import React, { useState, useEffect } from 'react';
import Input from 'components/input';
import Button from 'components/button';
import {
    TextBoxCommonBase,
    InputBase,
    TextBoxEnable,
  } from 'components/utils/theme';




const VenteEquipement = () => {
    const [equipements, setEquipements] = useState([]);
    const [checkedEquipements, setCheckedEquipements] = useState({});
    const [checkoutDetails, setCheckoutDetails] = useState({
      amount: 0,
      stock: 0
    });
    const [error, setError] = useState('')

    
    const classNames =
    InputBase +
    ' ' +
    TextBoxCommonBase +
    ' ' + TextBoxEnable;
  
    useEffect(() => {
      const fetchEquipements = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            const response = await fetch('https://agriconnectapi.pythonanywhere.com/agriculture/equipementsUser', {
                method: 'GET', 
                headers: {
                    'Authorization' : `Bearer ${user.token}`
                }
            }); // Remplacez par votre API
            const data = await response.json();
            setEquipements(data);
        } catch (error) {
          console.error('Erreur lors du chargement des équipements', error);
        }
      };
  
      fetchEquipements();
    }, []);

  
    const handleCheckoutChange = async (equipementId) => {
        const isChecked = checkedEquipements[equipementId];
      
        try {
          const user = JSON.parse(localStorage.getItem('user'));

          if (isChecked) {
            // Appeler l'API pour "Ne pas mettre en location"
            const res = await fetch(`https://agriconnectapi.pythonanywhere.com/agriculture/unsent_equipement/${equipementId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
              },
              body: JSON.stringify({ ...checkoutDetails }),
            });
            const data = await res.json()
            console.log(data)
          }
      
          // Mettre à jour l'état local
          setCheckedEquipements((prevChecked) => ({
            ...prevChecked,
            [equipementId]: !prevChecked[equipementId],
          }));
      
          // Vous pouvez également rafraîchir la liste des équipements ici si nécessaire
        } catch (error) {
          console.error('Erreur lors de la gestion de la location', error);
        }
      };
      
  
    const handleCheckoutDetailsChange = (e) => {
      const { name, value } = e.target;

      setCheckoutDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    };
  
    const handleCheckoutSubmit = async (equipementId) => {
      const isChecked = checkedEquipements[equipementId];
  
      if (isChecked) {
        try {
            const user = JSON.parse(localStorage.getItem('user'))
          const res = await fetch(`https://agriconnectapi.pythonanywhere.com/agriculture/sent_equipement/${equipementId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
               'Authorization' : `Bearer ${user.token}`
            
            },
            body: JSON.stringify({ ...checkoutDetails }),
          });

          const data = await res.json()
          setEquipements((prevEquipements) =>
            prevEquipements.map((equipement) =>
              equipement.id === equipementId
                ? { ...equipement, isRented: true }
                : equipement
            )
          );
  
          setCheckoutDetails({
            price: 0,
            stock: 0
          });

          window.location.href = "http://localhost:3000/vendre"
        } catch (error) {
          console.error('Erreur lors de la soumission du checkout', error);
        }
      }

    };
  
    return (
      <div className="flex flex-col px-30px pt-20px">
        <span className="flex font-semibold text-gray-900 text-18px mb-15px">Mettre un équipement en vente</span>
        {
          equipements.length === 0 && "Pas de matériels ou équipements agricoles enregistrés pour l'instant"
        }
        
        {equipements.map((equipement) => (
          <div key={equipement.id} className='mb-50px'>
            <h3>{equipement.name} </h3>
            <img
            width={100}
            height={100}
            src={"https://agriconnectapi.pythonanywhere.com"+equipement.image}
            alt={'Alt ' + equipement.name}
            className="object-cover"
            />
            <label style={{cursor: 'pointer'}}>
            {checkedEquipements[equipement.id] || equipement.is_sent ? 'Ne plus mettre en vente' : 'Mettre en vente'}
              <input
                type="checkbox"
                checked={checkedEquipements[equipement.id] || false}
                onChange={() => handleCheckoutChange(equipement.id)}
              />
            </label>

            {checkedEquipements[equipement.id] && (
              <div>
                <label>
                  Prix de vente:
                <Input
                    placeholder="Prix de vente"
                    type="number"
                    className="mb-10px"
                    name="price"
                    value={checkoutDetails.price}
                    onChange={handleCheckoutDetailsChange}
                />
                </label>
                <label>
                  Nombre d'exemplaires à mettre en vente:
                <Input
                    placeholder="Nombre d'exemplaires"
                    type="number"
                    className="mb-10px"
                    name="stock"
                    value={checkoutDetails.stock}
                    onChange={handleCheckoutDetailsChange}
                />
                </label>

                
                <Button className="big w-full" onClick={() => handleCheckoutSubmit(equipement.id)}>
                Mettre en vente
                </Button>
                <p className='text-danger'>{error}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  export default VenteEquipement;  