import { useState } from "react";
import { StyleSheet, Button, Text, Pressable, View } from "react-native";
// import { useIsFocused } from "@react-navigation/native";
// import { AsyncStorage } from "@react-native-async-storage/async-storage";

// import metadata from "../storage.metadata.json";

const ListScreen = ({ route, navigation }) => {
    const { list, lists } = route.params;
    const [items, setItems] = useState(list.items);

    const deleteItem = (item) => {
        items.forEach(itemFor, i => {
            if (itemFor.key == item.key) {
                let newItems = items;
                newItems.splice(i, 1);
                setItems(newItems);
            }
        });
    }

    return (
        <View style={styles.container}>
            <Text>{list.name}</Text>
            
            <Button title="Adicionar um item" onPress={() => navigation.navigate("AddItemScreen", { text: "Adicionar" , list: list, lists: lists })} />

            {
                items.map((item) => {
                    return (
                        <View key={item.key} style={styles.itemContainer}>
                            <Text style={styles.itemValue} key={item.value + item.key}>{item.value}</Text>
                            <Text style={styles.itemLastUpdate} key={item.value + item.lastUpdate}>{item.lastUpdate.toLocaleString()}</Text>
                            <Button
                                title="Editar"
                                onPress={() => { navigation.navigate("AddItemScreen", { text: "Editar", item: item, list: list, lists: lists }) }}
                            />
                            <Button title="X" onPress={() => deleteItem(item)}/>
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
        width: "50px",
        color: '#FFFFFF',
    },
    itemLastUpdate: {
        color: '#FFFFFF',
    },
});