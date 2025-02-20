/**
 * 
 *
 * This file defines the layout for all the screens in the app.
 * To better understand how expo's new router works, check out the documentation:
 * https://docs.expo.dev/router/navigating-pages/
 *
 * *** How to use buttons: *** https://docs.expo.dev/router/navigating-pages/#buttons
 */

import { Stack } from "expo-router";

export default function StackLayout () {
    return (
        <Stack>
          <Stack.Screen name="(tabs)" options={{headerShown: false }} />
        </Stack>
    );
}