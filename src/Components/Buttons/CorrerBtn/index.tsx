import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import styles from "./styles";

interface Props extends TouchableOpacityProps {
    texto: string
}

export default function CorrerBtn({ texto, ...rest }: Props) {
    return (
        <TouchableOpacity {...rest} style={[styles.container, rest.disabled && { opacity: 0.3 }]}>
            <Text style={[styles.texto]}>{texto}</Text>
        </TouchableOpacity>
    )
}