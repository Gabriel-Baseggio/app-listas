import { useEffect, useState } from "react";
import { StyleSheet, Button, Text, TextInput, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddListScreen = ({ route, navigation }) => {
    const { text, listkey } = route.params;
    const [listName, setListName] = useState("");
    const [lists, setLists] = useState(new Array());
    const focus = useIsFocused();

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

    const sortByDate = (a, b) => {
        if (new Date(a.lastUpdate) >= new Date(b.lastUpdate)) {
            return -1;
        } else {
            return 1;
        }
    }

    const addList = () => {
        if (!listName) {
            alert("Por favor digite um nome!")
            return
        }

        if (listkey != undefined) {
            lists.forEach((list) => {
                if (list.key == listkey) {
                    list.name = listName;
                    list.lastUpdate = new Date();
                }
            });

        } else {
            const newList = {
                key: lists.length,
                name: listName,
                items: new Array(),
                lastUpdate: new Date(),
            };
    
            lists.push(newList);
        }

        lists.sort(sortByDate);
        saveLists();
        navigation.navigate("HomeScreen");
    }
    
    return (
        <View style={styles.container}>
            <Text>{text} {listName ? listName : "lista"}</Text>
            <TextInput
                placeholder="Digite o nome da lista"
                value={listName}
                onChangeText={setListName}
            />
            <Button
                title={`${text} lista`}
                onPress={() => {addList()}}
            />
        </View>
    );
}

export default AddListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 15,
        padding: 15,
        backgroundColor: '#DEE5E5',
        alignItems: 'center',
        width: "100%",
    },
});