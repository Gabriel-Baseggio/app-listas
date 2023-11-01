import { useEffect, useState } from "react";
import { StyleSheet, Button, Text, TextInput, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//CONTINUAR A LÓGICA PARA ADICIONAR OU EDITAR UM ITEM - VALUE DO ITEM

const AddItemScreen = ({ route, navigation }) => {
    const { text, listkey, itemkey } = route.params;

    const [itemValue, setItemValue] = useState("");

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

        let newLists = lists;
        let newList = newLists.filter((lista) => {
            return lista.key == listkey
        })[0];
        let newItems = newList.items;
        let newItem = newItems.filter((item) => {
            return item.key == itemkey
        })[0];


        if (items) {

            newItem.value = itemValue;
            newItem.lastUpdate = new Date();

        } else {

            const newItem = {
                key: list.length,
                value: itemValue,
                lastUpdate: new Date(),
            };
    
            newItems.push(newItem);
            setItems([...newItems]);
        }
        newList.lastUpdate = new Date();
    
        newItems.sort(sortByDate);
        
        navigation.navigate("ListScreen", { listkey: listkey })
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
        gap: 15,
        padding: "15px",
        backgroundColor: '#DEE5E5',
        alignItems: 'center',
        width: "100%",
    },
});