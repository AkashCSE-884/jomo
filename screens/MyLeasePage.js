import { View, Text, ScrollView, } from 'react-native';
import styles from '../assets/css/Style';
// import svg icons 
import { useNavigation } from '@react-navigation/native';
import ShowHideIcon from '../assets/img/mobile/ShowHideIcon';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from 'react';
import MainHeader from '../components/nav/MainHeader';
import InvertBlackButton from '../components/buttons/InvertBlackButton';
import PrimaryButton from '../components/buttons/PrimaryButton';

function MyLeasePage(props) {
    const navigation = useNavigation();

    let [bool, changeBool] = useState(true);
    let onPressIcon = () => { changeBool(e => !e) }

    return (

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', }}>
            <View style={styles.container}>
                <MainHeader />
                <ScrollView>

                    <View style={styles.nav_logo}>

                        <View style={{ padding: 10 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                <Text style={styles.body_title}>
                                    {'<'} My Lease
                                </Text>
                            </TouchableOpacity>

                        </View>


                        <View style={{ paddingHorizontal: 30 }}>

                            <View>
                                <Text style={{ color: '#231F20B2', fontSize: 15 }}>Project:</Text>
                                <Text style={{ fontWeight: 'bold', marginTop: 5, fontSize: 16 }}>Inner City</Text>
                            </View>

                            <View style={{ marginTop: 20 }}>
                                <Text style={{ color: '#231F20B2', fontSize: 15 }}>Property Address:</Text>
                                <Text style={{ fontWeight: 'bold', marginTop: 5, fontSize: 16 }}>African Diamond Building, 25 Kerk Street, Johannesburg. Region D</Text>
                            </View>

                            <View style={{ marginTop: 20 }}>
                                <Text style={{ color: '#231F20', fontSize: 15 }}>Unit Type:</Text>

                                <Text style={{ fontWeight: 'bold', marginTop: 5, fontSize: 16 }}  >
                                    1 Bedroom, 1 Bathroom
                                </Text>

                            </View>

                            <View style={{ marginTop: 20 }}>
                                <Text style={{ color: '#231F20', fontSize: 15 }}>Tariff:</Text>

                                <Text style={{ fontWeight: 'bold', marginTop: 5, fontSize: 16 }}  >
                                    R3279.42
                                </Text>

                            </View>
 

                            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                                <View style={{ marginTop: 20 }}>
                                    <Text style={{ color: '#231F20B2', fontSize: 15 }}>Open Date:</Text>
                                    <Text style={{ fontWeight: 'bold', marginTop: 5, fontSize: 16 }}>01/05/2022</Text>
                                </View>
                                <View style={{ marginTop: 20 }}>
                                    <Text style={{ color: '#231F20B2', fontSize: 15 }}>End Date:</Text>
                                    <Text style={{ fontWeight: 'bold', marginTop: 5, fontSize: 16 }}>30/04/2024</Text>
                                </View>

                            </View>

                            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                                <View style={{ marginTop: 20 }}>
                                    <Text style={{ color: '#231F20B2', fontSize: 15 }}>Status:</Text>
                                    <Text style={{ fontWeight: 'bold', marginTop: 5, fontSize: 16 }}>Open</Text>
                                </View>
                                <View style={{ marginTop: 20 }}>
                                    <Text style={{ color: '#231F20B2', fontSize: 15 }}>Terminated Date:</Text>
                                    <Text style={{ fontWeight: 'bold', marginTop: 5, fontSize: 16 }}>-</Text>
                                </View>

                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', paddingTop: 40, height: 120 }}>

                                <PrimaryButton width={200} height={50} route="LeaseAgreement" title="VIEW LEASE" />

                            </View>
                        </View>



                    </View>

                </ScrollView>
            </View>
        </View>
    );
}

export default MyLeasePage;