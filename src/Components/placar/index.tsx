import {Text, TextInput, TextInputProps } from "react-native"
import styles from "./styles"

export default function Placar({ tittle }: { tittle: number }) {
    return (
        <Text style={styles.container}>{tittle}</Text>
    )
}