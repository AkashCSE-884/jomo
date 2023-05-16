import { StyleSheet ,View, Text, Pressable } from "react-native";

function GoalItem(props) {

  console.log('props is  => ' + props.text + ' props id  => ' + props.id);

    return (
      <Pressable
        android_ripple={{color:'#444d46'}} 
        onPress={props.OnDeleteItem.bind(this,props)} 
      >
        <View style={styles.goalbox} >
            <Text style={styles.eachGoal} > {
                props.index +'. ' + props.text}
            </Text>
        </View>
      </Pressable>
    );

}

const styles = StyleSheet.create({

  eachGoal: {
    color: '#50c878',
    // marginBottom: 10,
  },
  goalbox:{
    backgroundColor: '#262926',
    marginVertical: 10,
    borderRadius: 5,
    padding:5, 
  }
})


export default GoalItem;