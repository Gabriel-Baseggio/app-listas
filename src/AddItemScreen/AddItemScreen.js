import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { sortByDateDesc } from '../utils/sortFunctions.js';

const AddItemScreen = ({ route, navigation }) => {
    const { text, listkey, itemkey } = route.params;

    const [itemName, setItemName] = useState('');

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
                        lista.items.forEach((itemFor) => {
                            if (itemFor.key == itemkey) {
                                setItemName(itemFor.name);
                            }
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

    const addItem = () => {
        if (!itemName) {
            alert('Por favor digite um nome!')
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

            newItem.name = itemName;
            newItem.lastUpdate = new Date();
            newItems.forEach((itemFor) => {
                if (itemFor == itemkey) {
                    itemFor = item;
                }
            });

        } else {

            newItem = {
                key: newItems.length,
                name: itemName,
                lastUpdate: new Date(),
            };
    
            newItems.push(newItem);
        }

        newItems.sort(sortByDateDesc);
        newList.items = newItems;
        newList.lastUpdate = new Date();

        newLists.forEach((lista) => {
            if (lista.key == listkey) {
                newLists.lista = newList;
            }
        });
    
        newLists.sort(sortByDateDesc);
        setLists([...newLists]);
        
        saveLists();
        navigation.navigate('ListScreen', { listkey: listkey })
    }

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.input}
                placeholder='Digite o nome do item'
                value={itemName}
                onChangeText={setItemName}
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