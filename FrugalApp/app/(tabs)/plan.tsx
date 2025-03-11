import { View, Text, StyleSheet, ScrollView, Alert, Platform } from "react-native";
import React, { useEffect } from "react";
import StoreList from "@/components/Icons/StoreList";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import useCartStore from "@/services/cartStore";
// import usePlanStore from "@/services/planStore";
import { useState } from "react";
import { genLongItems } from "@/constants/Tools";
// import { mockItems } from "@/constants/MockVars";
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import * as Linking from 'expo-linking';

// Store location data with updated coordinates
const storeLocations = {
  "University District Safeway": { latitude: 47.664352878628705, longitude: -122.31410279465213 },
  "QFC": { latitude: 47.662096112268294, longitude: -122.29686549606923 },
  "Trader Joe's": { latitude: 47.66272852231663, longitude: -122.31775235395698 },
  "Whole Foods": { latitude: 47.67518674122565, longitude: -122.31578415255098 },
  // Add aliases for common store names in the data that might not match exactly
  "Safeway": { latitude: 47.664352878628705, longitude: -122.31410279465213 },
  "Trader Joes": { latitude: 47.66272852231663, longitude: -122.31775235395698 },
};

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
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
  const [storesWithDistance, setStoresWithDistance] = useState<Array<{store: string, distance: number}>>([]);
  const [totalDistanceMiles, setTotalDistanceMiles] = useState<number>(0);

  // Functions
  function handleRemove(key: string) {
    // removeFromPlan(key);

    // remove item from UI
    setItems((prev) => prev.filter((item) => item.key !== key));
  }

  // Add this function to handle opening external maps
  function openExternalMaps() {
    if (!userLocation || stops.length === 0) {
      Alert.alert("Error", "Cannot open maps - location or stops are missing");
      return;
    }
    
    try {
      // Get coordinates for all stops
      const stopCoordinates = stops.map(storeName => {
        return storeLocations[storeName as keyof typeof storeLocations];
      }).filter(coords => coords !== undefined);
      
      if (stopCoordinates.length === 0) {
        Alert.alert("Error", "No valid store coordinates found");
        return;
      }
      
      // For iOS, create Apple Maps URL
      if (Platform.OS === 'ios') {
        // Format: http://maps.apple.com/?daddr=lat1,long1&daddr=lat2,long2
        let appleMapsUrl = 'http://maps.apple.com/?saddr=';
        
        // Add current location as source
        appleMapsUrl += `${userLocation.coords.latitude},${userLocation.coords.longitude}`;
        
        // Add destinations
        stopCoordinates.forEach(coords => {
          appleMapsUrl += `&daddr=${coords.latitude},${coords.longitude}`;
        });
        
        Linking.openURL(appleMapsUrl);
      }
      // For Android, create Google Maps URL
      else {
        // Format: https://www.google.com/maps/dir/?api=1&origin=lat,lng&destination=lat,lng&waypoints=lat,lng|lat,lng
        let googleMapsUrl = 'https://www.google.com/maps/dir/?api=1';
        
        // Add origin (current location)
        googleMapsUrl += `&origin=${userLocation.coords.latitude},${userLocation.coords.longitude}`;
        
        // Last stop is the destination
        const lastStop = stopCoordinates[stopCoordinates.length - 1];
        googleMapsUrl += `&destination=${lastStop.latitude},${lastStop.longitude}`;
        
        // Add intermediate stops as waypoints
        if (stopCoordinates.length > 1) {
          googleMapsUrl += '&waypoints=';
          for (let i = 0; i < stopCoordinates.length - 1; i++) {
            googleMapsUrl += `${stopCoordinates[i].latitude},${stopCoordinates[i].longitude}`;
            if (i < stopCoordinates.length - 2) googleMapsUrl += '|';
          }
        }
        
        Linking.openURL(googleMapsUrl);
      }
    } catch (error) {
      console.error("Error opening maps:", error);
      Alert.alert("Error", "Could not open maps app");
    }
  }

  // Modify the secondButton function to use the new openExternalMaps function
  function secondButton() {
    return (
      <PrimaryButton
        onPress={() => {
          // First open external maps
          openExternalMaps();
          
          // Then sort cart items and display them in the UI
          const cartItems = useCartStore.getState().cart;
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
    try {
      // Request location permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required for time estimation.');
        setMapRender(
          <Text style={{ color: "white", textAlign: "center" }}>Map unavailable - location permission denied</Text>
        );
        setTime("Unknown (location access denied)");
        return;
      }

      // Get current location
      const location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);

      const cartItems = useCartStore.getState().cart;
      
      // Extract unique stores from cart items
      const uniqueStores = Array.from(new Set(cartItems.map(item => item.store)));
      setStops(uniqueStores);
      
      // Map stores to their coordinates
      const storesWithCoordinates = uniqueStores.map(store => {
        const storeCoords = storeLocations[store as keyof typeof storeLocations];
        
        if (!storeCoords) {
          console.log(`Store coordinates not found for: ${store}`);
          return {
            store,
            coordinates: {
              latitude: location.coords.latitude + (Math.random() * 0.01),
              longitude: location.coords.longitude + (Math.random() * 0.01)
            }
          };
        }
        
        return { store, coordinates: storeCoords };
      });
      
      // Calculate rough distances to determine stop order
      const storesWithDistances = storesWithCoordinates.map(store => {
        const distance = calculateDistance(
          location.coords.latitude, 
          location.coords.longitude, 
          store.coordinates.latitude, 
          store.coordinates.longitude
        );
        return { ...store, distance };
      });
      
      // Sort by distance for a simple optimization
      storesWithDistances.sort((a, b) => a.distance - b.distance);
      
      // Update stops based on distance-sorted stores
      setStops(storesWithDistances.map(s => s.store));
      
      // Calculate rough time estimate (will be more accurate when user opens maps app)
      let totalDistanceMiles = 0;
      let drivingTimeMinutes = 0;
      
      // First leg: user to first store
      if (storesWithDistances.length > 0) {
        const firstStoreDistance = storesWithDistances[0].distance;
        console.log(`Distance to first store: ${firstStoreDistance.toFixed(2)} miles`);
        totalDistanceMiles += firstStoreDistance;
        
        // Use the Seattle-specific formula
        drivingTimeMinutes += getSeattleDrivingTimeMinutes(firstStoreDistance);
        
        // Add parking time for first store
        drivingTimeMinutes += 3;
        
        // Remaining legs: store to store
        for (let i = 0; i < storesWithDistances.length - 1; i++) {
          const storeToStoreDist = calculateDistance(
            storesWithDistances[i].coordinates.latitude,
            storesWithDistances[i].coordinates.longitude,
            storesWithDistances[i+1].coordinates.latitude,
            storesWithDistances[i+1].coordinates.longitude
          );
          console.log(`Distance from store ${i} to store ${i+1}: ${storeToStoreDist.toFixed(2)} miles`);
          totalDistanceMiles += storeToStoreDist;
          
          // Use Seattle-specific formula for this leg
          drivingTimeMinutes += getSeattleDrivingTimeMinutes(storeToStoreDist);
          
          // Add parking time for next store
          drivingTimeMinutes += 3;
        }
      }
      
      console.log(`Total distance: ${totalDistanceMiles.toFixed(2)} miles`);
      console.log(`Estimated driving time: ${drivingTimeMinutes.toFixed(2)} minutes`);
      
      // Save total distance for display
      setTotalDistanceMiles(totalDistanceMiles);
      
      // Cap the number of items per store at 20 for time calculation
      const uniqueItemsPerStore = uniqueStores.map(store => {
        return Math.min(cartItems.filter(item => item.store === store).length, 20);
      });
      
      // More reasonable shopping time: 15 min base + 1 min per item
      const shoppingTimeMinutes = uniqueStores.length * 15 + uniqueItemsPerStore.reduce((a, b) => a + b, 0);
      console.log(`Estimated shopping time: ${shoppingTimeMinutes} minutes`);
      
      // Total time = driving + shopping
      const totalTimeMinutes = Math.round(drivingTimeMinutes + shoppingTimeMinutes);
      setTime(formatTime(totalTimeMinutes));
      
      // Update distances info with the corrected total distance
      setStoresWithDistance(storesWithDistances.map(s => ({ 
        store: s.store, 
        distance: s.distance 
      })));
      
      // Render a map preview with markers
      setMapRender(
        <MapView
          style={{ width: '100%', height: '100%' }}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/* User location marker */}
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="You are here"
            pinColor="blue"
          />
          
          {/* Store markers */}
          {storesWithDistances.map((store, index: number) => (
            <Marker
              key={index}
              coordinate={{
                latitude: store.coordinates.latitude,
                longitude: store.coordinates.longitude,
              }}
              title={store.store}
              description={`Stop #${index + 1}`}
              pinColor="red"
            />
          ))}
        </MapView>
      );

      // Set total cost from cart items
      let calcTotal = 0;
      cartItems.forEach((item) => {
        calcTotal += item.price;
      });

      setPlanTotal(calcTotal);
      
      setButton("second");
    } catch (error) {
      console.error("Error creating plan:", error);
      Alert.alert("Error", "Failed to create plan. Please try again.");
      setMapRender(
        <Text style={{ color: "white", textAlign: "center" }}>Error loading map</Text>
      );
      setTime("Error");
    }
  }
  
  // Helper function to calculate distance between two points using Haversine formula
  function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 3958.8; // Earth radius in miles
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1); // Fixed: was using lat2-lon2 by mistake
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in miles
  }
  
  function toRadians(degrees: number) {
    return degrees * Math.PI / 180;
  }
  
  function getSeattleDrivingTimeMinutes(distanceMiles: number) {
    // Seattle-specific factors:
    // - Average Seattle traffic speed: ~15 mph in dense areas (0.25 miles/minute)
    // - Traffic lights/congestion factor: 1.5x longer than pure distance would suggest
    // - Parking factor: Add 3 minutes per store for finding parking
    
    const trafficSpeedMilesPerMinute = 0.25; // 15 mph converted to miles per minute
    const congestionFactor = 1.5;
    
    // Base drive time based on distance at Seattle speeds
    const baseTimeMinutes = distanceMiles / trafficSpeedMilesPerMinute;
    
    // Apply congestion factor
    const timeWithCongestion = baseTimeMinutes * congestionFactor;
    
    return timeWithCongestion;
  }
  
  function formatTime(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}hr ${mins}min`;
    } else {
      return `${mins}min`;
    }
  }

  function canclePlan() {
    // clearPlan();
    setButton("first");
    setPlanTotal(0);
    setStops([]);
    setMapRender(undefined);
    setTime("N/A");
    setStoresWithDistance([]);
    setUserLocation(null);
    setTotalDistanceMiles(0);
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
        <View>{items}</View>
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
            <PlanBlock 
              mapRender={mapRender} 
              stops={stops} 
              storesWithDistance={storesWithDistance}
              totalDistanceMiles={totalDistanceMiles} 
            />
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
  storesWithDistance,
  totalDistanceMiles,
}: {
  mapRender?: JSX.Element;
  stops: string[];
  storesWithDistance: Array<{ store: string, distance: number }>;
  totalDistanceMiles?: number;
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
          {storesWithDistance.length > 0 && (
            <View style={planBlockStyle.distanceInfoContainer}>
              <Text style={planBlockStyle.distanceText}>
                Total distance: {
                  totalDistanceMiles ? totalDistanceMiles.toFixed(1) : "calculating..."
                } miles
              </Text>
              <Text style={planBlockStyle.distanceNote}>
                ⓘ Maps app will give more accurate estimates
              </Text>
            </View>
          )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', // Changed from 'center' to better align with multi-line content
    padding: 10,
    width: '100%',
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
    flex: 1, // Add flex to allow proper sizing
    width: 'auto',
    marginStart: 10,
    marginEnd: 0,
  },
  distanceInfoContainer: {
    marginTop: 5,
    alignItems: 'flex-end', // Right align text
    maxWidth: '70%', // Limit width to prevent overflow
  },
  distanceText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  distanceNote: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
    textAlign: 'right',
  },
});
