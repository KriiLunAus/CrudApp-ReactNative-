import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
export default function layout({children}) {


  return (
  <SafeAreaProvider>
    <Stack screenOptions={{ headerShown: false,}}>
        {children}
    </Stack>
  </SafeAreaProvider>
  )
}
