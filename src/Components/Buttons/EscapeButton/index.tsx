import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import styles from "./styles";

const BTN_TEXT: Record<number, string> = {
    1: 'Correr',
    3: 'Correr',
    6: 'Correr 3',
    9: 'Correr 6',
    12: 'Correr 9',
}

interface Props extends TouchableOpacityProps {
    point: number
}

export default function EscapeButton({point, ...rest }: Props) {
    return (
        <TouchableOpacity {...rest} style={[styles.container, rest.disabled && { opacity: 0.3 }]}>
            <Text style={[styles.text, styles.invert]}>🦆</Text>
            <Text style={styles.text}>{BTN_TEXT[point]}</Text>
            <Text style={styles.text}>🦆</Text>
        </TouchableOpacity>
    )
}