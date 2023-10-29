import { useState } from "react";
import { StyleSheet, Button, Text, View } from "react-native";
// import { useIsFocused } from "@react-navigation/native";
// import { AsyncStorage } from "@react-native-async-storage/async-storage";

// import metadata from "../storage.metadata.json";

const ListScreen = ({ navigation }) => {
    const [list, setList] = useState({
        key: 1,
        name: "list1",
        items: [
            {value: 1, lastUpdate: "29/10/2023 22:00"},
            {value: 2, lastUpdate: "29/10/2023 22:00"},
            {value: 3, lastUpdate: "29/10/2023 22:00"},
        ],
        lastUpdate: "29/10/2023 22:00",
    });

    const getList = () => {
        // Cód para pegar a lista de listas
        setList(savedList);
    }

    const saveList = () => {
        // Cód para salvar a lista de listas
    }

    return (
        <View style={styles.container}>
            <Text>Nome da lista</Text>
            
            <Button title="Adicionar um item" onPress={() => navigation.navigate("AddItemScreen")} />

            {
                list.items.map((item) => {
                    return (
                        <View key={list.key + item.value} style={styles.itemContainer}>
                            <Text style={styles.item} key={list.name + item.value}>{item.value}</Text>
                            <Text style={styles.itemLastUpdate} key={list.key + item.lastUpdate}>{item.lastUpdate}</Text>
                            <Button title="Editar" />
                            <Button title="Excluir" />
                        </View>
                    );
                })
            }

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
    itemContainer: {
        display: "flex",
        flexDirection: "row",
        padding: "5px",
        backgroundColor: '#0000FF',
        alignItems: 'center',
        justifyContent: "space-around",
        width: "95%",
    },
    item: {
        color: '#FFFFFF',
    },
    itemLastUpdate: {
        color: '#FFFFFF',
    },
});