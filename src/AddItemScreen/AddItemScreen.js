import { useState } from "react";
import { StyleSheet, Button, Text, TextInput, View } from "react-native";
// import { useIsFocused } from "@react-navigation/native";
// import { AsyncStorage } from "@react-native-async-storage/async-storage";

// import metadata from "../storage.metadata.json";

const AddItemScreen = ({ route, navigation }) => {
    const { text, item } = route.params;
    const [itemName, setItemName] = useState("");

    const getItemName = () => {
        // Cód para pegar o nome de uma lista já existente com nome e data do Storage (list: {name, lastUpdate})
        setItemName(name);
    }

    const saveItemName = () => {
        // Cód para salvar o nome de uma lista já existente com nome e data do Storage (list: {name, lastUpdate})
    }

    const addItem = () => {
        if (!itemName) {
            alert("Por favor digite um nome!")
            return
        }
        
        // Cód para criar e adicionar a lista

        alert(itemName)
        navigation.navigate("ListScreen")
    }

    const updateDate = () => {
        //Cód para mudar a data de alteração da lista
    }

    return (
        <View style={styles.container}>
            <Text>{text} item {item.value}</Text>
            <TextInput 
                placeholder="Digite o nome do item"
                value={itemName}
                onChangeText={setItemName}
            />
            <Button
                title={`Adicionar item`}
                onPress={() => {addItem()}}
            />
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