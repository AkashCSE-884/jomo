import { View, Text, Alert } from "react-native";
import styles from "../../assets/css/Style";
// import svg icons
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import MainHeader from "../../components/nav/MainHeader";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { useEffect, useState } from "react";
let payload = {
  notification_id: 132,
  application_id: 47,
  // "application_id": this.state.application_id
};

function ApplicationPendingFinalApproval({ navigation }) {
  let [triggDate, setTriggDate] = useState();
  let [retData, setRetData] = useState({});
  let [notificationData, setNotificationData] = useState({});

  let getProjects = async (area_id) => {
    let fetched = await fetch(
      "http://saap.oservo.com:7777/api/tenant/notification/application-pending-approval-view",
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
        <ScrollView>
          <View style={{ padding: 10, paddingHorizontal: 20 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Text style={styles.body_title}>
                {"<"}Application Pending Final Approval
              </Text>
              <Text style={{ fontSize: 15, color: "#231F2099" }}>
                {triggDate}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ paddingHorizontal: 30, marginVertical: 30 }}>
            <View
              style={{
                borderBottomColor: "#efefef",
                borderBottomWidth: 2,
                paddingBottom: 30,
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
                    Pending Final Approval
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
                    {triggDate}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View>
            <View style={{ marginTop: 0 }}>
              <View>
                <Text
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: 18,
                    paddingHorizontal: 30,
                  }}
                >
                  Project:
                </Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text
                  style={{
                    textAlign: "left",
                    fontSize: 18,
                    paddingHorizontal: 30,
                  }}
                >
                  {retData.project_name}
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 15 }}>
              <View>
                <Text
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: 18,
                    paddingHorizontal: 30,
                  }}
                >
                  Address:
                </Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text
                  style={{
                    textAlign: "left",
                    fontSize: 18,
                    paddingHorizontal: 30,
                  }}
                >
                  {`${retData.physical_address_line_1},${retData.physical_address_line_2},${retData.physical_address_line_3}`}
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 15 }}>
              <View>
                <Text
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: 18,
                    paddingHorizontal: 30,
                  }}
                >
                  Unit Type:
                </Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text
                  style={{
                    textAlign: "left",
                    fontSize: 18,
                    paddingHorizontal: 30,
                  }}
                >
                  {retData.unit_type_title}
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 15 }}>
              <View>
                <Text
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: 18,
                    paddingHorizontal: 30,
                  }}
                >
                  Date Submitted:
                </Text>
              </View>
              <View style={{ marginVertical: 10 }}>
                <Text
                  style={{
                    textAlign: "left",
                    fontSize: 18,
                    paddingHorizontal: 30,
                  }}
                >
                  {retData.submission_timestamp.split("T")[0]}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default ApplicationPendingFinalApproval;
