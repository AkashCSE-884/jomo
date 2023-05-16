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
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import MainHeader from "../components/nav/MainHeader";
import DropDownPicker from "react-native-dropdown-picker";
import CheckBox from "expo-checkbox";
import PrimaryButton from "../components/buttons/PrimaryButton";
import InvertBlackButton from "../components/buttons/InvertBlackButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import AppSaved from "../components/modals/AppSaved";
import { useValidation } from "react-native-form-validator";

let set_data_to_storage = async (key, value) => {
  const jsonValue = JSON.stringify(value);
  return await AsyncStorage.setItem(key, jsonValue);
};
let get_data_from_storage = async (key) => {
  let sto_data = await AsyncStorage.getItem(key);
  return sto_data;
};

function ApplicationStepOneV2({ navigation }) {
  let [allInputs, setAllInputs] = useState({
    property_id: 9,
    application_id: 1,
    step: "one-spouse",
    // spo_name: "",
  });

  let [stepOneDataV2, setStepOneDataV2] = useState({});
  const [isOwner, setIsOwner] = useState("");
  const [isPostalAddress, setIsPostalAddress] = useState("");
  const [modalAppVisible, setModalAppVisible] = useState(false);

  let getStepOneDataV2 = async () => {
    let app_id = await get_data_from_storage("@application_id");
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
          step: "one-spouse",
        }),
      }
    );
    let json_data = await fetched.json();
    console.log(json_data.ret_data[0]);
    setStepOneDataV2(json_data.ret_data[0]);
    setAllInputs({
      ...allInputs,
      ...stepOneDataV2,
    });
    setIsOwner(json_data.ret_data[0].spo_is_owner_of_current_dwell);
    setIsPostalAddress(
      json_data.ret_data[0].spo_is_postal_address_eq_physical_address
    );
  };
  useEffect(() => {
    getStepOneDataV2();
  }, []);

  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
    useValidation({
      state: {
        ...allInputs,
        isOwner,
        isPostalAddress,

        //  email, number, date, newPassword, confirmPassword
      },
    });

  const _onPressButton = () => {
    // console.log("running validation start");
    validate({
      spo_name: { minlength: 3, maxlength: 7, required: true },
      spo_surname: { minlength: 3, maxlength: 7, required: true },
      spo_maiden_name: {},
      spo_id_num: { numbers: true, required: true },
      spo_contact_num: { numbers: true, required: true },
      spo_email: { email: true, required: true },
      spo_physical_address_line_1: { required: true },
      spo_physical_address_line_2: { required: true },
      spo_physical_address_line_3: { required: true },
      isOwner: { required: true },
      isPostalAddress: { required: true },
      spo_postal_address_line_1: { required: true },
      spo_postal_address_line_2: { required: true },
      spo_postal_address_line_3: { required: true },

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
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View styler={styles.container}>
        <MainHeader />
        <AppSaved
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
          <View style={{ padding: 20 }}>
            <TouchableOpacity onPress={() => navigation.navigate("App1")}>
              <Text style={styles.body_title}>
                &lsaquo; Application - Step 1
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingHorizontal: 25 }}>
            <View>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Spouse Details:
              </Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontWeight: "bold" }}>Name:</Text>
                  <Text style={{ color: "#BB2200" }}>*</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <TextInput
                    style={{
                      backgroundColor: "#F2F2F2",
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      borderRadius: 10,
                      width: "100%",
                      marginTop: 10,
                    }}
                    onChangeText={(text) => {
                      setAllInputs({ ...allInputs, spo_name: text });
                    }}
                    editable={true}
                    defaultValue={stepOneDataV2.spo_name}
                    // defaultValue={allInputs.spo_name}
                  ></TextInput>
                </View>
              </View>
            </View>
            <View>
              {/* <Text style={{ color: "red" }}> from text field </Text> */}
              <Text style={{ color: "red" }}>
                {getErrorsInField("spo_name")}
              </Text>
            </View>

            <View style={{ marginTop: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontWeight: "bold" }}>Surname:</Text>
                  <Text style={{ color: "#BB2200" }}>*</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <TextInput
                    style={{
                      backgroundColor: "#F2F2F2",
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      borderRadius: 10,
                      width: "100%",
                      marginTop: 10,
                    }}
                    onChangeText={(text) => {
                      setAllInputs({ ...allInputs, spo_surname: text });
                    }}
                    editable={true}
                    defaultValue={stepOneDataV2.spo_surname}
                  ></TextInput>
                </View>
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("spo_surname")}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontWeight: "bold" }}>Maiden Name:</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <TextInput
                    style={{
                      backgroundColor: "#F2F2F2",
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      borderRadius: 10,
                      width: "100%",
                      marginTop: 10,
                    }}
                    onChangeText={(text) => {
                      setAllInputs({ ...allInputs, spo_maiden_name: text });
                    }}
                    editable={true}
                    defaultValue={stepOneDataV2.spo_maiden_name}
                  ></TextInput>
                </View>
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("spo_maiden_name")}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontWeight: "bold" }}>ID Number:</Text>
                  <Text style={{ color: "#BB2200" }}>*</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <TextInput
                    style={{
                      backgroundColor: "#F2F2F2",
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      borderRadius: 10,
                      width: "100%",
                      marginTop: 10,
                    }}
                    onChangeText={(text) => {
                      setAllInputs({ ...allInputs, spo_id_num: text });
                    }}
                    editable={true}
                    defaultValue={stepOneDataV2.spo_id_num}
                  ></TextInput>
                </View>
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("spo_id_num")}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontWeight: "bold" }}>Contact Number:</Text>
                  <Text style={{ color: "#BB2200" }}>*</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <TextInput
                    style={{
                      backgroundColor: "#F2F2F2",
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      borderRadius: 10,
                      width: "100%",
                      marginTop: 10,
                    }}
                    onChangeText={(text) => {
                      setAllInputs({ ...allInputs, spo_contact_num: text });
                    }}
                    editable={true}
                    defaultValue={stepOneDataV2.spo_contact_num}
                  ></TextInput>
                </View>
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("spo_contact_num")}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontWeight: "bold" }}>Email Address:</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <TextInput
                    style={{
                      backgroundColor: "#F2F2F2",
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      borderRadius: 10,
                      width: "100%",
                      marginTop: 10,
                    }}
                    onChangeText={(text) => {
                      setAllInputs({ ...allInputs, spo_email: text });
                    }}
                    editable={true}
                    defaultValue={stepOneDataV2.spo_email}
                  ></TextInput>
                </View>
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("spo_email")}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 20 }}>
              <View style={{ flexDirection: "column", width: "100%" }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontWeight: "bold" }}>Physical Address:</Text>
                  <Text style={{ color: "#BB2200" }}>*</Text>
                </View>
                <View style={{}}>
                  <TextInput
                    style={{
                      backgroundColor: "#F2F2F2",
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      borderRadius: 10,
                      width: "100%",
                      marginTop: 10,
                    }}
                    onChangeText={(text) => {
                      setAllInputs({
                        ...allInputs,
                        spo_physical_address_line_1: text,
                      });
                    }}
                    editable={true}
                    defaultValue={stepOneDataV2.spo_physical_address_line_1}
                  ></TextInput>
                </View>
                <View>
                  {/* <Text style={{ color: "red" }}> from text field </Text> */}
                  <Text style={{ color: "red" }}>
                    {getErrorsInField("spo_physical_address_line_1")}
                  </Text>
                </View>
                <View style={{}}>
                  <TextInput
                    style={{
                      backgroundColor: "#F2F2F2",
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      borderRadius: 10,
                      width: "100%",
                      marginTop: 10,
                    }}
                    onChangeText={(text) => {
                      setAllInputs({
                        ...allInputs,
                        spo_physical_address_line_2: text,
                      });
                    }}
                    editable={true}
                    defaultValue={stepOneDataV2.spo_physical_address_line_2}
                  ></TextInput>
                </View>
                <View>
                  {/* <Text style={{ color: "red" }}> from text field </Text> */}
                  <Text style={{ color: "red" }}>
                    {getErrorsInField("spo_physical_address_line_2")}
                  </Text>
                </View>
                <View style={{ width: "50%" }}>
                  <TextInput
                    style={{
                      backgroundColor: "#F2F2F2",
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      borderRadius: 10,
                      width: "100%",
                      marginTop: 10,
                    }}
                    onChangeText={(text) => {
                      setAllInputs({
                        ...allInputs,
                        spo_physical_address_line_3: text,
                      });
                    }}
                    editable={true}
                    defaultValue={stepOneDataV2.spo_physical_address_line_3}
                  ></TextInput>
                </View>
                <View>
                  {/* <Text style={{ color: "red" }}> from text field </Text> */}
                  <Text style={{ color: "red" }}>
                    {getErrorsInField("spo_physical_address_line_3")}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ marginTop: 20 }}>
              <View>
                <Text>
                  <Text>
                    Are you the owner of the property where you currently stay?
                  </Text>
                  <Text style={{ color: "#BB2200" }}>*</Text>
                </Text>
              </View>
              <View>
                <RadioButtonGroup
                  containerStyle={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginVertical: 10,
                  }}
                  selected={isOwner}
                  onSelected={(value) => setIsOwner(value)}
                  radioBackground="gray"
                >
                  <RadioButtonItem
                    value={true}
                    label={<Text style={{ marginLeft: 10 }}>Yes</Text>}
                  />
                  <RadioButtonItem
                    value={false}
                    label={<Text style={{ marginLeft: 10 }}>No</Text>}
                  />
                </RadioButtonGroup>
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("isOwner")}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 20 }}>
              <View>
                <Text>
                  <Text>
                    Is the postal address the same as physical address?
                  </Text>
                  <Text style={{ color: "#BB2200" }}>*</Text>
                </Text>
              </View>
              <View>
                <RadioButtonGroup
                  containerStyle={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginVertical: 10,
                  }}
                  selected={isPostalAddress}
                  onSelected={(value) => setIsPostalAddress(value)}
                  radioBackground="gray"
                >
                  <RadioButtonItem
                    value={true}
                    label={<Text style={{ marginLeft: 10 }}>Yes</Text>}
                  />
                  <RadioButtonItem
                    value={false}
                    label={<Text style={{ marginLeft: 10 }}>No</Text>}
                  />
                </RadioButtonGroup>
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("isPostalAddress")}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 20 }}>
              <View style={{ flexDirection: "column", width: "100%" }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontWeight: "bold" }}>Postal Address:</Text>
                  <Text style={{ color: "#BB2200" }}>*</Text>
                </View>
                <View style={{}}>
                  <TextInput
                    style={{
                      backgroundColor: "#F2F2F2",
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      borderRadius: 10,
                      width: "100%",
                      marginTop: 10,
                    }}
                    onChangeText={(text) => {
                      setAllInputs({
                        ...allInputs,
                        spo_postal_address_line_1: text,
                      });
                    }}
                    editable={true}
                    defaultValue={stepOneDataV2.spo_postal_address_line_1}
                  ></TextInput>
                </View>
                <View>
                  {/* <Text style={{ color: "red" }}> from text field </Text> */}
                  <Text style={{ color: "red" }}>
                    {getErrorsInField("spo_postal_address_line_1")}
                  </Text>
                </View>
                <View style={{}}>
                  <TextInput
                    style={{
                      backgroundColor: "#F2F2F2",
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      borderRadius: 10,
                      width: "100%",
                      marginTop: 10,
                    }}
                    onChangeText={(text) => {
                      setAllInputs({
                        ...allInputs,
                        spo_postal_address_line_2: text,
                      });
                    }}
                    editable={true}
                    defaultValue={stepOneDataV2.spo_postal_address_line_2}
                  ></TextInput>
                </View>
                <View>
                  {/* <Text style={{ color: "red" }}> from text field </Text> */}
                  <Text style={{ color: "red" }}>
                    {getErrorsInField("spo_postal_address_line_2")}
                  </Text>
                </View>
                <View style={{ width: "50%" }}>
                  <TextInput
                    style={{
                      backgroundColor: "#F2F2F2",
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      borderRadius: 10,
                      width: "100%",
                      marginTop: 10,
                    }}
                    onChangeText={(text) => {
                      setAllInputs({
                        ...allInputs,
                        spo_postal_address_line_3: text,
                      });
                    }}
                    editable={true}
                    defaultValue={stepOneDataV2.spo_postal_address_line_3}
                  ></TextInput>
                </View>
                <View>
                  {/* <Text style={{ color: "red" }}> from text field </Text> */}
                  <Text style={{ color: "red" }}>
                    {getErrorsInField("spo_postal_address_line_3")}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 20,
              }}
            >
              <View style={{ width: "50%" }}>
                {/* <InvertBlackButton
                                        width='100%'
                                        height='100%'
                                        title='SAVE' /> */}
                <View style={styles.nav_logo}>
                  <TouchableOpacity
                    style={{ width: 120, height: "auto" }}
                    onPress={() =>
                      // navigation.navigate(route)
                      {
                        if (_onPressButton() == "") {
                          setModalAppVisible(!modalAppVisible);
                          console.log("Everything is fine");
                          get_data_from_storage("@login_cookie")
                            .then((res) => {
                              // console.log("FROM ASYNC", res);
                              setAllInputs({
                                ...allInputs,
                                spo_is_owner_of_current_dwell:
                                  isOwner != (null || undefined) ? isOwner : "",
                                spo_is_postal_address_eq_physical_address:
                                  isPostalAddress != (null || undefined)
                                    ? isPostalAddress
                                    : "",
                              });
                              // console.log(allInputs);
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
                              return AsyncStorage.getItem("@storage_Key");
                              //redirect to the next from
                              // if (redirect_status == true) {
                              //   window.location.href = "/tenant/application/step/two";
                              // }
                            })
                            .then((data) => {
                              // console.log(data);
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
                  width="100%"
                  height="100%"
                  title="NEXT"
                  route="App2"
                  additionalFunc={() => {
                    // console.log("FROM onPress", typeof _onPressButton());
                    if (_onPressButton() == "") {
                      console.log("Everything is fine");
                      get_data_from_storage("@login_cookie")
                        .then((res) => {
                          // console.log("FROM ASYNC", res);
                          setAllInputs({
                            ...allInputs,
                            spo_is_owner_of_current_dwell:
                              isOwner != (null || undefined) ? isOwner : "",
                            spo_is_postal_address_eq_physical_address:
                              isPostalAddress != (null || undefined)
                                ? isPostalAddress
                                : "",
                          });
                          // console.log(allInputs);
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
                          return AsyncStorage.getItem("@storage_Key");
                          //redirect to the next from
                          // if (redirect_status == true) {
                          //   window.location.href = "/tenant/application/step/two";
                          // }
                        })
                        .then((data) => {
                          // console.log(data);
                        });
                    } else {
                      console.log("Input(s) are not valid");
                    }

                    // get_data_from_storage("@login_cookie")
                    //   .then((res) => {
                    //     // console.log("FROM ASYNC", res);
                    //     setAllInputs({
                    //       ...allInputs,
                    //       spo_is_owner_of_current_dwell:
                    //         isOwner != (null || undefined) ? isOwner : "",
                    //       spo_is_postal_address_eq_physical_address:
                    //         isPostalAddress != (null || undefined)
                    //           ? isPostalAddress
                    //           : "",
                    //     });
                    //     // console.log(allInputs);
                    //     return res;
                    //   })
                    //   .then((sto) => {
                    //     return fetch(
                    //       "http://saap.oservo.com:7777/api/tenant/application/update-partial",
                    //       {
                    //         method: "POST",
                    //         headers: {
                    //           "Content-Type": "application/json",
                    //         },
                    //         body: JSON.stringify(allInputs),
                    //       }
                    //     );
                    //   })

                    //   .then((data) => {
                    //     if (!data.ok) {
                    //       throw Error(data.status);
                    //     }
                    //     console.log(data);

                    //     return data.text();
                    //   })
                    //   .then((res) => {
                    //     console.log(res);
                    //     return AsyncStorage.getItem("@storage_Key");
                    //     //redirect to the next from
                    //     // if (redirect_status == true) {
                    //     //   window.location.href = "/tenant/application/step/two";
                    //     // }
                    //   })
                    //   .then((data) => {
                    //     // console.log(data);
                    //   });
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

export default ApplicationStepOneV2;
