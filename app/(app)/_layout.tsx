import React from 'react'
import {Stack} from "expo-router";

const _Layout = () => {
    const user = false;
    return (
        <Stack>
            <Stack.Protected guard={user}>
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            </Stack.Protected>
            <Stack.Protected guard={!user}>
                <Stack.Screen name="(public)" options={{ headerShown: false }} />
            </Stack.Protected>
        </Stack>
    )
}
export default _Layout
