import { useState } from "react";
import { Pressable,StyleSheet ,Text,Modal, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { PrimaryModalButton } from "./ModalButtons";


function Otp(props) {
  // const [modalVisible, setModalVisible] = useState(true);
  let modalVisible = props.vis;
  let onModalPress = props.onModalPress;
  let title = props.title;
  let modalFunc = props.modalFunc;

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            // onRequestClose={() => {
                // Alert.alert('Modal has been closed.');
                // setModalVisible(!modalVisible);
            // }}
            >
            <View style={styles.centeredView}>
              <Pressable style={{height:'100%',flex:1,justifyContent:'center'}} onPress={modalFunc}>
                <View style={styles.modalView}>
                    <Text style={[styles.modalText,{fontSize:20,fontWeight:'bold'}]}>One Time Pin</Text>
                    <View style={{paddingHorizontal:20}}>
                      <Text style={{textAlign:'center'}}>An OTP has been sent to you. Please check for an SMS or email with the OTP. Please enter the OTP below to login.</Text>
                    </View>
                    <View style={{paddingVertical:20,paddingHorizontal:10}}>
                      <View style={{flexDirection:'row'}}>
                        
                        <View style={{width:'20%',marginLeft:10}}>

                        <TextInput
                        style={{backgroundColor:'#F2F2F2',
                                padding:10}}
                        />
                        </View>
                        
                        <View style={{width:'20%',marginLeft:10}}>

                        <TextInput
                        style={{backgroundColor:'#F2F2F2',
                                padding:10}}
                        />
                        </View>
                        
                        <View style={{width:'20%',marginLeft:10}}>

                        <TextInput
                        style={{backgroundColor:'#F2F2F2',
                                padding:10}}
                        />
                        </View>
                        
                        <View style={{width:'20%',marginLeft:10}}>

                        <TextInput
                        style={{backgroundColor:'#F2F2F2',
                                padding:10}}
                        />
                        </View>
                      </View>
                    </View>

                    {/* <Pressable
                        style={[styles.button, styles.buttonClose]}
                        // onPress={() => setModalVisible(!modalVisible)}
                        onPress={onModalPress}
                        >
                        <Text style={styles.textStyle}>Hide Modal</Text>
                    </Pressable> */}
                    <PrimaryModalButton
                    route={onModalPress}
                    title= {title}
                    width={200}
                    height={'auto'}
                    
                    />

                    <View style={{marginTop:10,alignItems:'center'}}>
                      <Text style={{textAlign:'center',color:'#0A040099'}}>Resend OTP</Text>
                    </View>
                </View>
              </Pressable>
            </View>
        </Modal>
    )
}

export default Otp;


const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      marginVertical: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      margin:10,
      backgroundColor: '#FF800C',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });
  