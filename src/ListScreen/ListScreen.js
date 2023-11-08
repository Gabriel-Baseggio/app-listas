import { useEffect, useState, useMemo } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { Icon } from '@rneui/themed';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListScreen = ({ route, navigation }) => {
    const { listkey } = route.params;

    const [lists, setLists] = useState(new Array());
    const [list, setList] = useState(new Object());
    const [items, setItems] = useState(new Array());

    const focus = useIsFocused();

    useEffect(() => { getLists() }, [focus]);

    const getLists = async () => {
        let variableLists = await AsyncStorage.getItem('LISTS');
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
        await AsyncStorage.setItem('LISTS', JSON.stringify(saveLists));
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
        setList(newList)

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

    const sortByDate = (a, b) => {
        if (new Date(a.lastUpdate) >= new Date(b.lastUpdate)) {
            return -1;
        } else {
            return 1;
        }
    }

    const clearItems = () => {
        let newLists = lists;
        let newList = list;

        setItems(new Array());

        newList.lastUpdate = new Date();
        setList(newList)

        newLists.forEach(lista => {
            if (lista.key == listkey) {
                lista.items = new Array();
            }
        });
        
        newLists.sort(sortByDate);
        setLists([...newLists]);

        saveLists();

        getLists();
    }

    const getFormattedDate = (date) => {
        date = new Date(date);

        let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        let year = date.getFullYear();

        let hours = date.getHours() < 10 ? `0${date.getHours()}`: date.getHours();
        let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        return `${day}/${month}/${year} ${hours}:${minutes}`
    }

    const showItems = useMemo(() => {
        return (
            items.map((item) => {
                return (
                    <View key={item.key} style={styles.itemContainer}>
                        <View style={styles.item}>
                            <Text style={styles.itemValue} key={item.value + item.key}>{item.value}</Text>
                            <Text style={styles.itemLastUpdate} kewy={item.value + item.lastUpdate}>{getFormattedDate(item.lastUpdate)}</Text>
                            <Pressable style={styles.button} onPress={() => { navigation.navigate('AddItemScreen', { text: 'Editar', listkey: listkey, itemkey: item.key }) }}>
                                <Icon name='edit' color='#FFFFFF' />
                            </Pressable>
                            <Pressable style={styles.button} onPress={() => deleteItem(item)}>
                                <Icon name='delete' color='#FFFFFF' />
                            </Pressable>
                        </View>
                    </View>
                );
            })
        );
    }, [items]);

    return (
        <ScrollView style={styles.scrollContainer}>  
            <View style={styles.container}>
                <Text style={styles.title}>{list.name}</Text>

                <Pressable style={styles.button} onPress={() => navigation.navigate('AddItemScreen', { text: 'Adicionar', listkey: listkey })}>
                    <Text style={styles.buttonText}>Adicionar um item</Text>
                </Pressable>

                <Pressable style={styles.button} onPress={() => clearItems()}>
                    <Text style={styles.buttonText}>Limpar items</Text>
                </Pressable>

                {showItems}
            </View>
        </ScrollView>
    );
}

export default ListScreen;

const styles = StyleSheet.create({
    scrollContainer: {
        width: '100%',
        backgroundColor: '#DEE5E5',
    },
    container: {
        flex: 1,
        gap: 15,
        padding: 15,
        alignItems: 'center',
        width: '100%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
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
    itemContainer: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#938CE6',
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%',
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
    },
    itemValue: {
        color: '#302D4C',
        fontSize: 18,
        fontWeight: '500',
        width: '25%',
        textAlign: 'center',
    },
    itemLastUpdate: {
        color: '#302D4C',
        fontSize: 18,
        fontWeight: '500',
        width: '30%',
        textAlign: 'center',
    },
});
