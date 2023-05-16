import { StyleSheet, View, FlatList, Button, Image, Text } from 'react-native';
import { useState } from 'react';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {

  const [coursegoals, setCoursegoals] = useState([]);
  let [modalIsVisible, setModalVisible] = useState(false);


  function startAddGoalhandler() {
    setModalVisible(true);
  }

  function endAddGoalhandler() {
    setModalVisible(false);
  }

  // for adding each goal 
  function addgoalhandler(enteredgoaltext) {

    setCoursegoals(currentcoursegoal =>
      [...currentcoursegoal, { text: enteredgoaltext, key: Math.random().toString() }]
    );
    endAddGoalhandler();
  }


  // for deleting each goal
  function deleteGoalHandler(props) {
    console.log(props.id + ' <= linked to => ' + props.text);
    console.log(coursegoals);

    setCoursegoals(allGoals => {
      return allGoals.filter((eachgoal) => eachgoal.key !== props.id);
    })

  }

  return (
    <View style={styles.container}>

      <Button
        title=' Add New Goal '
        color="#50c878"
        onPress={startAddGoalhandler}

      />
      <GoalInput onAddGoal={addgoalhandler} visible={modalIsVisible} onCancel={endAddGoalhandler} />

      <View style={styles.golasContainer}>
        <FlatList
          data={coursegoals}
          renderItem={(itemData) => {

            return (
              <GoalItem

                id={itemData.item.key}
                text={itemData.item.text}
                index={itemData.index}
                OnDeleteItem={deleteGoalHandler}
              />
            )
          }}

        />
      </View>


      <View style={styles.footer}>


        <Image style={styles.img} source={require('./assets/splash.png')} />
        <Text style={{ color: 'white', textAlign: 'center', paddingVertical: 10, }}>   Powered With Expo </Text>


      </View>

    </View>
  );


}


const styles = StyleSheet.create({
  container: {
    // width: '100%',
    // height: '100%',
    backgroundColor: 'black',
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },

  golasContainer: {
    color: '#50c878',
    flex: 5
  },

  img: {
    width: 200,
    height: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
  },


});
