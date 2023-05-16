import { StyleSheet, View, FlatList, Button, Image, Text, ScrollView, Pressable } from 'react-native';
// import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import styles from '../assets/css/Style';

import CompanyLogo from '../assets/img/mobile/CompanyLogo'
import UserIcon from '../assets/img/mobile/AddUserSvg';
import NotificationIcon from '../assets/img/mobile/NotificationSvgIcon';
import LeaseIcon from '../assets/img/mobile/MyLeaseIcon';
import QueryIcon from '../assets/img/mobile/MyQuerySvgIcon';
import ProjectIcon from '../assets/img/mobile/ProjectSvgIcon';
import InvoiceIcon from '../assets/img/mobile/MyInvoiceIcon';
import DropDownIcon from '../assets/img/mobile/DropDownIcon';
import SearchIcon from '../assets/img/mobile/SearchIcon';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

function InvoiceScreen({navigation}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <View style={styles.container}>

                <View style={styles.nav}>
                            <View style={styles.nav_logo}>

                                <Pressable style={{ width: 150, height: 80 }} onPress={() => navigation.navigate('Notifications')}>
                                    <CompanyLogo width="100" height="80" />
                                </Pressable>
                            </View>

                            <View style={styles.nav_logo}>

                                <Pressable style={{ alignItems: 'center', justifyContent: 'center', width: 150, height: 80, paddingLeft: 80 }} onPress={() => navigation.toggleDrawer()}>
                                    <Image source={require('../assets/img/mobile/mobile_menu_toggler.png')} style={{ alignContent: 'center', width: 20, height: 20 }} />
                                </Pressable>
                            </View>

                </View>

                <View style={{padding:10,flexDirection:'row',marginTop:10,marginBottom:20,alignItems:"center",justifyContent:'space-between'}}>
                    <View style={{marginVertical:'auto'}}>
                        <Text style={[styles.header_title,{}]}>
                            Invoice
                        </Text>
                    </View>
                    <View style={{flexDirection:'row',marginVertical:'auto'}}>
                        <View>
                            <TextInput 
                            style={{
                                backgroundColor:'#F2F2F2',
                                paddingHorizontal: 15,
                                paddingVertical:10,
                                borderBottomLeftRadius:10,
                                borderTopLeftRadius:10,
                                width:120
                            }}
                            placeholder='Search'/>
                        </View>
                        <View style={{backgroundColor:"#FBAF19",borderTopRightRadius: 10,borderBottomRightRadius: 10,paddingTop:14,paddingHorizontal:10}}>
                            <SearchIcon width="20" height="20"></SearchIcon>

                        </View>
                    </View>
                </View>

            </View>

        </View>
    );
}

export default InvoiceScreen;