
import { BaseRouter } from "@react-navigation/native";
import { StyleSheet, Text, Pressable } from "react-native";


const Button = () => {
    
    return (
        <Pressable style={styles.button}>
            <Text style={styles.text}>

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