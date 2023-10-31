import { useState } from "react";
import { StyleSheet, Button, Text, Pressable, View } from "react-native";
// import { useIsFocused } from "@react-navigation/native";
// import { AsyncStorage } from "@react-native-async-storage/async-storage";

// import metadata from "../storage.metadata.json";

// ARRUMA AQUI COM BASE NO HOMESCREEN

const ListScreen = ({ route, navigation }) => {
    const { listkey } = route.params;
    const [items, setItems] = useState();

    useEffect(() => { getLists() }, [focus]);
    useEffect(() => { saveLists()}, [lists]);

    const getLists = async () => {
        const variableLists = await AsyncStorage.getItem("LISTS");
        setLists(JSON.parse(variableLists));
    }

    const saveLists = async () => {
        const saveLists = lists || new Array();
        await AsyncStorage.setItem("LISTS", JSON.stringify(saveLists));
    }

    const deleteItem = (item) => {
        let newItems = items;
        newItems.forEach(itemFor, i => {
            if (itemFor.key == item.key) {
                newItems.splice(i, 1);
            }
        });
        setItems([...newItems]);
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
        gap: 15,
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