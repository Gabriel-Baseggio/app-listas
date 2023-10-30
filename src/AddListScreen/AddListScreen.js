import { useState } from "react";
import { StyleSheet, Button, Text, TextInput, View } from "react-native";
// import { useIsFocused } from "@react-navigation/native";
// import { AsyncStorage } from "@react-native-async-storage/async-storage";

// import metadata from "../storage.metadata.json";

const AddListScreen = ({ route, navigation }) => {
    const { text, list } = route.params;
    const [listName, setListName] = useState("");

    const getListName = () => {
        // Cód para pegar o nome de uma lista já existente com nome e data (list: {name, lastUpdate})
        setListName(name);
    }

    const saveListName = () => {
        // Cód para salvar o nome de uma lista já existente com nome e data do Storage (list: {name, lastUpdate})
    }

    const addList = () => {
        if (!listName) {
            alert("Por favor digite um nome!")
            return
        }

        // Cód para criar e adicionar a lista

        alert(listName)
        navigation.navigate("HomeScreen")
    }

    const updateDate = () => {
        //Cód para mudar a data de alteração da lista
    }

    return (
        <View style={styles.container}>
            <Text>{text} lista {list.key}</Text>
            <TextInput
                placeholder="Digite o nome da lista"
                value={listName}
                onChangeText={setListName}
            />
            <Button
                title={`${text} lista`}
                onPress={() => { addList() }}
            />
        </View>
    );
}

export default AddListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: "15px",
        padding: "15px",
        backgroundColor: '#DEE5E5',
        alignItems: 'center',
        width: "100%",
    },
});