/**
 *
 *
 * This file defines the layout for all the screens in the app.
 * To better understand how expo's new router works, check out the documentation:
 * 
 *
 */

import { Stack } from "expo-router";

export default function StackLayout () {
    return (
        <Stack>
          <Stack.Screen name="(tabs)" options={{headerShown: false }} />
        </Stack>
    );
}