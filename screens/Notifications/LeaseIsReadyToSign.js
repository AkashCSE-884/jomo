import { View, Text, Alert } from "react-native";
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
import SignLeaseCongrats from "../../components/modals/SignLeaseCongrats";
let payload = {
  notification_id: 142,
  application_id: 47,
  // "application_id": this.state.application_id
};
function LeaseIsReadyToSign({ navigation }) {
  let [notificationData, setNotificationData] = useState({});
  let [retData, setRetData] = useState({});
  let [allInputs, setAllInputs] = useState({});
  const [signLeaseFirst, setSignLeaseFirst] = useState(false);
  const [signLeaseSecond, setSignLeaseSecond] = useState(false);
  const [signLeaseThird, setSignLeaseThird] = useState(false);
  let [currDate, setCurrDate] = useState();
  const [modalAppVisible, setModalAppVisible] = useState(false);

  let setCurrentDate = () => {
    const date = new Date();

    let day =
      JSON.stringify(date.getDate()).length == 1
        ? `0${date.getDate()}`
        : date.getDate();
    let month =
      JSON.stringify(date.getMonth() + 1).length == 1
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    let year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${year}-${month}-${day}`;
    // console.log(currentDate);
    // current_date.value = currentDate
    setCurrDate(currentDate);
  };

  let getProjects = async (area_id) => {
    let fetched = await fetch(
      "http://saap.oservo.com:7777/api/tenant/notification/view-signed-lease-view",
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
      setNotificationData(json_data.notification_data[0]);
      setRetData(json_data.ret_data[0]);
      setSignLeaseFirst(
        json_data.ret_data[0].lease_app_aggrement_condition_1_tick
      );
      setSignLeaseSecond(
        json_data.ret_data[0].lease_app_aggrement_condition_2_tick
      );
      setSignLeaseThird(
        json_data.ret_data[0].lease_app_aggrement_condition_3_tick
      );
      setCurrentDate();
      // setAllInputs(json_data.ret_data[0]);
      // setStarRating(json_data.ret_data[0].a1_rating);
      // setStarRating_2(json_data.ret_data[0].a2_rating);
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
        <SignLeaseCongrats
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
              <Text style={styles.body_title}>
                {"<"} Your lease is ready to sign!
              </Text>
              <Text style={{ fontSize: 15, color: "#231F2099" }}>
                05 Dec 2022
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ paddingHorizontal: 30, marginVertical: 30 }}>
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
                    Congratulations, your lease is ready for you to sign
                  </Text>
                </View>
                <View>
                  <Text
                    style={{ textAlign: "left", fontSize: 18, marginTop: 10 }}
                  >
                    Please read and review the lease below to ensure all
                    information has been filled out correctly and accurately.
                  </Text>
                  <Text style={{ marginTop: 20, fontSize: 18 }}>
                    If everything is correct please digitally sign off on the
                    lease below.
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
                  marginTop: 20,
                }}
              >
                <BlackButton width="100%" height={45} title="View Lease" />
              </View>
            </View>
            <View>
              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <View style={{ marginTop: 5 }}>
                  <CheckBox
                    onValueChange={(bol) => {
                      setSignLeaseFirst(bol);
                      // console.log("clicked", bol);
                      // setAllInputs({
                      //   ...allInputs,
                      //   aggrement_condition_1_tick: bol,
                      // });
                    }}
                    value={signLeaseFirst}
                  />
                </View>

                <View style={{ marginLeft: 10 }}>
                  <Text style={{ fontSize: 18 }}>
                    I the tenant accept all terms and conditions stated in the
                    whole agreement and its related schedules
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <View style={{ marginTop: 5 }}>
                  <CheckBox
                    onValueChange={(bol) => {
                      setSignLeaseSecond(bol);
                      // console.log("clicked", bol);
                      // setAllInputs({
                      //   ...allInputs,
                      //   aggrement_condition_1_tick: bol,
                      // });
                    }}
                    value={signLeaseSecond}
                  />
                </View>

                <View style={{ marginLeft: 10 }}>
                  <Text style={{ fontSize: 18 }}>
                    I agree this acceptance is the same as handwritten
                    signatures for the purposes of validity, enforceability, and
                    admissibility.
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <View style={{ marginTop: 5 }}>
                  <CheckBox
                    onValueChange={(bol) => {
                      setSignLeaseThird(bol);
                      // console.log("clicked", bol);
                      // setAllInputs({
                      //   ...allInputs,
                      //   aggrement_condition_1_tick: bol,
                      // });
                    }}
                    value={signLeaseThird}
                  />
                </View>

                <View style={{ marginLeft: 10 }}>
                  <Text style={{ fontSize: 18 }}>
                    I accept that this is a legally binding document and adhere
                    to all referenced clauses
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 50 }}>
              <View>
                <View>
                  <Text
                    style={{
                      fontWeight: "normal",
                      fontSize: 16,
                      marginTop: 20,
                    }}
                  >
                    Signed By Applicant
                  </Text>
                </View>
                <TextInput
                  placeholder="Place"
                  style={{
                    backgroundColor: "#F2F2F2",
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 10,
                    width: "100%",
                    marginTop: 5,
                  }}
                  value={retData.physical_address_line_1}
                  editable={false}
                />
              </View>
              <View>
                <View>
                  <Text
                    style={{
                      fontWeight: "normal",
                      fontSize: 16,
                      marginTop: 20,
                    }}
                  >
                    On This The
                  </Text>
                </View>
                <TextInput
                  placeholder="DD/MM/YYYY"
                  style={{
                    backgroundColor: "#F2F2F2",
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 10,
                    width: "100%",
                    marginTop: 5,
                  }}
                  value={
                    retData.lease_app_sign_date
                      ? retData.lease_app_sign_date
                      : currDate
                  }
                  editable={false}
                />
              </View>
              <View>
                <View>
                  <Text
                    style={{
                      fontWeight: "normal",
                      fontSize: 16,
                      marginTop: 20,
                    }}
                  >
                    Applicant Signature
                  </Text>
                </View>
                <TextInput
                  placeholder="Digital Signature"
                  style={{
                    backgroundColor: "#F2F2F2",
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 10,
                    width: "100%",
                    marginTop: 5,
                  }}
                  value={retData.name}
                  editable={false}
                />
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
                <PrimaryButton
                  disabled={
                    retData.lease_app_aggrement_condition_1_tick ? true : false
                  }
                  width="100%"
                  height={45}
                  title="Sign Lease"
                  additionalFunc={() => {
                    let payload_for_update = {
                      ...payload,
                      name: retData.name,
                      physical_address_line_1: retData.physical_address_line_1,
                      lease_app_sign_date: retData.lease_app_sign_date,
                      lease_app_aggrement_condition_1_tick: signLeaseFirst,
                      lease_app_aggrement_condition_2_tick: signLeaseSecond,
                      lease_app_aggrement_condition_3_tick: signLeaseThird,
                    };
                    fetch(
                      "http://saap.oservo.com:7777/api/tenant/notification/sign-lease-update",
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
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default LeaseIsReadyToSign;
