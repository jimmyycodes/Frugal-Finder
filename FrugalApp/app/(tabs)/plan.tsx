import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect } from "react";
import StoreList from "@/components/Icons/StoreList";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import useCartStore from "@/services/cartStore";
// import usePlanStore from "@/services/planStore";
import { useState } from "react";
import { genLongItems } from "@/constants/Tools";
// import { mockItems } from "@/constants/MockVars";

//TODO: Persistent Plan storage
export default function plan() {
  // Define vars
  // const planStore = usePlanStore((state) => state.plan);
  // const removeFromPlan = usePlanStore((state) => state.removeFromPlan);
  // const addToPlanMany = usePlanStore((state) => state.addToPlanMany);
  // const clearPlan = usePlanStore((state) => state.clearPlan);
  const clearCart = useCartStore((state) => state.clearCart);

  // Hooks
  const [items, setItems] = useState(new Array<JSX.Element>());
  const [PlanTotal, setPlanTotal] = useState(0);
  const [time, setTime] = useState("N/A");
  const [mapRender, setMapRender] = useState<JSX.Element | undefined>(
    undefined
  );
  const [stops, setStops] = useState<string[]>([]);

  // Functions
  function handleRemove(key: string) {
    // removeFromPlan(key);

    // remove item from UI
    setItems((prev) => prev.filter((item) => item.key !== key));
  }

  function secondButton() {
    return (
      <PrimaryButton
        onPress={() => {
          const cartItems = useCartStore.getState().cart;

          // sort cart items in order of stops and add to plan
          const sortedItems = [...cartItems].sort((a, b) => {
            return stops.indexOf(b.store) - stops.indexOf(a.store);
          });

          setItems(genLongItems(sortedItems, handleRemove, () => null, false));
        }}
        title="SHOP"
      />
    );
  }

  function firstButton() {
    return (
      <PrimaryButton
        onPress={async () => {
          const cartItems = useCartStore.getState().cart;
          if (cartItems.length === 0) {
            alert("Please add items to your cart first");
            return;
          }

          // Handle API request here
          await createPlan();
          setButton("second");
        }}
        title="Create A Plan!"
      />
    );
  }

  const [button, setButton] = useState("first");

  // Effects

  // TODO: This is a temporary solution to update the plan items. It should be replaced with a more efficient solution
  // not using genLongItems for every update
  useEffect(() => {
    setRenderState(activeRender());
  }, [items]);

  useEffect(() => {
    // refresh prefrence render if button changes
    setRenderState(prefrencesRender());
  }, [button]);

  async function createPlan() {
    //TODO: David, call maps API here put JSX of map in setmapRender()
    setMapRender(
      <Text style={{ color: "white", textAlign: "center" }}>Map Render</Text>
    );

    // Set time estimate from maps API
    setTime("1hr 30min");

    const cartItems = useCartStore.getState().cart;

    // Set total cost from cart items
    let calcTotal = 0;
    cartItems.forEach((item) => {
      calcTotal += item.price;
    });

    setPlanTotal(calcTotal);

    const storeList = cartItems.map((item) => item.store);
    setStops(storeList);

    // addToPlanMany(sortedItems);
  }

  function canclePlan() {
    // clearPlan();
    setButton("first");
    setPlanTotal(0);
    setStops([]);
    setMapRender(undefined);
    setTime("N/A");
  }

  function prefrencesRender() {
    return (
      <View style={{ height: 360 }}>
        {button === "first" ? undefined : (
          <View>
            <SecondaryButton
              onPress={() => alert("Feature not implemented")}
              title="Want to shorten the time?"
            />

            <SecondaryButton onPress={canclePlan} title="Cancle Plan" />
          </View>
        )}

        <View style={{ marginTop: "auto", marginBottom: 20 }}>
          {button === "first" ? firstButton() : secondButton()}
        </View>
      </View>
    );
  }

  function activeRender() {
    return (
      <View style={{ marginTop: 20 }}>
        <View style={{alignItems: "center"}}>{items}</View>
        <PrimaryButton
          onPress={() => {
            setRenderState(prefrencesRender());
            // clearPlan();
            clearCart();
            setButton("first");
            setTime("N/A");
            setPlanTotal(0);
            setStops([]);
            setMapRender(undefined);
          }}
          title="End Trip"
        />
      </View>
    );
  }

  const [renderState, setRenderState] = useState(prefrencesRender());

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.planContainer}>
          <View style={styles.estContainer}>
            <View style={styles.estText}>
              <Text style={styles.estTitle}>Time Estimate:</Text>
              <Text style={styles.estValue}>{time}</Text>
            </View>

            <View style={styles.estText}>
              <Text style={styles.estTitle}>Cost Estimate:</Text>
              <Text style={styles.estValue}>{"$" + PlanTotal.toFixed(2)}</Text>
            </View>
          </View>

          <View style={styles.planBlockContainer}>
            <PlanBlock mapRender={mapRender} stops={stops} />
          </View>
        </View>
        {renderState}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1, // Ensures ScrollView resizes with content
    alignItems: "center",
  },
  titleText: {
    fontFamily: "Poppins",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  planContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 5,
    width: "90%",
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
  },
  estContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  estText: {
    alignItems: "center",
  },
  estTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  estValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6CC51D",
  },
  planBlockContainer: {
    marginTop: 20,
  },
});

function PlanBlock({
  mapRender,
  stops,
}: {
  mapRender?: JSX.Element;
  stops: string[];
}) {
  // Render the maps API here
  const Map = () => {
    const map = mapRender ? (
      mapRender
    ) : (
      <Text style={planBlockStyle.mapText}>Create a Plan to see your map</Text>
    );

    return <View style={planBlockStyle.mapContainer}>{map}</View>;
  };

  return (
    <View style={planBlockStyle.container}>
      <Map />
      <View style={planBlockStyle.infoBox}>
        <Text style={planBlockStyle.infoTitle}>Stops:</Text>

        <View style={planBlockStyle.storeList}>
          <StoreList stores={stops} />
        </View>
      </View>
    </View>
  );
}

const planBlockStyle = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#DCDCDC",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#6CC51D",
  },
  mapContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "black",
    borderRadius: 5,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  mapText: {
    marginTop: 80,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  infoBox: {
    borderRadius: 5,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    width: "100%",
  },
  infoText: {
    alignItems: "center",
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  infoValue: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#6CC51D",
  },
  storeList: {
    width: "auto",
    marginEnd: "auto",
    marginLeft: 10,
  },
});
