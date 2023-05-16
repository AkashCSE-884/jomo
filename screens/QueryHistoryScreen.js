import { StyleSheet, View, FlatList, Button, Image, Text, ScrollView, Pressable } from 'react-native';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import styles from '../assets/css/Style';
import QH_style from '../assets/css/QH';
// import svg icons
import CompanyLogo from '../assets/img/mobile/CompanyLogo'
import UserIcon from '../assets/img/mobile/AddUserSvg';
import NotificationIcon from '../assets/img/mobile/NotificationSvgIcon';
import LeaseIcon from '../assets/img/mobile/MyLeaseIcon';
import QueryIcon from '../assets/img/mobile/MyQuerySvgIcon';
import ProjectIcon from '../assets/img/mobile/ProjectSvgIcon';
import InvoiceIcon from '../assets/img/mobile/MyInvoiceIcon';
import DropDownIcon from '../assets/img/mobile/DropDownIcon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MainHeader from '../components/nav/MainHeader';

function QueryHistoryScreen({navigation}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>

            <View style={styles.container}>
                <MainHeader/>

                <View style={{padding:10}}>
                    <View style={{marginTop:10,marginBottom:20}}>
                        <Text style={styles.header_title}>
                        &lsaquo; Query History
                        </Text>
                    </View>
                    <View style={{marginTop:10,marginBottom:10}}>
                        <Text style={styles.header_span}>
                            New Update:
                        </Text>
                    </View>
                </View>

                <View style={{padding:10}}>
                    <Collapse>
                        <CollapseHeader style={[QH_style.collapse_h]}>
                            
                                <View style={[QH_style.shadow,{borderRadius:10,flexDirection:'row',justifyContent:"space-between"}]}>
                                    <View style={{padding:15,}}>
                                        <Text>Query-002 Plumming</Text>
                                    </View>
                                    <View style={{backgroundColor:"#FBAF19",height:'100%',borderTopRightRadius: 10,borderBottomRightRadius: 10,paddingTop:10}}>
                                        <DropDownIcon width="30" height="30"></DropDownIcon>

                                    </View>
                                </View>
                            
                        </CollapseHeader>
                        <CollapseBody style={[QH_style.collapse_b,QH_style.shadow]}>
                        <View >
                            <View style={{flexDirection: "row",flexWrap:"wrap"}}>
                                <View style={QH_style.acc_bdy_info}>
                                    <View>
                                        <Text>Query Type:</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontWeight:"bold", marginLeft:5}}>Plumming</Text>
                                    </View>
                                    
                                </View>
                                
                                <View style={QH_style.acc_bdy_info}>
                                    <View>
                                        <Text>Date Submitted:</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontWeight:"bold", marginLeft:5}}>12/07/23</Text>
                                    </View>
                                    
                                </View>

                                <View style={QH_style.acc_bdy_info}>
                                    <View>
                                        <Text>Status:</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontWeight:"bold", marginLeft:5}}>Resolved</Text>
                                    </View>
                                    
                                </View>

                                <View style={[QH_style.acc_bdy_info]}>
                                    <View>
                                        <Text>Resolved Date:</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontWeight:"bold", marginLeft:5}}>16/07/23</Text>
                                    </View>
                                    
                                </View>
                            </View>
                        </View>
                        </CollapseBody>
                    </Collapse>
                </View>

                <View style={{padding:10}}>
                    <Collapse>
                        <CollapseHeader style={[QH_style.collapse_h]}>
                            
                                <View style={[QH_style.shadow,{borderRadius:10,flexDirection:'row',justifyContent:"space-between"}]}>
                                    <View style={{padding:15,}}>
                                        <Text>Query-002 Plumming</Text>
                                    </View>
                                    <View style={{backgroundColor:"#FBAF19",height:'100%',borderTopRightRadius: 10,borderBottomRightRadius: 10,paddingTop:10}}>
                                        <DropDownIcon width="30" height="30"></DropDownIcon>

                                    </View>
                                </View>
                            
                        </CollapseHeader>
                        <CollapseBody style={[QH_style.collapse_b,QH_style.shadow]}>
                        <View >
                            <View style={{flexDirection: "row",flexWrap:"wrap"}}>
                                <View style={QH_style.acc_bdy_info}>
                                    <View>
                                        <Text>Query Type:</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontWeight:"bold", marginLeft:5}}>Plumming</Text>
                                    </View>
                                    
                                </View>
                                
                                <View style={QH_style.acc_bdy_info}>
                                    <View>
                                        <Text>Date Submitted:</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontWeight:"bold", marginLeft:5}}>12/07/23</Text>
                                    </View>
                                    
                                </View>

                                <View style={QH_style.acc_bdy_info}>
                                    <View>
                                        <Text>Status:</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontWeight:"bold", marginLeft:5}}>Resolved</Text>
                                    </View>
                                    
                                </View>

                                <View style={[QH_style.acc_bdy_info]}>
                                    <View>
                                        <Text>Resolved Date:</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontWeight:"bold", marginLeft:5}}>16/07/23</Text>
                                    </View>
                                    
                                </View>
                            </View>

                            <View>
                                <TouchableOpacity style={{backgroundColor:"#000",padding:10,borderRadius:20}}>
                                    <Text style={{color:"#fff",textAlign:'center',fontSize:15}}>
                                        Escalate
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        </CollapseBody>
                    </Collapse>
                </View>

                <View style={{padding:10}}>
                    <Collapse>
                        <CollapseHeader style={[QH_style.collapse_h]}>
                            
                                <View style={[QH_style.shadow,{borderRadius:10,flexDirection:'row',justifyContent:"space-between"}]}>
                                    <View style={{padding:15,}}>
                                        <Text>Query-002 Plumming</Text>
                                    </View>
                                    <View style={{backgroundColor:"#FBAF19",height:'100%',borderTopRightRadius: 10,borderBottomRightRadius: 10,paddingTop:10}}>
                                        <DropDownIcon width="30" height="30"></DropDownIcon>

                                    </View>
                                </View>
                            
                        </CollapseHeader>
                        <CollapseBody style={[QH_style.collapse_b,QH_style.shadow]}>
                        <View >
                            <View style={{flexDirection: "row",flexWrap:"wrap"}}>
                                <View style={QH_style.acc_bdy_info}>
                                    <View>
                                        <Text>Query Type:</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontWeight:"bold", marginLeft:5}}>Plumming</Text>
                                    </View>
                                    
                                </View>
                                
                                <View style={QH_style.acc_bdy_info}>
                                    <View>
                                        <Text>Date Submitted:</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontWeight:"bold", marginLeft:5}}>12/07/23</Text>
                                    </View>
                                    
                                </View>

                                <View style={QH_style.acc_bdy_info}>
                                    <View>
                                        <Text>Status:</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontWeight:"bold", marginLeft:5}}>Resolved</Text>
                                    </View>
                                    
                                </View>

                                <View style={[QH_style.acc_bdy_info]}>
                                    <View>
                                        <Text>Resolved Date:</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontWeight:"bold", marginLeft:5}}>16/07/23</Text>
                                    </View>
                                    
                                </View>
                            </View>
                        </View>
                        </CollapseBody>
                    </Collapse>
                </View>

                <View style={{padding:10}}>
                    <Collapse>
                        <CollapseHeader style={[QH_style.collapse_h]}>
                            
                                <View style={[QH_style.shadow,{borderRadius:10,flexDirection:'row',justifyContent:"space-between"}]}>
                                    <View style={{padding:15,}}>
                                        <Text>Query-002 Plumming</Text>
                                    </View>
                                    <View style={{backgroundColor:"#FBAF19",height:'100%',borderTopRightRadius: 10,borderBottomRightRadius: 10,paddingTop:10}}>
                                        <DropDownIcon width="30" height="30"></DropDownIcon>

                                    </View>
                                </View>
                            
                        </CollapseHeader>
                        <CollapseBody style={[QH_style.collapse_b,QH_style.shadow]}>
                        <View >
                            <View style={{flexDirection: "row",flexWrap:"wrap"}}>
                                <View style={QH_style.acc_bdy_info}>
                                    <View>
                                        <Text>Query Type:</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontWeight:"bold", marginLeft:5}}>Plumming</Text>
                                    </View>
                                    
                                </View>
                                
                                <View style={QH_style.acc_bdy_info}>
                                    <View>
                                        <Text>Date Submitted:</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontWeight:"bold", marginLeft:5}}>12/07/23</Text>
                                    </View>
                                    
                                </View>

                                <View style={QH_style.acc_bdy_info}>
                                    <View>
                                        <Text>Status:</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontWeight:"bold", marginLeft:5}}>Resolved</Text>
                                    </View>
                                    
                                </View>

                                <View style={[QH_style.acc_bdy_info]}>
                                    <View>
                                        <Text>Resolved Date:</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontWeight:"bold", marginLeft:5}}>16/07/23</Text>
                                    </View>
                                    
                                </View>
                            </View>
                        </View>
                        </CollapseBody>
                    </Collapse>
                </View>

                <View style={{padding:10}}>
                    <Collapse>
                        <CollapseHeader style={[QH_style.collapse_h]}>
                            
                                <View style={[QH_style.shadow,{borderRadius:10,flexDirection:'row',justifyContent:"space-between"}]}>
                                    <View style={{padding:15,}}>
                                        <Text>Query-002 Plumming</Text>
                                    </View>
                                    <View style={{backgroundColor:"#FBAF19",height:'100%',borderTopRightRadius: 10,borderBottomRightRadius: 10,paddingTop:10}}>
                                        <DropDownIcon width="30" height="30"></DropDownIcon>

                                    </View>
                                </View>
                            
                        </CollapseHeader>
                        <CollapseBody style={[QH_style.collapse_b,QH_style.shadow]}>
                        <View >
                            <View style={{flexDirection: "row",flexWrap:"wrap"}}>
                                <View style={QH_style.acc_bdy_info}>
                                    <View>
                                        <Text>Query Type:</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontWeight:"bold", marginLeft:5}}>Plumming</Text>
                                    </View>
                                    
                                </View>
                                
                                <View style={QH_style.acc_bdy_info}>
                                    <View>
                                        <Text>Date Submitted:</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontWeight:"bold", marginLeft:5}}>12/07/23</Text>
                                    </View>
                                    
                                </View>

                                <View style={QH_style.acc_bdy_info}>
                                    <View>
                                        <Text>Status:</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontWeight:"bold", marginLeft:5}}>Resolved</Text>
                                    </View>
                                    
                                </View>

                                <View style={[QH_style.acc_bdy_info]}>
                                    <View>
                                        <Text>Resolved Date:</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontWeight:"bold", marginLeft:5}}>16/07/23</Text>
                                    </View>
                                    
                                </View>
                            </View>
                        </View>
                        </CollapseBody>
                    </Collapse>
                </View>

            </View>

        </View>
    );
}

export default QueryHistoryScreen;