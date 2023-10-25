import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/HomeScreen';
import AddListScreen from './src/AddListScreen';
import ListScreen from './src/ListScreen';
import AddItemScreen from './src/AddItemScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="AddListScreen" component={AddListScreen} />
        <Stack.Screen name="ListScreen" component={ListScreen} />
        <Stack.Screen name="AddItemScreen" component={AddItemScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;