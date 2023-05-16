import { StyleSheet, View, FlatList, Button, Image, Text, ScrollView, Pressable, ImageBackground } from 'react-native';
import styles from '../assets/css/Style';
// import svg icons
import CompanyLogo from '../assets/img/mobile/CompanyLogo'
import { useNavigation } from '@react-navigation/native';
import MailIcon from '../assets/img/mobile/MailIcon';
import PhoneIcon from '../assets/img/mobile/PhoneIcon';
import LocationIcon from '../assets/img/mobile/LocationIcon';
import ClockIcon from '../assets/img/mobile/ClockIcon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MainHeader from '../components/nav/MainHeader';
import InvertBlackButton from '../components/buttons/InvertBlackButton';

function ContactUsScreen(props) {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <View style={styles.container}>
                <ImageBackground source={
                    require('../assets/img/mobile/ContactUsBackground.png')
                } style={{ resizeMode: 'contain', width: '100%', height: '80%' }}>
                    <MainHeader/>


                    <View style={{ padding: 10 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Text style={styles.body_title}>
                            {'<'} Contact us:
                        </Text>
                    </TouchableOpacity>
                    </View>

                    <View style={{ paddingHorizontal: 30, marginVertical: 15 }}>

                        <View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Customer Service Contacts:</Text>
                            </View>

                            <View style={{}}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View>
                                        <MailIcon></MailIcon>
                                    </View>
                                    <View style={{ marginLeft: 10 }}>
                                        <Text>info@joshco.co.za</Text>
                                    </View>

                                </View>
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View>
                                        <MailIcon></MailIcon>
                                    </View>
                                    <View style={{ marginLeft: 10 }}>
                                        <Text>Complaints@joshco.co.za</Text>
                                    </View>

                                </View>
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View>
                                        <PhoneIcon></PhoneIcon>
                                    </View>
                                    <View style={{ marginLeft: 10 }}>
                                        <Text>+27 11 406 7300/7362</Text>
                                    </View>

                                </View>
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View>
                                        <LocationIcon></LocationIcon>
                                    </View>
                                    <View style={{ marginLeft: 10 }}>
                                        <Text>61 Juta Street, Braamfontein Johannesburg</Text>
                                    </View>

                                </View>
                            </View>
                        </View>

                        <View style={{ marginVertical: 30 }}>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Office hours:</Text>
                            </View>

                            <View style={{}}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View>
                                        <ClockIcon></ClockIcon>
                                    </View>
                                    <View style={{ marginLeft: 10 }}>
                                        <Text>08:00 - 16:00</Text>
                                    </View>

                                </View>
                            </View>
                        </View>

                        <View >
                            <View style={{ marginBottom: 10 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Leasing Consulting Hours:</Text>
                            </View>

                            <View style={{}}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View>
                                        <ClockIcon></ClockIcon>
                                    </View>
                                    <View style={{ marginLeft: 10 }}>
                                        <Text>08:00 - 15:00</Text>
                                    </View>

                                </View>
                            </View>
                        </View>

                        <View style={{paddingTop:40,alignItems:'center'}}>

                            <InvertBlackButton width={200} height={100} route="Faq" title="VIEW FAQ"/>
                            
                        </View>

                    </View>

                </ImageBackground>
            </View>

        </View>
    );
}

export default ContactUsScreen;