export type RootStackParamList = {
  Tabs: undefined; // No parameters expected for the Tabs screen
  SearchResults: { searchText: string }; // searchText parameter for SearchResults screen
  ProductDetails: { productId: string }; // productId parameter for ProductDetails screen
  ProductDetailsMock: { productId: string }; // productId parameter for ProductDetails screen
  // other routes...
};