import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Icon } from '@rneui/themed';
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
                            <Text style={styles.listLastUpdate} key={list.name + list.lastUpdate}>{list.lastUpdate.toLocaleString()}</Text>
                            <Pressable style={styles.button} onPress={() => { navigation.navigate("AddListScreen", { text: "Editar", listkey: list.key }) }}>
                                <Icon name='edit' color='#FFFFFF' />
                            </Pressable>
                            <Pressable style={styles.button} onPress={() => deleteList(list)}>
                                <Icon name='delete' color='#FFFFFF' />
                            </Pressable>
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
            <Pressable style={styles.button} onPress={() => { navigation.navigate("AddListScreen", { text: "Adicionar" }) }}>
                <Text style={styles.buttonText}>Adicionar uma lista</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={() => resetLists()}>
                <Text style={styles.buttonText}>Resetar as listas</Text>
            </Pressable>

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
    button: {
        padding: 15,
        borderRadius: 5,
        backgroundColor: "#302D4C",
        
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold",
    },
    listContainer: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#938CE6',
        alignItems: 'center',
        justifyContent: "center",
        width: "95%",
    },
    list: {
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        width: "100%",
    },
    listName: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "500",
        width: "30%",
        textAlign: "center",
    },
    listLastUpdate: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "500",
        width: "25%",
        textAlign: "center",
    },
});