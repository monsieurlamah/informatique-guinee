import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import ProductCard from "./components/products/ProductCard";
import getProducts, { IProductParams } from "@/actions/getProducts";
import NullData from "./components/NullData";

interface HomeProps {
  searchParams: IProductParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);

  if (products.length === 0) {
    return (
      <NullData title='Oops! Aucun produit trouvé. Cliquez sur "Tous" pour effacer les filtres' />
    );
  }

  //Fisher-Yates shuffle algorithm

  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i * 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  const shuffleProducts = shuffleArray(products);
  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div
          className="
          grid grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-4 
          xl:grid-cols-5 
          2xl:grid-cols-6 
          gap-4 sm:gap-8
          sm:text-lg xl:text-xl
        "
        >
          {shuffleProducts.map((product: any) => {
            return <ProductCard data={product} />;
          })}
        </div>
      </Container>
    </div>
  );
}
