import { useState } from "react";
import { Pressable } from "react-native";
import { Alert } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { Modal, View } from "react-native";
import { BlackModalButton, RedModalButton } from "./ModalButtons";


function TerminateLease(props) {
    // const [modalTermLeaseVisible, setModalTermLeaseVisible] = useState(true);
    let modalVisible = props.vis;
    let onModalCancelPress = props.onModalCancelPress;
    let onModalYesPress = props.onModalYesPress;
    let titleCancel = props.titleCancel;
    let titleYes = props.titleYes;
    let modalFunc = props.modalFunc;

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            // onRequestClose={() => {
            //     Alert.alert('Modal has been closed.');
            //     setModalVisible(!modalVisible);
            // }}
            >
            <View style={styles.centeredView}>
                <Pressable style={{height:'100%',flex:1,justifyContent:'center'}} onPress={modalFunc}>
                    <View style={styles.modalView}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>TERMINATE LEASE!</Text>

                        <Text style={{ fontSize: 15, textAlign: 'center', padding: 10 }}>Are you sure you want to terminate your lease? You must provide a calendar's month notice.
                        </Text>
                        {/* <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable> */}
                        <View style={{flexDirection:'row'}}>

                        <View>
                            <BlackModalButton
                            route={onModalCancelPress}
                            title= {titleCancel}
                            width={150}
                            height={'auto'}
                            />
                        </View>
                        {/* <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>YES</Text>
                        </Pressable> */}
                        <View>
                            <RedModalButton 
                            route={onModalYesPress}
                            title= {titleYes}
                            width={150}
                            height={'auto'}
                            />
                        </View>
                        </View>
                    </View>
                </Pressable>
            </View>
        </Modal>
    )
}

export default TerminateLease;


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
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
        margin: 10,
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
