// Define the types for the navigation stack parameters
export type RootStackParamList = {
  Tabs: undefined; // No parameters expected for the Tabs screen
  SearchResults: { searchText: string }; // searchText parameter for SearchResults screen
  // other routes...
};