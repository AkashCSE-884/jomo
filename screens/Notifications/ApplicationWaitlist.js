import { View, Text } from "react-native";
import styles from "../../assets/css/Style";
// import svg icons
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MainHeader from "../../components/nav/MainHeader";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { useEffect, useState } from "react";
let payload = { 
  "notification_id": 118,
  "application_id": 47
};
function ApplicationWaitlist({ navigation }) {

  let [notificationData, setNotificationData] = useState({});
  let getProjects = async () => {
    let fetched = await fetch(
      "http://saap.oservo.com:7777/api/tenant/notification/application-waitlisted-view",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...payload,
          limit: 50, 
        }),
      }
    );
    let json_data = await fetched.json();
    if (json_data.error == (null || undefined)) {
      console.log(json_data);
      setNotificationData(json_data.notification_data);
    } else {
      console.log(json_data);
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
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.container}>
        <MainHeader />

        <View style={{ padding: 10, paddingHorizontal: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text style={styles.body_title}>{"<"} Application Waitlisted</Text>
            <Text style={{ fontSize: 15, color: "#231F2099" }}>
              05 Dec 2022
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: 30, marginVertical: 30 }}>
          <View
            style={{
              borderBottomColor: "#efefef",
              borderBottomWidth: 2,
              paddingBottom: 10,
            }}
          >
            <View style={{ marginBottom: 10 }}>
              <View>
                <Text
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  Application Status:
                </Text>
              </View>
              <View>
                <Text style={{ textAlign: "left", fontSize: 18 }}>
                  { notificationData[0].title}
                </Text>
              </View>
            </View>

            <View style={{ marginVertical: 10 }}>
              <View>
                <Text
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  Date:
                </Text>
              </View>
              <View>
                <Text style={{ textAlign: "left", fontSize: 18 }}>
                { notificationData[0].sender_trigger_timestamp}

                </Text>
              </View>
            </View>
          </View>
        </View>

        <View>
          <View style={{}}>
            <View>
              <Text
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: 18,
                  paddingHorizontal: 30,
                }}
              >
               No Units available
              </Text>
            </View>
            <View>
              <Text
                style={{
                  textAlign: "left",
                  fontSize: 18,
                  paddingHorizontal: 30,
                }}
              >
                We have received and reviewed your application but unfortunately there are no vacant units current available. You have been placed on a waitlist and we will contact you when something becomes available.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default ApplicationWaitlist;
