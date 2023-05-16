import {
  StyleSheet,
  View,
  FlatList,
  Button,
  Image,
  Text,
  ScrollView,
  Pressable,
  ImageBackground,
} from "react-native";
import styles from "../assets/css/Style";
// import svg icons
import CompanyLogo from "../assets/img/mobile/CompanyLogo";
import { useNavigation } from "@react-navigation/native";
import MailIcon from "../assets/img/mobile/MailIcon";
import PhoneIcon from "../assets/img/mobile/PhoneIcon";
import LocationIcon from "../assets/img/mobile/LocationIcon";
import ClockIcon from "../assets/img/mobile/ClockIcon";
import ShowHideIcon from "../assets/img/mobile/ShowHideIcon";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import MainHeader from "../components/nav/MainHeader";
import ApplicationStepTwo from "./ApplicationStepTwo";
import CheckBox from "expo-checkbox";
import PrimaryButton from "../components/buttons/PrimaryButton";
import InvertBlackButton from "../components/buttons/InvertBlackButton";
import DocIcon from "../assets/img/mobile/DocIcon";
import AppSaved from "../components/modals/AppSaved";
import { PrimaryModalButton } from "../components/modals/ModalButtons";
import AppSent from "../components/modals/AppSent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useValidation } from "react-native-form-validator";

function ApplicationStepFive({ navigation }) {
  const [modalAppSentVisible, setModalAppSentVisible] = useState(false);

  const [modalAppSavedVisible, setModalAppSavedVisible] = useState(false);

  const [isCheckedFirst, setCheckedFirst] = useState(false);

  const [isCheckedSecond, setCheckedSecond] = useState(false);

  const [isCheckedThird, setCheckedThird] = useState(false);

  let [stepData, setStepData] = useState({});

  // let [allInputs, setAllInputs] = useState({});
  let [allInputs, setAllInputs] = useState({
    property_id: 9,
    application_id: 1,
    step: "final",
  });

  let get_data_from_storage = async (key) => {
    if (key == (undefined || null)) {
      console.log("key is null");
    } else {
      let sto_data = await AsyncStorage.getItem(key);
      return sto_data;
    }
  };

  let set_data_to_storage = async (key, value) => {
    const jsonValue = JSON.stringify(value);
    return await AsyncStorage.setItem(key, jsonValue);
  };

  let getStepData = async () => {
    let app_id = await get_data_from_storage("@application_id");
    let property_id = await get_data_from_storage("@property_id");
    console.log("From 60", app_id);
    let fetched = await fetch(
      "http://saap.oservo.com:7777/api/tenant/application/view-partial",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          application_id: app_id,
          step: "final",
        }),
      }
    );
    let json_data = await fetched.json();
    console.log(json_data.ret_data[0]);

    setStepData(json_data.ret_data[0]);

    setAllInputs({
      ...allInputs,
      property_id: property_id,
      application_id: app_id,
      ...stepData,
    });
  };

  useEffect(() => {
    getStepData();
  }, []);
  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
    useValidation({
      state: {
        ...allInputs,
        isCheckedFirst,
        isCheckedSecond,
        isCheckedThird,

        //  email, number, date, newPassword, confirmPassword
      },
    });

  const _onPressButton = () => {
    // console.log("running validation start");
    validate({
      isCheckedFirst: { required: true },
      isCheckedSecond: { required: true },
      isCheckedThird: { required: true },

      // email: { email: true },
      // number: { numbers: true },
      // date: { date: 'YYYY-MM-DD' },
      // confirmPassword: { equalPassword: newPassword },
    });

    // console.log(getErrorMessages());
    // console.log("running validation end");
    return getErrorMessages();
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.container}>
        <MainHeader />
        <AppSaved
          vis={modalAppSavedVisible}
          onModalPress={() => {
            setModalAppSavedVisible(!modalAppSavedVisible);
            //  navigation.navigate('Home');
          }}
          title="CLOSE"
          modalFunc={() => {
            setModalAppSentVisible(false);
            setModalAppSavedVisible(false);
            console.log("clicked");
          }}
        />
        <AppSent
          vis={modalAppSentVisible}
          onModalPress={() => {
            setModalAppSentVisible(!modalAppSentVisible);
            navigation.navigate("Home");
          }}
          title="CLOSE"
          modalFunc={() => {
            setModalAppSentVisible(false);
            setModalAppSavedVisible(false);
            console.log("clicked");
          }}
        />
        <ScrollView>
          <View style={{ padding: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate("App4")}>
              <Text style={styles.body_title}>
                &lsaquo; Application - Final Step
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingHorizontal: 25 }}>
            <View style={{ marginTop: 20, paddingBottom: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                I agree and confirm that:
              </Text>
              <Text style={{ fontSize: 15 }}>
                All the fields marked with an * are required to continue
              </Text>
            </View>

            <View style={{ marginTop: 10 }}>
              <View style={{ flexDirection: "row" }}>
                <View>
                  <CheckBox
                    onValueChange={(bol) => {
                      setCheckedFirst(bol);
                      console.log("clicked", bol);
                      setAllInputs({
                        ...allInputs,
                        aggrement_condition_1_tick: bol,
                      });
                    }}
                    value={
                      stepData.aggrement_condition_1_tick
                        ? stepData.aggrement_condition_1_tick
                        : isCheckedFirst
                    }
                  />
                </View>
                <View>
                  {/* <Text style={{ color: "red" }}> from text field </Text> */}
                  <Text style={{ color: "red" }}>
                    {getErrorsInField("isCheckedFirst")}
                  </Text>
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ fontSize: 18 }}>
                    *All information provided in the Application Form is true,
                    correct and complete.
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <View style={{ flexDirection: "row" }}>
                <View>
                  <CheckBox
                    onValueChange={(bol) => {
                      setCheckedSecond(bol);
                      console.log("clicked", bol);
                      setAllInputs({
                        ...allInputs,
                        aggrement_condition_2_tick: bol,
                      });
                    }}
                    value={
                      stepData.aggrement_condition_2_tick
                        ? stepData.aggrement_condition_2_tick
                        : isCheckedSecond
                    }
                  />
                </View>
                <View>
                  {/* <Text style={{ color: "red" }}> from text field </Text> */}
                  <Text style={{ color: "red" }}>
                    {getErrorsInField("isCheckedSecond")}
                  </Text>
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ fontSize: 18 }}>
                    *Johannesburg social housing company can collect and process
                    my personal information from external and public sources,
                    where lawful and reasonable for credit, fraud, Identify,
                    address, Income, and compliance purposes.
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <View style={{ flexDirection: "row" }}>
                <View>
                  <CheckBox
                    onValueChange={(bol) => {
                      setCheckedThird(bol);
                      console.log("clicked", bol);
                      setAllInputs({
                        ...allInputs,
                        aggrement_condition_3_tick: bol,
                      });
                    }}
                    value={
                      stepData.aggrement_condition_3_tick
                        ? stepData.aggrement_condition_3_tick
                        : isCheckedThird
                    }
                  />
                </View>
                <View>
                  {/* <Text style={{ color: "red" }}> from text field </Text> */}
                  <Text style={{ color: "red" }}>
                    {getErrorsInField("isCheckedThird")}
                  </Text>
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ fontSize: 18 }}>
                    *I have read and understood the{" "}
                    <Text
                      style={{
                        fontWeight: "bold",
                        textDecorationLine: "underline",
                      }}
                    >
                      declarations
                    </Text>
                    set out by the Johannesburg Social Housing Company.
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
                paddingVertical: 20,
              }}
            >
              <View style={{ width: "50%" }}>
                {/* <InvertBlackButton
                  width="100%"
                  height="100%"
                  title="SAVE"
                  additionalFunc={() => {
                    console.log("testing");
                  }}
                /> */}
                <View style={styles.nav_logo}>
                  <TouchableOpacity
                    style={{ width: 120, height: 50 }}
                    onPress={() =>
                      // navigation.navigate(route)

                      {
                        if (_onPressButton() == "") {
                          setModalAppSavedVisible(!modalAppSavedVisible);
                          console.log(allInputs);
                          get_data_from_storage("@login_cookie")
                            .then((res) => {
                              // console.log("FROM ASYNC", res);
                              setAllInputs({
                                ...allInputs,
                              });

                              return res;
                            })
                            .then((sto) => {
                              return fetch(
                                "http://saap.oservo.com:7777/api/tenant/application/update-partial",
                                {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify(allInputs),
                                }
                              );
                            })

                            .then((data) => {
                              if (!data.ok) {
                                throw Error(data.status);
                              }
                              console.log(data);

                              return data.text();
                            })
                            .then((res) => {
                              console.log(res);
                              // return AsyncStorage.getItem("@storage_Key");
                              return get_data_from_storage("@application_id");
                              //redirect to the next from
                              // if (redirect_status == true) {
                              //   window.location.href = "/tenant/application/step/two";
                              // }
                            })
                            .then((data) => {
                              // console.log(data);
                              return fetch(
                                "http://saap.oservo.com:7777/api/tenant/application/finish",
                                {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify(data),
                                }
                              );
                            })
                            .then((data) => {
                              if (!data.ok) {
                                throw Error(data.status);
                              }
                              console.log("ok data", data);
                              return data.json();
                            })
                            .then((res) => {
                              console.log("finished", res);
                              //redirect to the next from
                              // if (redirect_status == true) {
                              //   // window.location.href = "/tenant/application/step/three";
                              // }
                            });
                        } else {
                          console.log("Input(s) are not valid");
                        }
                      }
                    }
                  >
                    <Text
                      style={{
                        borderColor: "black",
                        borderWidth: 2,
                        backgroundColor: "white",
                        color: "black",
                        padding: 10,
                        borderRadius: 50,
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {"SAVE"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ width: "50%" }}>
                <PrimaryButton
                  width={150}
                  height={"auto"}
                  title="Apply"
                  route="Home"
                  additionalFunc={() => {
                    // console.log("button_working");
                    if (_onPressButton() == "") {
                      console.log(allInputs);
                      get_data_from_storage("@login_cookie")
                        .then((res) => {
                          // console.log("FROM ASYNC", res);
                          setAllInputs({
                            ...allInputs,
                          });

                          return res;
                        })
                        .then((sto) => {
                          return fetch(
                            "http://saap.oservo.com:7777/api/tenant/application/update-partial",
                            {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify(allInputs),
                            }
                          );
                        })

                        .then((data) => {
                          if (!data.ok) {
                            throw Error(data.status);
                          }
                          console.log(data);

                          return data.text();
                        })
                        .then((res) => {
                          console.log(res);
                          // return AsyncStorage.getItem("@storage_Key");
                          return get_data_from_storage("@application_id");
                          //redirect to the next from
                          // if (redirect_status == true) {
                          //   window.location.href = "/tenant/application/step/two";
                          // }
                        })
                        .then((data) => {
                          // console.log(data);
                          return fetch(
                            "http://saap.oservo.com:7777/api/tenant/application/finish",
                            {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify(data),
                            }
                          );
                        })
                        .then((data) => {
                          if (!data.ok) {
                            throw Error(data.status);
                          }
                          console.log("ok data", data);
                          return data.json();
                        })
                        .then((res) => {
                          console.log("finished", res);
                          //redirect to the next from
                          // if (redirect_status == true) {
                          //   // window.location.href = "/tenant/application/step/three";
                          // }
                        });
                    } else {
                      console.log("Input(s) are not valid");
                    }
                  }}
                />
                {/* <View style={styles.nav_logo}>

                                    <TouchableOpacity style={{ width: 120, height: 50 }} onPress={() => {
                                        setModalAppSentVisible(!modalAppSentVisible)
                                        // navigation.navigate('Home'); 
                                    }}
                                    >
                                        <Text style={{ borderColor: '#FBAF19', borderWidth: 1, backgroundColor: '#FBAF19', color: '#231F20', padding: 10, borderRadius: 50, textAlign: 'center', fontWeight: 'bold' }} >
                                            {'APPLY'}
                                        </Text>
                                    </TouchableOpacity>

                                </View> */}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default ApplicationStepFive;
