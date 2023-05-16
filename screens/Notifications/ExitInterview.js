import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import styles from "../../assets/css/Style";
import { useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import MainHeader from "../../components/nav/MainHeader";
import { Path, Svg } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { Alert } from "react-native";
import ExitInterviewThankYou from "../../components/modals/ExitInterviewThankYou";
let payload = {
  notification_id: 142,
  // "application_id": this.state.application_id
};

function ExitInterview(props) {
  const navigation = useNavigation();
  let [exitInterviewData, setExitInterviewData] = useState({});
  let [allInputs, setAllInputs] = useState({});
  const [starRating, setStarRating] = useState(null);
  const [starRating_2, setStarRating_2] = useState(null);
  const [modalAppVisible, setModalAppVisible] = useState(false);

  let getProjects = async (area_id) => {
    let fetched = await fetch(
      "http://saap.oservo.com:7777/api/tenant/notification/exit-interview-view",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...payload,
          // offset: 0,
          limit: 50,
          // opt__area_id: area_id,
        }),
      }
    );
    let json_data = await fetched.json();
    if (json_data.error == (null || undefined)) {
      // setAllNotification(json_data.ret_data);
      // console.log("FROM getProjects");
      console.log(json_data.ret_data);
      setExitInterviewData(json_data.ret_data[0]);
      setAllInputs(json_data.ret_data[0]);
      setStarRating(json_data.ret_data[0].a1_rating);
      setStarRating_2(json_data.ret_data[0].a2_rating);
    } else {
      // console.log(json_data);
      Alert.alert("Error", "Something went wrong", [
        // {
        //   text: "Cancel",
        //   onPress: () => console.log("Cancel Pressed"),
        //   style: "cancel",
        // },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };
  useEffect(() => {
    getProjects();
  }, []);
  const styles_rating = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      // alignItems: "center",
      // justifyContent: "center",
      padding: 20,
    },
    heading: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
    },
    stars: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
    },
    starUnselected: {
      color: "#aaa",
    },
    starSelected: {
      color: "#FBAF19",
    },
  });
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.container}>
        <MainHeader />
        <ExitInterviewThankYou
          vis={modalAppVisible}
          onModalPress={() => {
            setModalAppVisible(!modalAppVisible);
            //  navigation.navigate('Home');
          }}
          width={200}
          height="auto"
          title="CLOSE"
          modalFunc={() => {
            setModalAppVisible(false);
            console.log("clicked");
          }}
        />
        <ScrollView>
          <View style={{ padding: 10, paddingHorizontal: 20 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Text style={styles.body_title}>{"<"} Exit Interview</Text>
              {/* <Text style={{ fontSize: 15, color: "#231F2099" }}>
                {exitInterviewData.}
              </Text> */}
            </TouchableOpacity>
          </View>

          <View style={{ paddingHorizontal: 30, marginVertical: 30 }}>
            <View>
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  Your feedback is incredibly valuable and important to us!
                </Text>
              </View>
              <View>
                <Text>
                  Please tell us what you think and how we can improve our
                  processes by completing our exit interview below.
                </Text>
              </View>
            </View>
            <View>
              <View>
                <View style={{ marginVertical: 10 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    1. How would you rate your stay in the JOSHCO Property?
                  </Text>
                </View>
              </View>
              <View style={styles_rating.stars}>
                <TouchableOpacity onPress={() => setStarRating(1)}>
                  <MaterialIcons
                    name={starRating >= 1 ? "star" : "star-border"}
                    size={32}
                    style={
                      starRating >= 1
                        ? styles_rating.starSelected
                        : styles_rating.starUnselected
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStarRating(2)}>
                  <MaterialIcons
                    name={starRating >= 2 ? "star" : "star-border"}
                    size={32}
                    style={
                      starRating >= 2
                        ? styles_rating.starSelected
                        : styles_rating.starUnselected
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStarRating(3)}>
                  <MaterialIcons
                    name={starRating >= 3 ? "star" : "star-border"}
                    size={32}
                    style={
                      starRating >= 3
                        ? styles_rating.starSelected
                        : styles_rating.starUnselected
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStarRating(4)}>
                  <MaterialIcons
                    name={starRating >= 4 ? "star" : "star-border"}
                    size={32}
                    style={
                      starRating >= 4
                        ? styles_rating.starSelected
                        : styles_rating.starUnselected
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStarRating(5)}>
                  <MaterialIcons
                    name={starRating >= 5 ? "star" : "star-border"}
                    size={32}
                    style={
                      starRating >= 5
                        ? styles_rating.starSelected
                        : styles_rating.starUnselected
                    }
                  />
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 18 }}>
                  We'd love to hear from you:
                </Text>
                <View>
                  <TextInput
                    style={{
                      backgroundColor: "#F2F2F2",
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      borderRadius: 10,
                      width: "100%",
                      marginTop: 10,
                      textAlignVertical: "top",
                    }}
                    onChangeText={(text) => {
                      setAllInputs({ ...allInputs, a1_note: text });
                    }}
                    multiline={true}
                    numberOfLines={6}
                    placeholder="Type your message here"
                    editable={true}
                    defaultValue={exitInterviewData.a1_note || ""}
                  />
                </View>
              </View>
            </View>
            <View>
              <View>
                <View style={{ marginVertical: 10 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    2. How would you rate the entire JOSHCO experience?
                  </Text>
                </View>
              </View>
              <View style={styles_rating.stars}>
                <TouchableOpacity onPress={() => setStarRating_2(1)}>
                  <MaterialIcons
                    name={starRating_2 >= 1 ? "star" : "star-border"}
                    size={32}
                    style={
                      starRating_2 >= 1
                        ? styles_rating.starSelected
                        : styles_rating.starUnselected
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStarRating_2(2)}>
                  <MaterialIcons
                    name={starRating_2 >= 2 ? "star" : "star-border"}
                    size={32}
                    style={
                      starRating_2 >= 2
                        ? styles_rating.starSelected
                        : styles_rating.starUnselected
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStarRating_2(3)}>
                  <MaterialIcons
                    name={starRating_2 >= 3 ? "star" : "star-border"}
                    size={32}
                    style={
                      starRating_2 >= 3
                        ? styles_rating.starSelected
                        : styles_rating.starUnselected
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStarRating_2(4)}>
                  <MaterialIcons
                    name={starRating_2 >= 4 ? "star" : "star-border"}
                    size={32}
                    style={
                      starRating_2 >= 4
                        ? styles_rating.starSelected
                        : styles_rating.starUnselected
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStarRating_2(5)}>
                  <MaterialIcons
                    name={starRating_2 >= 5 ? "star" : "star-border"}
                    size={32}
                    style={
                      starRating_2 >= 5
                        ? styles_rating.starSelected
                        : styles_rating.starUnselected
                    }
                  />
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 18 }}>
                  Let us know what you think:
                </Text>
                <View>
                  <TextInput
                    style={{
                      backgroundColor: "#F2F2F2",
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      borderRadius: 10,
                      width: "100%",
                      marginTop: 10,
                      textAlignVertical: "top",
                    }}
                    onChangeText={(text) => {
                      setAllInputs({ ...allInputs, a2_note: text });
                    }}
                    multiline={true}
                    numberOfLines={6}
                    placeholder="Type your message here"
                    editable={true}
                    defaultValue={exitInterviewData.a2_note || ""}
                  />
                </View>
              </View>
            </View>
          </View>

          <View>
            <View
              style={{
                marginRight: "auto",
                marginLeft: "auto",
                width: "80%",
                marginBottom: 10,
              }}
            >
              <PrimaryButton
                width="100%"
                height="100%"
                title="SUBMIT"
                additionalFunc={() => {
                  setAllInputs({
                    ...allInputs,
                    ...payload,
                    a1_rating: starRating,
                    a2_rating: starRating_2,
                  });
                  let payload_for_update = {
                    ...allInputs,
                    ...payload,
                    a1_rating: starRating,
                    a2_rating: starRating_2,
                  };
                  console.log(payload_for_update);
                  fetch(
                    "http://saap.oservo.com:7777/api/tenant/notification/exit-interview-update",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(payload_for_update),
                    }
                  )
                    .then((data) => {
                      if (!data.ok) {
                        throw Error(data.status);
                      }
                      console.log(data);

                      return data.json();
                    })
                    .then((json_data) => {
                      if (json_data.error == (null || undefined)) {
                        console.log(json_data);
                        setModalAppVisible(!modalAppVisible);
                      } else {
                        console.log(json_data);
                        Alert.alert("Error", "Something went wrong", [
                          // {
                          //   text: "Cancel",
                          //   onPress: () => console.log("Cancel Pressed"),
                          //   style: "cancel",
                          // },
                          {
                            text: "OK",
                            onPress: () => console.log("OK Pressed"),
                          },
                        ]);
                      }
                    });
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default ExitInterview;
