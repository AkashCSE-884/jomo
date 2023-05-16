
import { View, Text } from 'react-native';
import styles from '../assets/css/Style';
// import svg icons 
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MainHeader from '../components/nav/MainHeader';

function EachNotificatonScreen() {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <View style={styles.container}>
                <MainHeader />


                <View style={{ padding: 10 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Text style={styles.body_title}>
                            {'<'} Notifications
                        </Text>
                        <Text style={{ fontSize: 15, color: '#231F2099' }}>05 Dec 2022</Text>
                    </TouchableOpacity>

                </View>

                <View style={{ paddingHorizontal: 30, marginVertical: 30 }}>
                    <View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Please Note:</Text>
                        </View>
                        <View>
                            <Text>Your lease will be expiring in the next 60 days. We are notifying you to make arrangements ahead of time.</Text>
                        </View>
                    </View>

                </View>

                <View style={{ paddingHorizontal: 30 }}>
                    <View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Lease End Date:</Text>
                        </View>
                        <View>
                            <Text>28/02/2023</Text>
                        </View>
                    </View>

                </View>
            </View>

        </View>
    );
}

export default EachNotificatonScreen;