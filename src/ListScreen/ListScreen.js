// import { useEffect, useState } from "react";
import { StyleSheet, Button, Text, View } from "react-native";
// import { useIsFocused } from "@react-navigation/native";
// import { AsyncStorage } from "@react-native-async-storage/async-storage";

// import metadata from "../storage.metadata.json";

const ListScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Nome da lista</Text>

            <Button
                title="Edit Item"
                onPress={() => navigation.navigate("AddItemScreen")}
            />
        </View>
    );
}

export default ListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DEE5E5',
        alignItems: 'center',
        width: "100%",
    },
});