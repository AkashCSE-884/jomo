import { StyleSheet,TextInput,Button, View, Modal } from "react-native";
import { useState } from 'react';

function GoalInput (props) {

    const [enteredgoaltext,setEnteredgoaltext] = useState('');

    function goalinputhandler (inputxt) { setEnteredgoaltext(inputxt) }

    function addgoalhandler () {

        props.onAddGoal(enteredgoaltext);
        setEnteredgoaltext('');
    }

    return (
        <Modal 
          style={styles.container}
          visible={props.visible}
          animationType="slide"
        >
        <Button  color={'#50c878'}  title="Cancel" onPress={props.onCancel} />

          <View style={styles.inputContainer}> 
              <TextInput
                  value={enteredgoaltext} 
                  style={styles.textInput} 
                  placeholder='Your Course Goal' 
                  onChangeText={goalinputhandler}
                  
              />
              <Button color={'#50c878'} title="Add goal" onPress={addgoalhandler} />
          </View> 
        </Modal>
    )    
}

const styles = StyleSheet.create({
  container: { 
    // width: '100%',
    // height: '100%',
    backgroundColor:'black',
    flex:1,
    paddingTop:50,
    paddingHorizontal:16,
    justifyContent:'center',
  },
  inputContainer: {
    
    backgroundColor:'black',
    color: '#50c878',
    flex:1, 
    justifyContent: 'center',
    alignItems:'center', 
    borderBottomColor: '#50c878',
    borderBottomWidth : 1,
  }, 
  textInput:{
    backgroundColor:'black',
    color:'#50c878',
    borderWidth : 1,
    borderColor: '#50c878', 
    width: '70%',
    marginBottom: 10,

    alignItems:'center',
    padding: 8
  },
})

export default GoalInput;