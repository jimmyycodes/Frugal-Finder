interface StoreScraper {
  fetchProductData(productName: string): Promise<ProductData[]>;
}

interface ProductData {
  name: string;
  price: number;
  store: string;
  imgURL?: string;
}
