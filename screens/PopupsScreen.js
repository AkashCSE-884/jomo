import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, ScrollView } from 'react-native';
import PrimaryButton from '../components/buttons/PrimaryButton';
import MainHeader from '../components/nav/MainHeader';
import custom_styles from '../assets/css/Style';


const PopUps = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (


    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>

      < View style={custom_styles.container} >

        <MainHeader />


        <ScrollView style={custom_styles.scroll_home} >
          <View style={custom_styles.container}>
            

            {/* <View style={{ alignItems: 'center' }}>

              <PrimaryButton title="Some Modal" width={150} height={200} />

            </View> */}

            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisible(true)}>
              <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisible(true)}>
              <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable>

          </View>
        </ScrollView>

      </View >
    </View>
  );



};

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

export default PopUps;