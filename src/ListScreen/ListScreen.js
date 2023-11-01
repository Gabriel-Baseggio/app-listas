import { useEffect, useState, useMemo } from "react";
import { StyleSheet, Button, Text, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ListScreen = ({ route, navigation }) => {
    const { listkey } = route.params;

    const [lists, setLists] = useState(new Array());
    const [list, setList] = useState(new Object());
    const [items, setItems] = useState(new Array());

    const focus = useIsFocused();

    useEffect(() => { getLists() }, [focus]);

    const getLists = async () => {
        let variableLists = await AsyncStorage.getItem("LISTS");
        variableLists = JSON.parse(variableLists);
        if (variableLists) {
            setLists([...variableLists]);
            variableLists.forEach((lista) => {
                if (lista.key == listkey) {
                    setList(lista);
                    setItems([...lista.items]);
                }
            });
        }
    }

    const saveLists = async () => {
        const saveLists = lists || new Array();
        await AsyncStorage.setItem("LISTS", JSON.stringify(saveLists));
    }

    const deleteItem = (item) => {
        let newLists = lists;
        let newList = list;
        let newItems = items;

        newItems.forEach((itemFor, i) => {
            if (itemFor.key == item.key) {
                newItems.splice(i, 1);
            }
        });
        
        newItems = resetKeys(newItems);
        setItems([...newItems]);

        newList.lastUpdate = new Date();
        setList([newList])

        newLists.forEach(lista => {
            if (lista.key == listkey) {
                lista.items = newItems;
            }
        });
        setLists([...newLists]);

        saveLists();
    }

    const resetKeys = (newItems) => {
        newItems.forEach((item, i) => {
            item.key = i;
        });

        return newItems;
    }

    const showItems = useMemo(() => {
        return (
            items.map((item) => {
                return (
                    <View key={item.key} style={styles.itemContainer}>
                        <Text style={styles.itemValue} key={item.value + item.key}>{item.value}</Text>
                        <Text style={styles.itemLastUpdate} key={item.value + item.lastUpdate}>{item.lastUpdate.toLocaleString()}</Text>
                        <Button
                            title="Editar"
                            onPress={() => { navigation.navigate("AddItemScreen", { text: "Editar", listkey: listkey, itemkey: item.key }) }}
                        />
                        <Button title="X" onPress={() => deleteItem(item)} />
                    </View>
                );
            })
        );
    }, [items]);

    return (
        <View style={styles.container}>
            <Text>{list.name}</Text>

            <Button title="Adicionar um item" onPress={() => navigation.navigate("AddItemScreen", { text: "Adicionar", listkey: listkey })} />

            {showItems}

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