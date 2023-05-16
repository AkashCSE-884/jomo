import { StyleSheet, View, FlatList, Button, Image, Text, ScrollView } from 'react-native';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import styles  
import styles from './assets/css/Style';

// import svg icons
import CompanyLogo from './assets/img/mobile/LogoSvg'
import UserIcon from './assets/img/mobile/AddUserSvg';
import NotificationIcon from './assets/img/mobile/NotificationSvgIcon';
import LeaseIcon from './assets/img/mobile/MyLeaseIcon';
import QueryIcon from './assets/img/mobile/MyQuerySvgIcon';
import ProjectIcon from './assets/img/mobile/ProjectSvgIcon';
import InvoiceIcon from './assets/img/mobile/MyInvoiceIcon';
import { createDrawerNavigator } from '@react-navigation/drawer';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button onPress={() => navigation.navigate('Home')} title="Go back home" />
        </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator useLegacyImplementation initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}