import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import styles from "./styles";

type Props = TouchableOpacityProps & {
    tittle: string
}

export default function ButtonCalc({ tittle, ...rest }: Props) {
    return (
        <TouchableOpacity
            {...rest}
            style={styles.container}
        >
            <Text
                style={styles.text}
            >
                {tittle}
            </Text>
        </TouchableOpacity>
    )
}