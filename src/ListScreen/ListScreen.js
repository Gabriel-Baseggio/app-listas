import { useEffect, useState, useMemo, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { Icon } from '@rneui/themed';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectDropdown from 'react-native-select-dropdown';

const ListScreen = ({ route, navigation }) => {
    const { listkey } = route.params;

    const [lists, setLists] = useState(new Array());
    const [list, setList] = useState(new Object());
    const [items, setItems] = useState(new Array());
    const [filter, setFilter] = useState("");

    const dropdownRef = useRef({});

    const focus = useIsFocused();

    useEffect(() => { getLists() }, [focus]);
    useEffect(() => {
        switch (filter) {
            case "Data crescente":
                sortItems(sortByDateAsc);
                break;
            case "Data decrescente":
                sortItems(sortByDateDesc);
                break;
            case "Valor decrescente":
                sortItems(sortByValueDesc);
                break;
            case "Valor crescente":
                sortItems(sortByValueAsc);
                break;
            default:
                sortItems(sortByDateDesc);
                break;
        }
    }, [filter]);

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

        newLists.sort(sortByDateDesc);
        setLists([...newLists]);

        saveLists();

        getLists();
    }

    const getFormattedDate = (date) => {
        date = new Date(date);

        let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        let year = date.getFullYear();

        let hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        return `${day}/${month}/${year} ${hours}:${minutes}`
    }

    const sortByDateDesc = (a, b) => {
        if (new Date(a.lastUpdate) >= new Date(b.lastUpdate)) {
            return -1;
        } else {
            return 1;
        }
    }

    const sortByDateAsc = (a, b) => {
        if (new Date(a.lastUpdate) < new Date(b.lastUpdate)) {
            return -1;
        } else {
            return 1;
        }
    }

    const sortByValueAsc = (a, b) => {
        if (a.value <= b.value) {
            return -1;
        } else {
            return 1;
        }
    }

    const sortByValueDesc = (a, b) => {
        if (a.value > b.value) {
            return -1;
        } else {
            return 1;
        }
    }

    const sortItems = (sortFunc) => {
        const newItems = items;
        newItems.sort(sortFunc);
        setItems([...newItems]);
    }

    const resetFilters = () => {
        setFilter("");
        dropdownRef.current.reset();
    }

    const showItems = useMemo(() => {
        return (
            items.map((item) => {
                return (
                    <View key={item.key} style={styles.itemContainer}>
                        <View style={styles.item}>
                            <Text style={styles.itemValue} key={item.value + item.key}>{item.value}</Text>
                            <Text style={styles.itemLastUpdate} kewy={item.value + item.lastUpdate}>{getFormattedDate(item.lastUpdate)}</Text>
                            <Pressable style={styles.button} onPress={() => { resetFilters(); navigation.navigate('AddItemScreen', { text: 'Editar', listkey: listkey, itemkey: item.key }) }}>
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

                <Pressable style={styles.button} onPress={() => { resetFilters(); navigation.navigate('AddItemScreen', { text: 'Adicionar', listkey: listkey }) }}>
                    <Text style={styles.buttonText}>Adicionar um item</Text>
                </Pressable>

                <Pressable style={styles.button} onPress={() => clearItems()}>
                    <Text style={styles.buttonText}>Limpar items</Text>
                </Pressable>

                <SelectDropdown
                    ref={dropdownRef}
                    data={new Array("Data crescente", "Data decrescente", "Valor crescente", "Valor decrescente")}
                    onSelect={(selectedItem) => {
                        setFilter(selectedItem);
                    }}
                    defaultButtonText={"Ordenar por"}
                    buttonStyle={styles.button}
                    rowStyle={styles.rowDropdown}
                    buttonTextStyle={styles.buttonText}
                    dropdownStyle={styles.dropdown}
                />

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
    dropdown: {
        backgroundColor: '#938CE6',
        color: '#302D4C',
    },
    rowDropdown: {
        borderColor: '#302D4C',
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
