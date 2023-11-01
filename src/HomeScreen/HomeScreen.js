import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
    const [lists, setLists] = useState(new Array());    
    const focus = useIsFocused();

    useEffect(() => { getLists() }, [focus]);

    const getLists = async () => {
        const variableLists = await AsyncStorage.getItem("LISTS");
        if (variableLists) {
            setLists([...JSON.parse(variableLists)]);
        }
    }

    const saveLists = async () => {
        const saveLists = lists || new Array();
        await AsyncStorage.setItem("LISTS", JSON.stringify(saveLists));
    }

    const showLists = useMemo(() => {
        return (
            lists.map((list) => {
                return (
                    <View key={list.key} style={styles.listContainer}>
                        <Pressable style={styles.list} onPress={() => { navigation.navigate("ListScreen", { listkey: list.key }) }}>
                            <Text style={styles.listName} key={list.name + list.key}>{list.name}</Text>
                            <Text style={styles.listLastUpdate} key={list.name + list.lastUpdate.toLocaleString()}>{list.lastUpdate.toLocaleString()}</Text>
                            <Button
                                title="Editar"
                                onPress={() => { navigation.navigate("AddListScreen", { text: "Editar", listkey: list.key }) }}
                            />
                            <Button title="X" onPress={() => deleteList(list)} />
                        </Pressable>
                    </View>
                );
            })
        );
    }, [lists]);

    const deleteList = (list) => {
        let newLists = lists;
        newLists.forEach((lista, i) => {
            if (lista.key == list.key) {
                newLists.splice(i, 1);
            }
        });
        resetKeys(newLists);
        saveLists();
    }

    const resetKeys = (newLists) => {
        newLists.forEach((lista, i) => {
            lista.key = i;
        });
        setLists([...newLists]);
    }

    const resetLists = async () => {
        await AsyncStorage.setItem("LISTS", JSON.stringify(new Array()));
        getLists();
    }

    return (
        <View style={styles.container}>
            <Text>Tela inicial</Text>
            <Button
                title="Adicionar uma lista"
                onPress={() => { navigation.navigate("AddListScreen", { text: "Adicionar" }) }}
            />
            <Button
                title="Resetar as listas"
                onPress={() => resetLists()}
            />

            {showLists}

        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 15,
        padding: 15,
        backgroundColor: '#DEE5E5',
        alignItems: 'center',
        width: "100%",
    },
    listContainer: {
        flex: 1,
        flexDirection: "row",
        padding: 5,
        backgroundColor: '#0000FF',
        alignItems: 'center',
        justifyContent: "space-around",
        width: "95%",
    },
    list: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-around",
        width: "100%",
        height: "auto",
    },
    listName: {
        width: "50px",
        color: '#FFFFFF',
    },
    listLastUpdate: {
        color: '#FFFFFF',
    },
});