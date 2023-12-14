import Head from 'next/head';
import Layout from 'containers/layout/layout';
import Accordion from 'components/accordion';

const accordionData = [
  {
    id: '1',
    label: 'Comment contacter le service client ?',
    children:
      'Notre équipe d\'expérience client est disponible 6 jours par semaine et nous proposons différentes façons de nous contacter. Nous sommes disponibles par e-mail et chat. Nous nous efforçons de répondre rapidement, vous n\'avez donc pas à attendre trop longtemps pour une réponse !',
  },
  {
    id: '2',
    label: 'L\'installation de l\'application a échoué, comment mettre à jour les informations système ?',
    children:
      'Veuillez lire attentivement la documentation. Nous proposons également des tutoriels vidéo en ligne concernant ce problème. Si le problème persiste, veuillez ouvrir un ticket dans le forum de support.',
  },
  {
    id: '3',
    label: 'Le site web met du temps à répondre, comment améliorer cela ?',
    children:
      'Tout d\'abord, veuillez vérifier votre connexion internet. Nous proposons également des tutoriels vidéo en ligne concernant ce problème. Si le problème persiste, veuillez ouvrir un ticket dans le forum de support.',
  },
  {
    id: '4',
    label: 'Comment créer un compte ?',
    children:
      'Si vous souhaitez ouvrir un compte à usage personnel, vous pouvez le faire par téléphone ou en ligne. L\'ouverture d\'un compte en ligne ne devrait prendre que quelques minutes.',
  },
];

export default function FAQ() {
  return (
    <Layout>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="Description" content="Put your description here." />
        <title>F.A.Q</title>
      </Head>

      <div className="py-35px px-0">
        <h3 className="w-full flex justify-center mb-30px text-24px text-gray-900 text-center font-semibold">
          F.A.Q
        </h3>
        <Accordion items={accordionData} />
      </div>
    </Layout>
  );
}
