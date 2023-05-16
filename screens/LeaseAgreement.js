import { View, Text, ScrollView, Image } from 'react-native';
import styles from '../assets/css/Style';
// import svg icons 
import { useNavigation } from '@react-navigation/native';
import ShowHideIcon from '../assets/img/mobile/ShowHideIcon';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from 'react';
import MainHeader from '../components/nav/MainHeader';
import InvertBlackButton from '../components/buttons/InvertBlackButton';
import PrimaryButton from '../components/buttons/PrimaryButton';
import BlackButton from '../components/buttons/BlackButton';
import TerminateLease from '../components/modals/TerminateLease';
import TermReqSent from '../components/modals/TermReqSent';

function LeaseAgreement({ navigation }) {
    const [modalTermLeaseVisible, setModalTermLeaseVisible] = useState(false);
    const [modalTermReqSentVisible, setModalTermReqSentVisible] = useState(false);


    // const navigation = useNavigation();

    // let [bool, changeBool] = useState(true);
    // let onPressIcon = () => { changeBool(e => !e) }

    return (

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', }}>
            <View style={styles.container}>
                <MainHeader />
                <TerminateLease
                    vis={modalTermLeaseVisible}
                    onModalCancelPress={() => {
                        setModalTermLeaseVisible(!modalTermLeaseVisible);
                        //  navigation.navigate('Home'); 
                    }}
                    onModalYesPress={() => {
                        setModalTermReqSentVisible(!modalTermReqSentVisible);
                        setModalTermLeaseVisible(!modalTermLeaseVisible);
                        //  navigation.navigate('Home'); 
                    }}
                    titleCancel="CANCEL"
                    titleYes="YES"
                    modalFunc={()=>{setModalTermLeaseVisible(false)}}
                />
                <TermReqSent
                    vis={modalTermReqSentVisible}
                    onModalPress={() => {
                        setModalTermReqSentVisible(!modalTermReqSentVisible);
                        navigation.navigate('Home');
                    }}
                    title="CLOSE"
                    modalFunc={()=>{setModalTermReqSentVisible(false)}}
                />
                <View style={{ padding: 10 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Text style={styles.body_title}>
                            {'<'} LeaseAgreement
                        </Text>
                    </TouchableOpacity>

                </View>
                <ScrollView>

                    <View style={styles.nav_logo}>



                        <View style={{ paddingHorizontal: 30,paddingBottom:100 }}>

                            <View style={{ alignItems: 'center' }}>
                                <Image
                                    style={{ width: 350, height: 600 }}
                                    source={require('../assets/img/mobile/LeaseAgreementImage.png')}
                                // source={require('@expo/snack-static/react-native-logo.png')}
                                />
                            </View>

                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', paddingTop: 40, height: 120 }}>

                                <BlackButton width={200} height={50} route="Home" title="PRINT LEASE" />
                                <InvertBlackButton width={200} height={50} route="Home" title="DOWNLOAD LEASE" />
                                <View style={{ marginVertical: 10 }}>
                                    <TouchableOpacity onPress={() => { setModalTermLeaseVisible(!modalTermLeaseVisible) }}>
                                        <Text style={{ textDecorationLine: 'underline', color: '#BB2200', textAlign: 'center' }}>Request Termination</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>



                    </View>

                </ScrollView>
            </View>
        </View>
    );
}

export default LeaseAgreement;