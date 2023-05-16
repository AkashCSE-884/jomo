import { View, Text } from "react-native";
import styles from "../../assets/css/Style";
// import svg icons
import { useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import MainHeader from "../../components/nav/MainHeader";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { useEffect, useState } from "react";
import CheckBox from "expo-checkbox";
import Unorderedlist from "react-native-unordered-list";
import BlackButton from "../../components/buttons/BlackButton";
function ApplicationApprovedPayDep({ navigation }) {
  const [signLeaseFirst, setSignLeaseFirst] = useState(false);
  const [signLeaseSecond, setSignLeaseSecond] = useState(false);
  const [signLeaseThird, setSignLeaseThird] = useState(false);
  let [notificationData, setNotificationData] = useState({});
  let [triggDate, setTriggDate] = useState();
  let payload = {
    notification_id: 142,
    application_id: 47,
    // "application_id": this.state.application_id
  };

  let getProjects = async (area_id) => {
    let fetched = await fetch(
      "http://saap.oservo.com:7777/api/tenant/notification/pop-requested-view",
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
      console.log(
        json_data.notification_data[0].sender_trigger_timestamp.split("T")[0]
      );
      setNotificationData(json_data.ret_data[0]);
      setTriggDate(
        json_data.notification_data[0].sender_trigger_timestamp.split("T")[0]
      );
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

        <ScrollView>
          <View style={{ padding: 10, paddingHorizontal: 20 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Text style={styles.body_title}>
                {"<"} Application Approved, Pay Deposit.
              </Text>
              <Text style={{ fontSize: 18, color: "#231F2099" }}>
                {triggDate}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              paddingHorizontal: 30,
              marginVertical: 30,
              borderBottomColor: "#efefef",
              borderBottomWidth: 2,
              paddingBottom: 30,
            }}
          >
            <View
              style={
                {
                  // borderBottomColor: "#efefef",
                  // borderBottomWidth: 2,
                  // paddingBottom: 30,
                }
              }
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
                    Congratulations!
                  </Text>
                </View>
                <View>
                  <Text
                    style={{ textAlign: "left", fontSize: 18, marginTop: 10 }}
                  >
                    Your application has been approved. Please kindly pay the
                    deposit amount below within 7 days of receiving this
                    notification into JOSHCO's Standard Bank Account and upload
                    proof of payment below.
                  </Text>
                </View>
              </View>
            </View>

            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  marginVertical: 20,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontWeight: "normal", fontSize: 18 }}>
                    Deposit:
                  </Text>
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    {notificationData.bo_request_deposit_amount}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  marginBottom: 20,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontWeight: "normal", fontSize: 18 }}>
                    Reference:
                  </Text>
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    {notificationData.bo_request_deposit_reference}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  marginVertical: 5,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontWeight: "normal", fontSize: 18 }}>
                    Bank:
                  </Text>
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    Standard Bank
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  marginVertical: 5,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontWeight: "normal", fontSize: 18 }}>
                    Branch Code:
                  </Text>
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    000205
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  marginVertical: 5,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontWeight: "normal", fontSize: 18 }}>
                    Account Name:
                  </Text>
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    JOSHCO
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  marginVertical: 5,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontWeight: "normal", fontSize: 18 }}>
                    Account Type:
                  </Text>
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    Cheque
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  marginVertical: 5,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontWeight: "normal", fontSize: 18 }}>
                    Account Number:
                  </Text>
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    000197726
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ marginVertical: 30 }}>
              <View
                style={{
                  borderBottomColor: "#efefef",
                  borderBottomWidth: 2,
                  paddingBottom: 30,
                }}
              >
                <View style={{ marginBottom: 10 }}>
                  <Text
                    style={{
                      textAlign: "left",
                      fontWeight: "bold",
                      fontSize: 18,
                    }}
                  >
                    Upload Proof of Payment.
                  </Text>
                </View>
                <View>
                  <Text style={{ textAlign: "left", fontSize: 18 }}>
                    Please upload the deposit proof of payment below.
                  </Text>
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
                <BlackButton
                  disabled={notificationData.doc_proof_of_payment_upload_tick}
                  width="100%"
                  height={45}
                  title="UPLOAD"
                  route={"ProofOfPaymentUploadDoc"}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default ApplicationApprovedPayDep;
