import { useEffect } from 'react';
import Head from 'next/head';
import Layout from 'containers/layout/layout';
import { useRefScroll } from 'helpers/use-ref-scroll';
import { useSearch } from 'contexts/search/use-search';
import { getProducts } from 'helpers/get-products';
import { getCategories } from 'helpers/get-categories';
import { useCategory } from 'contexts/category/use-category';
import EnregistrerEquipement from '../containers/EnregistrerEquipement';


export default function Inscription() {
  const { elRef, scroll } = useRefScroll({
    percentOfElement: 0,
    percentOfContainer: 0,
    offsetPX: -100,
  });
  const { searchTerm } = useSearch();
  const { category } = useCategory();
  useEffect(() => {
    if (searchTerm || category) return scroll();
  }, [searchTerm, category, scroll]);

  return (
    <Layout>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="Description" content="Put your description here." />
        <title>Medsy Modern</title>
      </Head>

      <EnregistrerEquipement/>
      
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
