// import { useEffect, useState } from "react";
import { StyleSheet, Button, Text, View } from "react-native";
// import { useIsFocused } from "@react-navigation/native";
// import { AsyncStorage } from "@react-native-async-storage/async-storage";

// import metadata from "../storage.metadata.json";

const AddItemScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Adicionar/editar item</Text>

        </View>
    );
}

export default AddItemScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DEE5E5',
        alignItems: 'center',
        width: "100%",
    },
});