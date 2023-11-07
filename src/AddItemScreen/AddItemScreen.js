import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddItemScreen = ({ route, navigation }) => {
    const { text, listkey, itemkey } = route.params;

    const [itemValue, setItemValue] = useState('');

    const [lists, setLists] = useState(new Array());

    const focus = useIsFocused();

    useEffect(() => { getLists() }, [focus]);

    const getLists = async () => {
        let variableLists = await AsyncStorage.getItem('LISTS');
        variableLists = JSON.parse(variableLists);
        if (variableLists) {
            setLists([...variableLists]);
            variableLists.forEach((lista) => {
                if (lista.key == listkey) {
                    if (itemkey != undefined) {
                        variableLists.forEach((lista) => {
                            lista.items.forEach((itemFor) => {
                                if (itemFor.key == itemkey) {
                                    setItemValue(itemFor.value);
                                }
                            });
                        });
                    }
                }
            });
        }
    }

    const saveLists = async () => {
        const saveLists = lists || new Array();
        await AsyncStorage.setItem('LISTS', JSON.stringify(saveLists));
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
            alert('Por favor digite um valor!')
            return
        }

        let newLists = lists;
        let newList = newLists.filter((lista) => {
            return lista.key == listkey
        })[0];
        let newItems = newList.items;
        let newItem;

        if (itemkey != undefined) {
            newItem = newItems.filter((item) => {
                return item.key == itemkey
            })[0];
        }


        if (newItem != undefined) {

            newItem.value = itemValue;
            newItem.lastUpdate = new Date();
            newItems.forEach((itemFor) => {
                if (itemFor == itemkey) {
                    itemFor = item;
                }
            });

        } else {

            newItem = {
                key: newItems.length,
                value: itemValue,
                lastUpdate: new Date(),
            };
    
            newItems.push(newItem);
        }

        newItems.sort(sortByDate);
        newList.items = newItems;
        newList.lastUpdate = new Date();

        newLists.forEach((lista) => {
            if (lista.key == listkey) {
                newLists.lista = newList;
            }
        });
    
        newLists.sort(sortByDate);
        setLists([...newLists]);
        
        saveLists();
        navigation.navigate('ListScreen', { listkey: listkey })
    }

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.input}
                placeholder='Digite o valor do item'
                value={itemValue}
                onChangeText={setItemValue}
            />
            <Pressable style={styles.button} onPress={() => {addItem()}}>
                <Text style={styles.buttonText}>{text} item</Text>
            </Pressable>
        </View>
    );
}

export default AddItemScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 15,
        padding: 15,
        backgroundColor: '#DEE5E5',
        alignItems: 'center',
        width: '100%',
    },
    button: {
        padding: 15,
        borderRadius: 5,
        backgroundColor: '#302D4C',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        width: '90%',
        padding: 15,
        fontSize: 18,
        borderWidth: 3,
        borderColor: '#161433',
        borderStyle: 'solid',
        borderRadius: 5,
    },
});