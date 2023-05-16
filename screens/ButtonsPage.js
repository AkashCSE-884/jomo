import { StyleSheet, View, FlatList, Button, Image, Text, ScrollView, Pressable } from 'react-native';
import styles from '../assets/css/Style';
import { List } from 'react-native-paper';

// import svg icons 
import BlackButton from '../components/buttons/BlackButton';
import InvertBlackButton from '../components/buttons/InvertBlackButton';
import InvertPrimaryButton from '../components/buttons/InvertPrimaryButton';
import PrimaryButton from '../components/buttons/PrimaryButton';
import RedButton from '../components/buttons/RedButton';


function ButtonsPage({ navigation }) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
 
        <BlackButton width={100} height={50} route="ContactUs" title="some"/>
 
        <InvertBlackButton width={100} height={50} route="Faq" />

        <InvertPrimaryButton width={100} height={50} route="ContactUs" title="title" />

        <PrimaryButton width={100} height={50} route="ContactUs" title="title" />

        <RedButton width={100} height={50} route="ContactUs" title="title" />

    </View>

  );
}


export default ButtonsPage;
