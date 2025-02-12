import { View, ActivityIndicator } from "react-native";
import { useRouter, Redirect } from "expo-router";
import { useAuth } from "./contexts/auth";
import { styles } from "./index.styles";

export default function Index() {
  const { session, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/auth/login" />;
  }

  return <Redirect href="/app/home" />;
}
