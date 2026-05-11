import styles from "./styles";
import { Text, View } from "react-native";

export default function Score({ score }: { score: number }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Pontos</Text>
            <Text style={styles.text}>{score}</Text>
        </View>
    )
}