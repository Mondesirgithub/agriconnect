import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation' 

const Payment = () => {

  const searchParams = useSearchParams()
  const message = String(searchParams.get('message'))
    
    return (
      <div className="flex flex-col px-30px pt-20px">
        <h3 className='text-center'>Paiement avec Airtel Money</h3>
        <br />
        <h5>Réponse du serveur d'airtel : {message}</h5>
      </div>
    );
  };
  
  export default Payment;  