import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { AsyncStorage } from "@react-native-async-storage/async-storage";

import Button from '../Button';

// import metadata from "../storage.metadata.json";

const HomeScreen = ({ navigation }) => {
        
    return (
        <View style={styles.container}>
            <Text>Tela inicial</Text>
            <Pressable onPress={() => navigation.navigate("AddListScreen")}>
                <Text>
                    Adicionar lista
                </Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate("AddListScreen")}>
                <Text>
                    Editar lista
                </Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate("ListScreen")}>
                <Text>
                Ver lista
                </Text>
            </Pressable>
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DEE5E5',
        alignItems: 'center',
        width: "100%",
    },
});