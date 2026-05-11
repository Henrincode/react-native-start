import { Stack } from "expo-router"
import { SafeAreaProvider } from "react-native-safe-area-context"

export default function Layout() {
    return (
        // calcula o tamanho do notch/barras de sistema para o resto do app.
        <SafeAreaProvider>
                <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaProvider>
    )
}