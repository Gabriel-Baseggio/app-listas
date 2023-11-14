import { useEffect, useMemo, useState, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
    const [lists, setLists] = useState(new Array());
    const [filter, setFilter] = useState("");
    const focus = useIsFocused();

    const dropdownRef = useRef({});

    useEffect(() => { getLists() }, [focus]);
    useEffect(() => {
        switch (filter) {
            case "Data crescente":
                sortLists(sortByDateAsc);
                break;
            case "Data decrescente":
                sortLists(sortByDateDesc);
                break;
            case "Nome decrescente":
                sortLists(sortByNameDesc);
                break;
            case "Nome crescente":
                sortLists(sortByNameAsc);
                break;
            default:
                sortLists(sortByDateDesc);
                break;
        }
    }, [filter]);

    const getLists = async () => {
        const variableLists = await AsyncStorage.getItem('LISTS');
        if (variableLists) {
            setLists([...JSON.parse(variableLists)]);
        }
    }

    const saveLists = async () => {
        const saveLists = lists || new Array();
        await AsyncStorage.setItem('LISTS', JSON.stringify(saveLists));
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

    const resetFilters = () => {
        setFilter("");
        dropdownRef.current.reset();
    }

    const showLists = useMemo(() => {
        return (
            lists.map((list) => {
                return (
                    <View key={list.key} style={styles.listContainer}>
                        <Pressable style={styles.list} onPress={() => { resetFilters(); navigation.navigate('ListScreen', { listkey: list.key }) }}>
                            <Text style={styles.listName} key={list.name + list.key}>{list.name}</Text>
                            <Text style={styles.listLastUpdate} key={list.name + list.lastUpdate}>{getFormattedDate(list.lastUpdate)}</Text>
                            <Pressable style={styles.button} onPress={() => { resetFilters(); navigation.navigate('AddListScreen', { text: 'Editar', listkey: list.key }) }}>
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

    const clearLists = async () => {
        await AsyncStorage.setItem('LISTS', JSON.stringify(new Array()));
        getLists();
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

    const sortByNameAsc = (a, b) => {
        if (a.name <= b.name) {
            return -1;
        } else {
            return 1;
        }
    }

    const sortByNameDesc = (a, b) => {
        if (a.name > b.name) {
            return -1;
        } else {
            return 1;
        }
    }

    const sortLists = (sortFunc) => {
        const newLists = lists;
        newLists.sort(sortFunc);
        setLists([...newLists]);
    }

    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
                <Pressable style={styles.button} onPress={() => { resetFilters(); navigation.navigate('AddListScreen', { text: 'Adicionar' }) }}>
                    <Text style={styles.buttonText}>Adicionar uma lista</Text>
                </Pressable>

                <Pressable style={styles.button} onPress={() => clearLists()}>
                    <Text style={styles.buttonText}>Limpar listas</Text>
                </Pressable>

                <SelectDropdown
                    ref={dropdownRef}
                    data={new Array("Data crescente", "Data decrescente", "Nome crescente", "Nome decrescente")}
                    onSelect={(selectedItem) => {
                        setFilter(selectedItem);
                    }}
                    defaultButtonText={"Ordenar por"}
                    buttonStyle={styles.button}
                    rowStyle={styles.rowDropdown}
                    buttonTextStyle={styles.buttonText}
                    dropdownStyle={styles.dropdown}
                />

                {showLists}
            </View>
        </ScrollView>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    scrollContainer: {
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
    listContainer: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#938CE6',
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%',
    },
    list: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    listName: {
        color: '#302D4C',
        fontSize: 18,
        fontWeight: '500',
        width: '25%',
        textAlign: 'center',
    },
    listLastUpdate: {
        color: '#302D4C',
        fontSize: 18,
        fontWeight: '500',
        width: '30%',
        textAlign: 'center',
    },
});