import styles from "./styles";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

const BTN_TEXT: Record<number, string> = {
    1: 'TrucooO !',
    3: 'Pedir 6',
    6: 'Pedir 9',
    9: 'Pedir 12',
    12: 'Pedir 12',
};

interface Props extends TouchableOpacityProps {
    point: number
}

export default function TrucoButton({ point, ...rest }: Props) {
    return (
        <TouchableOpacity {...rest} style={[styles.container, rest.disabled && { opacity: 0.3 }]}>
            <Text style={styles.text}>♣️</Text>
            <Text style={styles.text}>{BTN_TEXT[point] || ''}</Text>
            <Text style={styles.text}>♣️</Text>
        </TouchableOpacity>
    )
}