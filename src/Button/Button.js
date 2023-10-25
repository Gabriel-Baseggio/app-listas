
import { StyleSheet, Button, Text, Pressable } from "react-native";


const Button = ({ props }) => {
    return (
        <Pressable onPress={props.onPress} style={styles.button}>
            <Text style={styles.button}>
                {props.text}
            </Text>
        </Pressable>
    );
}

export default Button;

const styles = StyleSheet.create({
    button: {
        flex: 1,
        backgroundColor: '#DEE5E5',
        alignItems: 'center',
        width: "100%",
    },
    text: {
        
    }
});