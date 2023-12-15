import { useEffect } from 'react';
import Head from 'next/head';
import Layout from 'containers/layout/layout';
import { getProducts } from 'helpers/get-products';
import { getCategories } from 'helpers/get-categories';
import Payment from '../containers/Payment';


export default function Inscription() {

  return (
    <Layout>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="Description" content="Put your description here." />
        <title>AgriConnect</title>
      </Head>

      <Payment />
      
    </Layout>
  );
}

export async function getServerSideProps() {
  const products = await getProducts();
  const categories = await getCategories();
  return {
    props: {
      products,
      categories,
    },
  };
}
