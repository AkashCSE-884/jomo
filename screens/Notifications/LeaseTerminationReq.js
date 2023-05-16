import { View, Text } from "react-native";
import styles from "../../assets/css/Style";
// import svg icons
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MainHeader from "../../components/nav/MainHeader";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { useEffect, useState } from "react";
let payload = {
  notification_id: 141,
  application_id: 47,
  // "application_id": this.state.application_id
};

function LeaseTerminationReq({ navigation }) {
  let [triggDate, setTriggDate] = useState();
  let [retData, setRetData] = useState({});
  let [notificationData, setNotificationData] = useState({});

  let getProjects = async (area_id) => {
    let fetched = await fetch(
      "http://saap.oservo.com:7777/api/tenant/notification/lease-termination-req-view",
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
      setNotificationData(json_data.notification_data[0]);
      setRetData(json_data.ret_data[0]);
      setTriggDate(
        json_data.notification_data[0].sender_trigger_timestamp.split("T")[0]
      );
    } else {
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
            <Text style={styles.body_title}>
              {"<"} Lease Termination Request
            </Text>
            <Text style={{ fontSize: 15, color: "#231F2099" }}>
              {triggDate}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: 30, marginVertical: 20 }}>
          <View>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Lease termination request successful!
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 18 }}>
                Your request to terminate your lease has been approved. Your one
                calendar month will start from the below effective date. Please
                ensure you have moved out within the one calendar month.
              </Text>
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 30 }}>
          <View>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Effective Date:
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 16 }}>
                {retData.lease_termination_date}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default LeaseTerminationReq;
