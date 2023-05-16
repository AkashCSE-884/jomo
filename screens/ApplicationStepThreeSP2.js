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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useValidation } from "react-native-form-validator";
let get_data_from_storage = async (key) => {
  let sto_data = await AsyncStorage.getItem(key);
  return sto_data;
};

function ApplicationStepThreeSP2({ navigation }) {
  const [modalAppVisible, setModalAppVisible] = useState(false);
  let [expTotal, setExpTotal] = useState(0);
  let [allInputs, setAllInputs] = useState({});
  let [stepThreeDataSP2, setStepThreeDataSP2] = useState({});

  let app_step_3_data = async () => {
    let data = await get_data_from_storage("@app_step_3_app");
    console.log(data);
    let obj_data = JSON.parse(data);
    setStepThreeDataSP2(obj_data);
    setAllInputs({ ...allInputs, ...obj_data });
  };
  useEffect(() => {
    app_step_3_data();
  }, []);
  let sum_total = () => {
    let total =
      +allInputs.exp_spo_cellular_etc +
      +allInputs.exp_spo_clothing +
      +allInputs.exp_spo_dstv +
      +allInputs.exp_spo_furniture +
      +allInputs.exp_spo_groceries +
      +allInputs.exp_spo_insurace_policies +
      +allInputs.exp_spo_loans +
      +allInputs.exp_spo_child_maintenance +
      +allInputs.exp_spo_medical_aid +
      +allInputs.exp_spo_motor_vehicle_insurance +
      +allInputs.exp_spo_motor_vehicle_maintenance +
      +allInputs.exp_spo_rent +
      +allInputs.exp_spo_levy +
      +allInputs.exp_spo_school_fee +
      +allInputs.exp_spo_transportation +
      +allInputs.exp_spo_water_electricity +
      +allInputs.exp_spo_other;

    setExpTotal(total);
  };
  useEffect(() => {
    sum_total();
    // console.log("totalt_changed");
  }, [allInputs]);

  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
    useValidation({
      state: {
        ...allInputs,
        expTotal,

        //  email, number, date, newPassword, confirmPassword
      },
    });

  const _onPressButton = () => {
    // console.log("running validation start");
    validate({
      exp_spo_cellular_etc: { numbers: true, required: true },

      exp_spo_clothing: { numbers: true, required: true },

      exp_spo_dstv: {
        numbers: true,
        required: true,
      },
      exp_spo_furniture: {
        numbers: true,
        required: true,
      },
      exp_spo_groceries: {
        numbers: true,
        required: true,
      },
      exp_spo_insurace_policies: {
        numbers: true,
        required: true,
      },
      exp_spo_loans: {
        numbers: true,
        required: true,
      },
      exp_spo_child_maintenance: {
        numbers: true,
        required: true,
      },
      exp_spo_medical_aid: {
        numbers: true,
        required: true,
      },
      exp_spo_motor_vehicle_insurance: {
        numbers: true,
        required: true,
      },
      exp_spo_motor_vehicle_maintenance: {
        numbers: true,
        required: true,
      },
      exp_spo_rent: {
        numbers: true,
        required: true,
      },
      exp_spo_levy: {
        numbers: true,
        required: true,
      },
      exp_spo_school_fee: {
        numbers: true,
        required: true,
      },
      exp_spo_transportation: {
        numbers: true,
        required: true,
      },
      exp_spo_water_electricity: {
        numbers: true,
        required: true,
      },
      exp_spo_other: {
        numbers: true,
        required: true,
      },

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
          vis={modalAppVisible}
          onModalPress={() => {
            setModalAppVisible(!modalAppVisible);
            //  navigation.navigate('Home');
          }}
          title="CLOSE"
          modalFunc={() => {
            setModalAppVisible(false);
            console.log("clicked");
          }}
        />
        <ScrollView>
          <View style={{ padding: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate("App3")}>
              <Text style={styles.body_title}>
                &lsaquo; Application - Step 3
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingHorizontal: 25 }}>
            <View>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Spouse Household Expenditure:
              </Text>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text>Cell Phone Account/Airtime/Wifi:</Text>
              <View>
                <TextInput
                  style={{
                    backgroundColor: "#F2F2F2",
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 10,
                    width: "80%",
                    marginTop: 10,
                  }}
                  onChangeText={(text) => {
                    setAllInputs({
                      ...allInputs,
                      exp_spo_cellular_etc: text,
                    });
                  }}
                  defaultValue={JSON.stringify(
                    stepThreeDataSP2.exp_spo_cellular_etc
                  )}
                />
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("exp_spo_cellular_etc")}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text>Clothing Accounts:</Text>
              <View>
                <TextInput
                  style={{
                    backgroundColor: "#F2F2F2",
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 10,
                    width: "80%",
                    marginTop: 10,
                  }}
                  onChangeText={(text) => {
                    setAllInputs({
                      ...allInputs,
                      exp_spo_clothing: text,
                    });
                  }}
                  defaultValue={JSON.stringify(
                    stepThreeDataSP2.exp_spo_clothing
                  )}
                />
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("exp_spo_clothing")}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text>DSTV Account:</Text>
              <View>
                <TextInput
                  style={{
                    backgroundColor: "#F2F2F2",
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 10,
                    width: "80%",
                    marginTop: 10,
                  }}
                  onChangeText={(text) => {
                    setAllInputs({
                      ...allInputs,
                      exp_spo_dstv: text,
                    });
                  }}
                  defaultValue={JSON.stringify(stepThreeDataSP2.exp_spo_dstv)}
                />
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("exp_spo_dstv")}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text>Furniture Account:</Text>
              <View>
                <TextInput
                  style={{
                    backgroundColor: "#F2F2F2",
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 10,
                    width: "80%",
                    marginTop: 10,
                  }}
                  onChangeText={(text) => {
                    setAllInputs({
                      ...allInputs,
                      exp_spo_furniture: text,
                    });
                  }}
                  defaultValue={JSON.stringify(
                    stepThreeDataSP2.exp_spo_furniture
                  )}
                />
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("exp_spo_furniture")}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text>Groceries:</Text>
              <View>
                <TextInput
                  style={{
                    backgroundColor: "#F2F2F2",
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 10,
                    width: "80%",
                    marginTop: 10,
                  }}
                  onChangeText={(text) => {
                    setAllInputs({
                      ...allInputs,
                      exp_spo_groceries: text,
                    });
                  }}
                  defaultValue={JSON.stringify(
                    stepThreeDataSP2.exp_spo_groceries
                  )}
                />
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("exp_spo_groceries")}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text>Insurance Policies:</Text>
              <View>
                <TextInput
                  style={{
                    backgroundColor: "#F2F2F2",
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 10,
                    width: "80%",
                    marginTop: 10,
                  }}
                  onChangeText={(text) => {
                    setAllInputs({
                      ...allInputs,
                      exp_spo_insurace_policies: text,
                    });
                  }}
                  defaultValue={JSON.stringify(
                    stepThreeDataSP2.exp_spo_insurace_policies
                  )}
                />
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("exp_spo_insurace_policies")}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text>
                <Text>Loans</Text>
                <Text style={{ color: "#231f20d9", fontSize: 14 }}>
                  {"("}all Types{")"}:
                </Text>
              </Text>
              <View>
                <TextInput
                  style={{
                    backgroundColor: "#F2F2F2",
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 10,
                    width: "80%",
                    marginTop: 10,
                  }}
                  onChangeText={(text) => {
                    setAllInputs({
                      ...allInputs,
                      exp_spo_loans: text,
                    });
                  }}
                  defaultValue={JSON.stringify(stepThreeDataSP2.exp_spo_loans)}
                />
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("exp_spo_loans")}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text>Child Maintenance:</Text>
              <View>
                <TextInput
                  style={{
                    backgroundColor: "#F2F2F2",
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 10,
                    width: "80%",
                    marginTop: 10,
                  }}
                  onChangeText={(text) => {
                    setAllInputs({
                      ...allInputs,
                      exp_spo_child_maintenance: text,
                    });
                  }}
                  defaultValue={JSON.stringify(
                    stepThreeDataSP2.exp_spo_child_maintenance
                  )}
                />
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("exp_spo_child_maintenance")}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text>Medical Aid:</Text>
              <View>
                <TextInput
                  style={{
                    backgroundColor: "#F2F2F2",
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 10,
                    width: "80%",
                    marginTop: 10,
                  }}
                  onChangeText={(text) => {
                    setAllInputs({
                      ...allInputs,
                      exp_spo_medical_aid: text,
                    });
                  }}
                  defaultValue={JSON.stringify(
                    stepThreeDataSP2.exp_spo_medical_aid
                  )}
                />
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("exp_spo_medical_aid")}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text>Motor Vehicle Insurance:</Text>
              <View>
                <TextInput
                  style={{
                    backgroundColor: "#F2F2F2",
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 10,
                    width: "80%",
                    marginTop: 10,
                  }}
                  onChangeText={(text) => {
                    setAllInputs({
                      ...allInputs,
                      exp_spo_motor_vehicle_insurance: text,
                    });
                  }}
                  defaultValue={JSON.stringify(
                    stepThreeDataSP2.exp_spo_motor_vehicle_insurance
                  )}
                />
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("exp_spo_motor_vehicle_insurance")}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text>Motor Vehicle Maintenance:</Text>
              <View>
                <TextInput
                  style={{
                    backgroundColor: "#F2F2F2",
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 10,
                    width: "80%",
                    marginTop: 10,
                  }}
                  onChangeText={(text) => {
                    setAllInputs({
                      ...allInputs,
                      exp_spo_motor_vehicle_maintenance: text,
                    });
                  }}
                  defaultValue={JSON.stringify(
                    stepThreeDataSP2.exp_spo_motor_vehicle_maintenance
                  )}
                />
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("exp_spo_motor_vehicle_maintenance")}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text>
                <Text>Rent</Text>
                <Text style={{ color: "#231f20d9", fontSize: 14 }}>
                  {"("}Joshco Tariff Applicable{")"}:
                </Text>
              </Text>
              <View>
                <TextInput
                  style={{
                    backgroundColor: "#F2F2F2",
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 10,
                    width: "80%",
                    marginTop: 10,
                  }}
                  onChangeText={(text) => {
                    setAllInputs({
                      ...allInputs,
                      exp_spo_rent: text,
                    });
                  }}
                  defaultValue={JSON.stringify(stepThreeDataSP2.exp_spo_rent)}
                />
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("exp_spo_rent")}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text>Levy:</Text>
              <View>
                <TextInput
                  style={{
                    backgroundColor: "#F2F2F2",
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 10,
                    width: "80%",
                    marginTop: 10,
                  }}
                  onChangeText={(text) => {
                    setAllInputs({
                      ...allInputs,
                      exp_spo_levy: text,
                    });
                  }}
                  defaultValue={JSON.stringify(stepThreeDataSP2.exp_spo_levy)}
                />
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("exp_spo_levy")}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text>School Fees:</Text>
              <View>
                <TextInput
                  style={{
                    backgroundColor: "#F2F2F2",
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 10,
                    width: "80%",
                    marginTop: 10,
                  }}
                  onChangeText={(text) => {
                    setAllInputs({
                      ...allInputs,
                      exp_spo_school_fee: text,
                    });
                  }}
                  defaultValue={JSON.stringify(
                    stepThreeDataSP2.exp_spo_school_fee
                  )}
                />
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("exp_spo_school_fee")}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text>Transport Costs:</Text>
              <View>
                <TextInput
                  style={{
                    backgroundColor: "#F2F2F2",
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 10,
                    width: "80%",
                    marginTop: 10,
                  }}
                  onChangeText={(text) => {
                    setAllInputs({
                      ...allInputs,
                      exp_spo_transportation: text,
                    });
                  }}
                  defaultValue={JSON.stringify(
                    stepThreeDataSP2.exp_spo_transportation
                  )}
                />
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("exp_spo_transportation")}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text>
                <Text>Water and Electricity:</Text>
                <Text style={{ color: "#231f20d9", fontSize: 14 }}>
                  {"("}Joshco{")"}:
                </Text>
              </Text>
              <View>
                <TextInput
                  style={{
                    backgroundColor: "#F2F2F2",
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 10,
                    width: "80%",
                    marginTop: 10,
                  }}
                  onChangeText={(text) => {
                    setAllInputs({
                      ...allInputs,
                      exp_spo_water_electricity: text,
                    });
                  }}
                  defaultValue={JSON.stringify(
                    stepThreeDataSP2.exp_spo_water_electricity
                  )}
                />
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("exp_spo_water_electricity")}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text>Other:</Text>
              <View>
                <TextInput
                  style={{
                    backgroundColor: "#F2F2F2",
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 10,
                    width: "80%",
                    marginTop: 10,
                  }}
                  onChangeText={(text) => {
                    setAllInputs({
                      ...allInputs,
                      exp_spo_other: text,
                    });
                  }}
                  defaultValue={JSON.stringify(stepThreeDataSP2.exp_spo_other)}
                />
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("exp_spo_other")}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text>Total:</Text>
              <View>
                <TextInput
                  style={{
                    backgroundColor: "#F2F2F2",
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 10,
                    width: "80%",
                    marginTop: 10,
                  }}
                  onChangeText={(text) => {
                    setAllInputs({
                      ...allInputs,
                      total_app_expenditure: +text,
                    });
                  }}
                  // defaultValue={JSON.stringify(stepThreeData.total_app_income)}
                  // defaultValue={JSON.stringify(
                  //   allInputs.exp_spo_cellular_etc +
                  //     allInputs.exp_spo_clothing +
                  //     allInputs.exp_spo_dstv +
                  //     allInputs.exp_spo_furniture +
                  //     allInputs.exp_spo_groceries +
                  //     allInputs.exp_spo_insurace_policies +
                  //     allInputs.exp_spo_loans +
                  //     allInputs.exp_spo_child_maintenance +
                  //     allInputs.exp_spo_medical_aid +
                  //     allInputs.exp_spo_motor_vehicle_insurance +
                  //     allInputs.exp_spo_motor_vehicle_maintenance +
                  //     allInputs.exp_spo_rent +
                  //     allInputs.exp_spo_levy +
                  //     allInputs.exp_spo_school_fee +
                  //     allInputs.exp_spo_transportation +
                  //     allInputs.exp_spo_water_electricity +
                  //     allInputs.exp_spo_other
                  // )}
                  editable={false}
                  value={JSON.stringify(expTotal)}
                />
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("expTotal")}
                </Text>
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
                                    title='SAVE'/> */}
                <View style={styles.nav_logo}>
                  <TouchableOpacity
                    style={{ width: 120, height: 50 }}
                    onPress={() =>
                      // navigation.navigate(route)
                      {
                        if (_onPressButton() == "") {
                          setModalAppVisible(!modalAppVisible);
                          let nett =
                            allInputs.total_app_income +
                            allInputs.total_spo_income -
                            expTotal -
                            allInputs.total_app_expenditure;
                          let all_data = {
                            ...allInputs,
                            total_spo_expenditure: expTotal,
                            net_cash_flow: nett,
                          };

                          get_data_from_storage("@login_cookie")
                            .then((res) => {
                              console.log("FROM ALL DATA", all_data);

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
                                  body: JSON.stringify(all_data),
                                }
                              );
                            })

                            .then((data) => {
                              if (!data.ok) {
                                throw Error(data.status);
                              }
                              console.log("DATA:", data);

                              return data.text();
                            })
                            .then((res) => {
                              console.log("ON 667 line", res);
                              return AsyncStorage.getItem("@maritial_status");
                              //redirect to the next from
                              // if (redirect_status == true) {
                              //   window.location.href = "/tenant/application/step/two";
                              // }
                            })
                            .then((data) => {
                              // console.log(data);
                              // if (data == 2) {
                              //   navigation.navigate("App3SP1");
                              // } else {
                              //   navigation.navigate("App4");
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
                  width="100%"
                  height="100%"
                  title="NEXT"
                  route="App4"
                  additionalFunc={() => {
                    if (_onPressButton() == "") {
                      let nett =
                        allInputs.total_app_income +
                        allInputs.total_spo_income -
                        expTotal -
                        allInputs.total_app_expenditure;
                      let all_data = {
                        ...allInputs,
                        total_spo_expenditure: expTotal,
                        net_cash_flow: nett,
                      };

                      get_data_from_storage("@login_cookie")
                        .then((res) => {
                          console.log("FROM ALL DATA", all_data);

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
                              body: JSON.stringify(all_data),
                            }
                          );
                        })

                        .then((data) => {
                          if (!data.ok) {
                            throw Error(data.status);
                          }
                          console.log("DATA:", data);

                          return data.text();
                        })
                        .then((res) => {
                          console.log("ON 667 line", res);
                          return AsyncStorage.getItem("@maritial_status");
                          //redirect to the next from
                          // if (redirect_status == true) {
                          //   window.location.href = "/tenant/application/step/two";
                          // }
                        })
                        .then((data) => {
                          // console.log(data);
                          // if (data == 2) {
                          //   navigation.navigate("App3SP1");
                          // } else {
                          //   navigation.navigate("App4");
                          // }
                        });
                    } else {
                      console.log("Input(s) are not valid");
                    }
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

export default ApplicationStepThreeSP2;
