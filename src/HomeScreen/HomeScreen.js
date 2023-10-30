import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { AsyncStorage } from "@react-native-async-storage/async-storage";

// import Button from '../Button';

// import metadata from "../storage.metadata.json";

const HomeScreen = ({ navigation }) => {
    const [lists, setLists] = useState(new Array());
    const showLists = useMemo(() => {
        return (
            lists.map((list) => {
                return (
                    <View key={list.key} style={styles.listContainer}>
                        <Pressable style={styles.list} onPress={() => { navigation.navigate("ListScreen", { list: list, lists: lists }) }}>
                            <Text style={styles.listName} key={list.name}>{list.name}</Text>
                            <Text style={styles.listLastUpdate} key={list.name + list.lastUpdate}>{list.lastUpdate.toLocaleString()}</Text>
                            <Button
                                title="Editar"
                                onPress={() => { navigation.navigate("AddListScreen", { text: "Editar", list: list, lists: lists }) }}
                            />
                            <Button title="X" onPress={() => deleteList(list)} />
                        </Pressable>
                    </View>
                );
            })
        );
    }, [lists]);

    // [
    //     {
    //         key: 1, name: "lista1", items: [
    //             { key: 1, value: 1, lastUpdate: new Date() },
    //             { key: 2, value: 2, lastUpdate: new Date() },
    //             { key: 3, value: 3, lastUpdate: new Date() },
    //         ], lastUpdate: new Date()
    //     },

    //     {
    //         key: 2, name: "lista2", items: [
    //             { key: 1, value: 4, lastUpdate: new Date() },
    //             { key: 2, value: 5, lastUpdate: new Date() },
    //             { key: 3, value: 6, lastUpdate: new Date() },
    //         ], lastUpdate: new Date()
    //     },
    // ]

    const getLists = () => {
        // Cód para pegar a lista de listas
        if (!hasLists) {

        }
        setLists(savedLists);
    }

    const saveLists = () => {
        // Cód para salvar a lista de listas
    }

    const deleteList = (list) => {
        lists.forEach((lista, i) => {
            if (lista.key == list.key) {
                let newLists = lists;
                newLists.splice(i, 1);
                setlists(newLists);
            }
        });
        console.log(lists);
    }

    return (
        <View style={styles.container}>
            <Text>Tela inicial</Text>
            <Button
                title="Adicionar uma lista"
                onPress={() => { navigation.navigate("AddListScreen", { text: "Adicionar", list: undefined, lists: lists }) }}
            />

            {showLists}

        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: "15px",
        padding: "15px",
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
    list: {
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-around",
        width: "100%",
    },
    listName: {
        width: "50px",
        color: '#FFFFFF',
    },
    listLastUpdate: {
        color: '#FFFFFF',
    },
});