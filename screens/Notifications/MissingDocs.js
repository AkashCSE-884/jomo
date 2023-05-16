import { View, Text } from "react-native";
import styles from "../../assets/css/Style";
// import svg icons
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import MainHeader from "../../components/nav/MainHeader";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { useState, useEffect } from "react";
import CheckBox from "expo-checkbox";
import Unorderedlist from "react-native-unordered-list";
import BlackButton from "../../components/buttons/BlackButton";
let payload = {
  notification_id: 143,
  application_id: 47,
  // "application_id": this.state.application_id
};

function MissingDocs({ navigation }) {
  let [triggDate, setTriggDate] = useState();
  let [retData, setRetData] = useState({});
  let [notificationData, setNotificationData] = useState({});
  let [docList, setDocList] = useState([]);
  let [docTickList, setDocTickList] = useState([]);

  let getProjects = async (area_id) => {
    let fetched = await fetch(
      "http://saap.oservo.com:7777/api/tenant/notification/application-missing-docs-view",
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
      // console.log(
      //   json_data.notification_data[0].sender_trigger_timestamp.split("T")[0]
      // );
      setNotificationData(json_data.notification_data[0]);
      setRetData(json_data.ret_data[0]);
      setTriggDate(
        json_data.notification_data[0].sender_trigger_timestamp.split("T")[0]
      );
      getMissingDocs();
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
  let getMissingDocs = () => {
    let prop_array = [
      "doc_6m_bank_statement__request_tick",
      "doc_birth_certificates_of_dependents__request_tick",
      "doc_certifed_id_copy__request_tick",
      "doc_certified_spo_id_copy__request_tick",
      "doc_ck_document__request_tick",
      "doc_informal_employment_affidavit__request_tick",
      "doc_latest_payslip__request_tick",
      "doc_letter_of_employment__request_tick",
      "doc_marriage_certificate__request_tick",
      "doc_proof_of_address__request_tick",
      "doc_spo_6m_bank_statement__request_tick",
    ];
    let title_array = [
      "6 Month Bank Statement",
      "Birth Certificates of Dependents",
      "Certified ID Copy",
      "Certified Spouse ID Copy",
      "CK Document",
      "Informal Employment Affidavit",
      "Latest Payslip (Affidavit for self-employed)",
      "Letter of Employment",
      "Marriage Certificate",
      "Proof Of Adress",
      "Spouse 6 Month Bank Statement",
    ];
    let lists = [];
    let ticks = [];
    prop_array.forEach((e, indx) => {
      if (!retData[e]) {
        // console.log('adding')
        // lists += `<li>${title_array[indx]}</li>`;
        lists.push(title_array[indx]);
        ticks.push(prop_array[indx]);
      }
    });
    console.log("HERE ARE THE LISTS", lists);
    setDocList(lists);
    setDocTickList(ticks);
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
              <Text style={styles.body_title}>{"<"} Missing Documentation</Text>
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
                    A Unit is available!
                  </Text>
                </View>
                <View>
                  <Text
                    style={{ textAlign: "left", fontSize: 18, marginTop: 10 }}
                  >
                    A unit has become available and you have been taken off of
                    the waitlist. Please confirm that your information has not
                    change and is still correct, if any information has changed
                    please edit your application accordingly
                  </Text>
                </View>
              </View>

              <View>
                <View>
                  {/* <Unorderedlist
                    bulletUnicode={0x2022}
                    style={{ fontSize: 20 }}
                  >
                    <Text style={{ marginTop: 3 }}>Birth Certificate</Text>
                  </Unorderedlist>
                  <Unorderedlist
                    bulletUnicode={0x2022}
                    style={{ fontSize: 20 }}
                  >
                    <Text style={{ marginTop: 3 }}>Proof Of Address</Text>
                  </Unorderedlist> */}
                  {docList.map((e) => {
                    return (
                      <Unorderedlist
                        bulletUnicode={0x2022}
                        style={{ fontSize: 20 }}
                      >
                        <Text style={{ marginTop: 3 }}>{e}</Text>
                      </Unorderedlist>
                    );
                  })}
                </View>
              </View>
            </View>
            <View>
              <View
                style={{
                  marginRight: "auto",
                  marginLeft: "auto",
                  width: "80%",
                  marginTop: 20,
                }}
              >
                <BlackButton
                  width="100%"
                  height={45}
                  title="UPLOAD"
                  additionalFunc={() => {
                    navigation.navigate("MissingUploadDoc", {
                      docList: docList,
                      tickList: docTickList,
                    });
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default MissingDocs;
