import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import VersementScreen from "./screens/VersementScreen";
import ConducteurScreen from "./screens/ConducteurScreen";
import EditConducteurScreen from "./screens/EditConducteurScreen";

import RapportsScreen from "./screens/RapportScreen";
import AddConducteurForm from "./screens/AddConducteurForm";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Accueil" component={HomeScreen} />
        <Stack.Screen name="Versement" component={VersementScreen} />
        <Stack.Screen name="Conducteurs" component={ConducteurScreen} />
        <Stack.Screen name="Rapports" component={RapportsScreen} />
        <Stack.Screen name="AddConducteur" component={AddConducteurForm} options={{ title: 'Ajouter Conducteur' }} />
        <Stack.Screen name="EditConducteur" component={EditConducteurScreen} options={{ title: 'Modifier Conducteur' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
