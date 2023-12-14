import React from 'react';
import FeatureBlock from 'components/feature-block';

const data = [
  {
    id: 1,
    background: '#feeec8',
    title: 'Votre commande',
    description: 'Ajouter des matériels ou ... agricoles dans vos paniers (location et/ou achat)',
  },
  {
    id: 2,
    background: '#ceeffe',
    title: 'Confirmez votre commande',
    description:
      'Lisez bien les détails du produit afin de passer au paiement',
  },
  {
    id: 3,
    background: '#d4f8c4',
    title: 'Paiement',
    description: 'Passez à la facturation via airtel money pour l\'instant',
  },
  {
    id: 4,
    background: '#d8dafe',
    title: 'Livraison',
    description:
      'Votre commande a été envoyée au propriétaire afin qu\'il vous la livre',
  },
];

export default function HowItWorks() {
  return (
    <div className="flex w-full px-20px md:p-30px py-40px rounded border border-gray-300 bg-white">
      <div className="feature-block-wrapper w-full grid grid-cols-1 gap-x-30px gap-y-40px md:grid-cols-2 xl:grid-cols-4 xxl:gap-30px">
        {data.map((item, index) => (
          <FeatureBlock
            key={item.id}
            title={item.title}
            description={item.description}
            counterBg={item.background}
            counter={index + 1}
            className="feature-block"
          />
        ))}
      </div>
    </div>
  );
}
