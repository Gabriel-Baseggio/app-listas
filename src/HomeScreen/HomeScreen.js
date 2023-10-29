import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { AsyncStorage } from "@react-native-async-storage/async-storage";

// import Button from '../Button';

// import metadata from "../storage.metadata.json";

const HomeScreen = ({ navigation }) => {
    const [lists, setLists] = useState([
        {key: 1, name:"lista1", items:[
            {value: 1, lastUpdate: "29/10/2023 22:00"},
            {value: 2, lastUpdate: "29/10/2023 22:00"},
            {value: 3, lastUpdate: "29/10/2023 22:00"},
        ], lastUpdate: "29/10/2023 22:00"},

        {key: 2, name:"lista2", items:[
            {value: 4, lastUpdate: "29/10/2023 22:00"},
            {value: 5, lastUpdate: "29/10/2023 22:00"},
            {value: 6, lastUpdate: "29/10/2023 22:00"},
        ], lastUpdate: "29/10/2023 22:00"},
    ]);

    const getLists = () => {
        // Cód para pegar a lista de listas
        setLists(savedLists);
    }

    const saveLists = () => {
        // Cód para salvar a lista de listas
    }

    return (
        <View style={styles.container}>
            <Text>Tela inicial</Text>
            <Button title="Adicionar uma lista" onPress={() => navigation.navigate("AddListScreen")} />

            <Button title="Editar nome da lista" onPress={() => navigation.navigate("AddListScreen")} />

            <Button title="Ver itens da lista" onPress={() => navigation.navigate("ListScreen")} />

            {
                
                lists.map((list) => {
                    return (
                        <View key={list.key} style={styles.listContainer}>
                            <Text style={styles.listName} key={list.name}>{list.name}</Text>
                            <Text style={styles.listLastUpdate} key={list.name + list.lastUpdate}>{list.lastUpdate}</Text>
                            <Button title="Editar" />
                            <Button title="Excluir" />
                        </View>
                    );
                })
            }

        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DEE5E5',
        alignItems: 'center',
        width: "100%",
    },
    listContainer: {
        display: "flex",
        flexDirection: "row",
        padding: "5px",
        backgroundColor: '#0000FF',
        alignItems: 'center',
        justifyContent: "space-around",
        width: "95%",
    },
    listName: {
        color: '#FFFFFF',
    },
    listLastUpdate: {
        color: '#FFFFFF',
    },
});