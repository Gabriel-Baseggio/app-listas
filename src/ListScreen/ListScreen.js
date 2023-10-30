import { useState } from "react";
import { StyleSheet, Button, Text, Pressable, View } from "react-native";
// import { useIsFocused } from "@react-navigation/native";
// import { AsyncStorage } from "@react-native-async-storage/async-storage";

// import metadata from "../storage.metadata.json";

const ListScreen = ({ route, navigation }) => {
    const { list } = route.params;

    const getList = () => {
        // Cód para pegar a lista de listas
        setList(savedList);
    }

    const saveList = () => {
        // Cód para salvar a lista de listas
    }

    return (
        <View style={styles.container}>
            <Text>{list.name}</Text>
            
            <Button title="Adicionar um item" onPress={() => navigation.navigate("AddItemScreen")} />

            {
                list.items.map((item) => {
                    return (
                        <View key={item.key} style={styles.itemContainer}>
                            <Pressable style={styles.item} onPress={() => { navigation.navigate("ItemScreen", { item: item }) }}>
                                <Text style={styles.itemValue} key={item.value + item.key}>{item.value}</Text>
                                <Text style={styles.itemLastUpdate} key={item.value + item.lastUpdate}>{item.lastUpdate}</Text>
                                <Button
                                    title="Editar valor"
                                    onPress={() => { navigation.navigate("AddItemScreen", { text: "Editar", item: item }) }}
                                />
                                <Button title="Excluir" />
                            </Pressable>
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
        gap: "15px",
        padding: "15px",
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
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-around",
        width: "100%",
    },
    itemValue: {
        color: '#FFFFFF',
    },
    itemLastUpdate: {
        color: '#FFFFFF',
    },
});