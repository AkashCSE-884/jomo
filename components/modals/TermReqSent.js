import { useState } from "react";
import { Pressable } from "react-native";
import { Alert } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { Modal, View } from "react-native";
import { BlackModalButton, RedModalButton } from "./ModalButtons";


function TermReqSent(props) {
    // const [modalTermReqSentVisible, setModalTermReqSentVisible] = useState(true);
    let modalVisible = props.vis;
    let onModalPress = props.onModalPress;
    let title = props.title;
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
                <Pressable style={{ height: '100%', flex: 1, justifyContent: 'center' }} onPress={modalFunc}>
                    <View style={styles.modalView}>
                        <Text style={{ fontSize: 20, textAlign: 'center', color: '#BB2200' }}>REQUEST SENT</Text>

                        <Text style={{ fontSize: 15, textAlign: 'center', padding: 10 }}>Your request to terminate your lease has been sent. We will notify you when your lease has been successfully terminated with an effective date.
                        </Text>
                        {/* <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable> */}
                        <BlackModalButton
                            route={onModalPress}
                            title={title}
                            width={200}
                            height={'auto'}
                        />
                        {/* <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>YES</Text>
                        </Pressable> */}
                    </View>
                </Pressable>
            </View>
        </Modal>
    )
}

export default TermReqSent;


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
