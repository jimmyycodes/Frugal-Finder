import { View, StyleSheet } from "react-native";
import { WalmartIcon, SafeWayIcon, TraderJoesIcon, NoIcon } from "./SvgHandler";

type StoreIconProps = {

  size?: number;
  store?: string;
  overflow?: number;
};

export default function StoreIcon({ size=15, store, overflow }: StoreIconProps) {

  const storeLower = store?.toLowerCase();

  let icon = <NoIcon width={size} height={size} />;

  switch (storeLower) {
    case 'walmart':
      icon = <WalmartIcon width={size} height={size} />;
      break;
    case 'safeway':
      icon = <SafeWayIcon width={size} height={size} />;
      break;
    case 'trader joes':
      icon = <TraderJoesIcon width={size} height={size} />;
      break;
    case 'trader joe\'s':
      icon = <TraderJoesIcon width={size} height={size} />;
      break;
    case 'traderjoe\'s':
      icon = <TraderJoesIcon width={size} height={size} />;
      break;
    case 'traderjoes':
      icon = <TraderJoesIcon width={size} height={size} />;
      break;
  }


  return (
    <View style={styles.container}>
      {icon}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    padding: 7,
    borderWidth: .7,
    borderColor: '#78FF00',
  },
});