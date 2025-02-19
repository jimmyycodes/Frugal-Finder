import { View, Text, StyleSheet } from "react-native";
import StoreIcon from "./StoreIcon";

type StoreListProps = {
  stores: string[];
};

export default function StoreList({ stores }: StoreListProps) {
  const storesLower = stores.map((store) => store.toLowerCase());
  const storesUnique = new Set(storesLower);
  const storeIcons = storesToIcons(storesUnique);

  return (
    <View style={styles.container}>
      {storeIcons}
    </View>
  );
}

function storesToIcons(stores: Set<string>): JSX.Element[] {
  return Array.from(stores).map((store) => (
    <StoreIcon key={store} store={store} size={15} />
  ));
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 2,
    padding: 10,
  },
});
