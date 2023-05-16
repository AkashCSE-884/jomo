import { useState } from "react";
import { Pressable, StyleSheet, Text, Modal, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { PrimaryModalButton } from "./ModalButtons";

function DocUploaded(props) {
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
      //     Alert.alert('Modal has been closed.');
      //     setModalVisible(!modalVisible);
      // }}
    >
      <View style={styles.centeredView}>
        <Pressable
          style={{ height: "100%", flex: 1, justifyContent: "center" }}
          onPress={modalFunc}
        >
          <View style={styles.modalView}>
            <Text
              style={[styles.modalText, { fontSize: 20, fontWeight: "bold" }]}
            >
              Documentation Uploaded
            </Text>
            <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
              <Text style={{ textAlign: "center" }}>
                The documentation has been successfully uploaded.
              </Text>
            </View>

            {/* <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}>Hide Modal</Text>
                    </Pressable> */}
            <PrimaryModalButton
              route={onModalPress}
              title={title}
              width={200}
              height={"auto"}
            />
          </View>
        </Pressable>
      </View>
    </Modal>
  );
}

export default DocUploaded;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
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
    backgroundColor: "#FF800C",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
