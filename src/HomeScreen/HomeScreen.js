import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
    const [lists, setLists] = useState(new Array());    
    const focus = useIsFocused();

    useEffect(() => { getLists() }, [focus]);

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

        let hours = date.getHours() < 10 ? `0${date.getHours()}`: date.getHours();
        let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        return `${day}/${month}/${year} ${hours}:${minutes}`
    }

    const showLists = useMemo(() => {
        return (
            lists.map((list) => {
                return (
                    <View key={list.key} style={styles.listContainer}>
                        <Pressable style={styles.list} onPress={() => { navigation.navigate('ListScreen', { listkey: list.key }) }}>
                            <Text style={styles.listName} key={list.name + list.key}>{list.name}</Text>
                            <Text style={styles.listLastUpdate} key={list.name + list.lastUpdate}>{getFormattedDate(list.lastUpdate)}</Text>
                            <Pressable style={styles.button} onPress={() => { navigation.navigate('AddListScreen', { text: 'Editar', listkey: list.key }) }}>
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

    const sortDate = (sortFunc) => {
        const newLists = lists;
        newLists.sort(sortFunc);
        saveLists();
        getLists();
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

    const sortName = (sortFunc) => {
        const newLists = lists;
        newLists.sort(sortFunc);
        saveLists();
        getLists();
    }

    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
                <Pressable style={styles.button} onPress={() => { navigation.navigate('AddListScreen', { text: 'Adicionar' }) }}>
                    <Text style={styles.buttonText}>Adicionar uma lista</Text>
                </Pressable>

                <Pressable style={styles.button} onPress={() => clearLists()}>
                    <Text style={styles.buttonText}>Limpar listas</Text>
                </Pressable>

                <Pressable style={styles.button} onPress={() => sortDate(sortByDateAsc)}>
                    <Text style={styles.buttonText}>Data crescente</Text>
                </Pressable>

                <Pressable style={styles.button} onPress={() => sortDate(sortByDateDesc)}>
                    <Text style={styles.buttonText}>Data decrescente</Text>
                </Pressable>

                <Pressable style={styles.button} onPress={() => sortName(sortByNameDesc)}>
                    <Text style={styles.buttonText}>Nome decrescente</Text>
                </Pressable>
                
                <Pressable style={styles.button} onPress={() => sortName(sortByNameAsc)}>
                    <Text style={styles.buttonText}>Nome crescente</Text>
                </Pressable>

                {showLists}
            </View>
        </ScrollView>
    );
}

export default HomeScreen;

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