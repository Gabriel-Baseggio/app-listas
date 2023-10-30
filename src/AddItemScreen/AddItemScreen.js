import { useEffect, useState } from "react";
import { StyleSheet, Button, Text, TextInput, View } from "react-native";
// import { useIsFocused } from "@react-navigation/native";
// import { AsyncStorage } from "@react-native-async-storage/async-storage";

// import metadata from "../storage.metadata.json";

const AddItemScreen = ({ route, navigation }) => {
    const { text, item, list, lists } = route.params;
    const [itemValue, setItemValue] = useState("");

    const sortByDate = (a, b) => {
        if (new Date(a.lastUpdate) >= new Date(b.lastUpdate)) {
            return -1;
        } else {
            return 1;
        }
    }

    const addItem = () => {
        if (!itemValue) {
            alert("Por favor digite um valor!")
            return
        }

        if (item) {

            item.value = itemValue;
            item.lastUpdate = new Date();

        } else {

            const newItem = {
                key: list.length,
                value: itemValue,
                lastUpdate: new Date(),
            };
    
            list.items.push(newItem);
        }
        list.lastUpdate = new Date();
    
        list.items.sort(sortByDate);
        navigation.navigate("ListScreen", { list: list, lists: lists })
    }

    const updateDate = () => {
        //Cód para mudar a data de alteração da lista
    }

    return (
        <View style={styles.container}>
            <Text>{text} {itemValue ? itemValue : "item"}</Text>
            <TextInput 
                placeholder="Digite o valor do item"
                value={itemValue}
                onChangeText={setItemValue}
            />
            <Button
                title={`${text} item`}
                onPress={() => {addItem()}}
            />
        </View>
    );
}

export default AddItemScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DEE5E5',
        alignItems: 'center',
        width: "100%",
    },
});