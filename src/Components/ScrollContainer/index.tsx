import { StatusBar } from "expo-status-bar";
import { ReactNode } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleProp, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
    children: ReactNode
    style?: StyleProp<ViewStyle>
}

export default function ScrollContainer({ children, style = {} }: Props) {

    const insets = useSafeAreaInsets()

    return (
        <View style={{ flex: 1 }}>
            <StatusBar style="light" />

            {/* KEYBOARDAVOIDINGVIEW: Faz o conteúdo "pular" para cima do teclado */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >

                {/* SCROLLVIEW: Permite rolar a tela e evita o erro de layout interno */}
                <ScrollView
                    contentContainerStyle={[{ paddingTop: insets.top + 20, paddingBottom: insets.bottom + 10 }, style, { flex: 0, flexGrow: 1 }]}
                    showsVerticalScrollIndicator={false}
                >
                    {children}
                </ScrollView>

            </KeyboardAvoidingView>
        </View>
    )
}