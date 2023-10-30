import { useEffect, useState } from "react";
import { StyleSheet, Button, Text, TextInput, View } from "react-native";
// import { useIsFocused } from "@react-navigation/native";
// import { AsyncStorage } from "@react-native-async-storage/async-storage";

// import metadata from "../storage.metadata.json";

const AddListScreen = ({ route, navigation }) => {
    const { text, list, lists } = route.params;
    const [listName, setListName] = useState("");
    
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

        if (list) {

            list.name = listName;
            list.lastUpdate = new Date();

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
        navigation.navigate("HomeScreen");
    }

    const updateDate = () => {
        //Cód para mudar a data de alteração da lista
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
        gap: "15px",
        padding: "15px",
        backgroundColor: '#DEE5E5',
        alignItems: 'center',
        width: "100%",
    },
});