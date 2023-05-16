import { useNavigation } from "@react-navigation/native";
import { Text, Pressable, View, Image } from "react-native";
import styles from '../../assets/css/Style';
import CompanyLogo from "../../assets/img/mobile/CompanyLogo";

function MainHeader(props) {

    const navigation = useNavigation();
    return (

        <View style={styles.nav}>
            <View style={styles.nav_logo}>
                <Pressable style={{ width: 150, height: 80 }} onPress={() => navigation.navigate('Home')}>
                    <CompanyLogo width="100" height="80" />
                </Pressable>
            </View>

            <View style={styles.nav_logo}>
                <Pressable style={{ alignItems: 'center', justifyContent: 'center', width: 150, height: 80, paddingLeft: 80 }} onPress={() => navigation.toggleDrawer()}>
                    <Image source={require('../../assets/img/mobile/mobile_menu_toggler.png')} style={{ alignContent: 'center', width: 20, height: 20 }} />
                </Pressable>
            </View>

        </View>


    );
}

export default MainHeader;