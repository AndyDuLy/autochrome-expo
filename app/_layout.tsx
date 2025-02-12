import { Stack } from "expo-router";
import { AuthProvider } from "./contexts/auth";

export default function Layout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="/auth/login"
          options={{
            headerShown: false,
            presentation: "modal",
          }}
        />
        <Stack.Screen name="/app/home" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
