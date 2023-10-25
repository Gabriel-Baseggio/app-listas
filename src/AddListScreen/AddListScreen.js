// import { useEffect, useState } from "react";
import { StyleSheet, Button, Text, TextInput, View } from "react-native";
// import { useIsFocused } from "@react-navigation/native";
// import { AsyncStorage } from "@react-native-async-storage/async-storage";

// import metadata from "../storage.metadata.json";

const AddListScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Adicionar/editar lista</Text>
            <TextInput 
                placeholder="Digite o nome da lista"
                // value={listName}
                // onChangeValue={setListName}
            />
            <Button
                title={`Adicionar lista`}
                onPress={() => navigation.navigate("HomeScreen")}
            />
        </View>
    );
}

export default AddListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DEE5E5',
        alignItems: 'center',
        width: "100%",
    },
});