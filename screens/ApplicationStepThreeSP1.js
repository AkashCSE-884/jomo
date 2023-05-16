import { View, Text, ScrollView } from "react-native";
import styles from "../assets/css/Style";
// import svg icons
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import MainHeader from "../components/nav/MainHeader";
import ApplicationStepTwo from "./ApplicationStepTwo";
import CheckBox from "expo-checkbox";
import PrimaryButton from "../components/buttons/PrimaryButton";
import InvertBlackButton from "../components/buttons/InvertBlackButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useValidation } from "react-native-form-validator";
import AppSaved from "../components/modals/AppSaved";

let get_data_from_storage = async (key) => {
  let sto_data = await AsyncStorage.getItem(key);
  return sto_data;
};
let set_data_to_storage = async (key, value) => {
  const jsonValue = JSON.stringify(value);
  return await AsyncStorage.setItem(key, jsonValue);
};

function ApplicationStepThreeSP1({ navigation }) {
  const [modalAppVisible, setModalAppVisible] = useState(false);
  let [incTotal, setIncTotal] = useState(0);
  let [allInputs, setAllInputs] = useState({});
  let [stepThreeDataSP1, setStepThreeDataSP1] = useState({});

  let app_step_3_data = async () => {
    let data = await get_data_from_storage("@app_step_3_app");
    console.log(data);
    let obj_data = JSON.parse(data);
    setStepThreeDataSP1(obj_data);
    setAllInputs({ ...allInputs, ...obj_data });
  };
  useEffect(() => {
    app_step_3_data();
  }, []);
  let sum_total = () => {
    let total =
      +allInputs.inc_spo_basic_montly_net_income +
      +allInputs.inc_spo_regular_periodic_allowance +
      +allInputs.inc_spo_regular_financial_obgigation_met_by_employer +
      +allInputs.inc_spo_housing_allowance_payable +
      +allInputs.inc_spo_commission_received +
      +allInputs.inc_spo_pension_grant_etc +
      +allInputs.inc_spo_other;

    setIncTotal(total);
  };
  useEffect(() => {
    sum_total();
    console.log(
      typeof allInputs.inc_spo_basic_montly_net_income,
      typeof allInputs.inc_spo_regular_periodic_allowance,
      typeof allInputs.inc_spo_regular_financial_obgigation_met_by_employer,
      typeof allInputs.inc_spo_housing_allowance_payable,
      typeof allInputs.inc_spo_commission_received,
      typeof allInputs.inc_spo_pension_grant_etc,
      typeof allInputs.inc_spo_other
    );
    // console.log("totalt_changed");
  }, [allInputs]);

  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
    useValidation({
      state: {
        ...allInputs,
        incTotal,

        //  email, number, date, newPassword, confirmPassword
      },
    });

  const _onPressButton = () => {
    // console.log("running validation start");
    validate({
      inc_spo_basic_montly_net_income: { required: true },
      inc_spo_regular_periodic_allowance: { required: true },
      inc_spo_regular_financial_obgigation_met_by_employer: { required: true },
      inc_spo_housing_allowance_payable: { required: true },
      inc_spo_commission_received: { numbers: true, required: true },
      inc_spo_pension_grant_etc: { required: true },
      inc_spo_other: { required: true },

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
                Spouse Household Income:
              </Text>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text>Basic Monthly Net Income:</Text>
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
                      inc_spo_basic_montly_net_income: text,
                    });
                  }}
                  defaultValue={JSON.stringify(
                    stepThreeDataSP1.inc_spo_basic_montly_net_income
                  )}
                />
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("inc_spo_basic_montly_net_income")}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text>Regular Periodic Allowances:</Text>
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
                      inc_spo_regular_periodic_allowance: text,
                    });
                  }}
                  defaultValue={JSON.stringify(
                    stepThreeDataSP1.inc_spo_regular_periodic_allowance
                  )}
                />
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("inc_spo_regular_periodic_allowance")}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text>
                Regular Financial Obligations met by employer on behalf of
                Applicant:
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
                      inc_spo_regular_financial_obgigation_met_by_employer:
                        text,
                    });
                  }}
                  defaultValue={JSON.stringify(
                    stepThreeDataSP1.inc_spo_regular_financial_obgigation_met_by_employer
                  )}
                />
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField(
                    "inc_spo_regular_financial_obgigation_met_by_employer"
                  )}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text>
                <Text>Housing Allowances Payable:</Text>
                <Text style={{ color: "#231f20d9", fontSize: 14 }}>
                  {"("}Loan Interest Subsidy{")"}
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
                      inc_spo_housing_allowance_payable: text,
                    });
                  }}
                  defaultValue={JSON.stringify(
                    stepThreeDataSP1.inc_spo_housing_allowance_payable
                  )}
                />
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("inc_spo_housing_allowance_payable")}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text>
                <Text>Commissions Received</Text>
                <Text style={{ color: "#231f20d9", fontSize: 14 }}>
                  {"("}12 Month Ave{")"}
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
                      inc_spo_commission_received: text,
                    });
                  }}
                  defaultValue={JSON.stringify(
                    stepThreeDataSP1.inc_spo_commission_received
                  )}
                />
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("inc_spo_commission_received")}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text>Pension/Disability/Maintenance Grant:</Text>
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
                      inc_spo_pension_grant_etc: text,
                    });
                  }}
                  defaultValue={JSON.stringify(
                    stepThreeDataSP1.inc_spo_pension_grant_etc
                  )}
                />
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("inc_spo_pension_grant_etc")}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text>
                <Text>Other</Text>
                <Text style={{ color: "#231f20d9", fontSize: 14 }}>
                  {"("}12 Month Ave{")"}
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
                      inc_spo_other: JSON.parse(text),
                    });
                  }}
                  defaultValue={JSON.stringify(stepThreeDataSP1.inc_spo_other)}
                />
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("inc_spo_other")}
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
                  // onChangeText={(text) => {
                  //   setAllInputs({
                  //     ...allInputs,
                  //     total_app_expenditure: +text,
                  //   });
                  // }}
                  // defaultValue={JSON.stringify(stepThreeData.total_app_income)}
                  // defaultValue={JSON.stringify(
                  //   allInputs.inc_spo_basic_montly_net_income +
                  //     allInputs.inc_spo_regular_periodic_allowance +
                  //     allInputs.inc_spo_regular_financial_obgigation_met_by_employer +
                  //     allInputs.inc_spo_housing_allowance_payable +
                  //     allInputs.inc_spo_commission_received +
                  //     allInputs.inc_spo_pension_grant_etc +
                  //     allInputs.inc_spo_other
                  // )}
                  editable={false}
                  value={JSON.stringify(incTotal)}
                />
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("incTotal")}
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
                {/* <InvertBlackButton width="100%" height="100%" title="SAVE" /> */}
                <View style={styles.nav_logo}>
                  <TouchableOpacity
                    style={{ width: 120, height: 50 }}
                    onPress={() =>
                      // navigation.navigate(route)

                      {
                        if (_onPressButton() == "") {
                          setModalAppVisible(!modalAppVisible);
                          console.log("SUM TOTAL", incTotal);
                          let all_data = {
                            ...allInputs,
                            total_spo_income: incTotal,
                          };
                          console.log("ITS ALL DATA", all_data);
                          set_data_to_storage("@app_step_3_app", all_data)
                            .then((res) => {
                              // console.log(allInputs);

                              return res;
                            })
                            .then(() => {
                              // console.log(
                              //   typeof allInputs.total_app_income,
                              //   allInputs.total_app_income
                              // );
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
                  route="App3SP2"
                  additionalFunc={() => {
                    if (_onPressButton() == "") {
                      console.log("SUM TOTAL", incTotal);
                      let all_data = {
                        ...allInputs,
                        total_spo_income: incTotal,
                      };
                      console.log("ITS ALL DATA", all_data);
                      set_data_to_storage("@app_step_3_app", all_data)
                        .then((res) => {
                          // console.log(allInputs);

                          return res;
                        })
                        .then(() => {
                          // console.log(
                          //   typeof allInputs.total_app_income,
                          //   allInputs.total_app_income
                          // );
                        });
                    } else {
                      console.log("Input(s) are not valid");
                    }

                    // .then((sto) => {
                    //   return fetch(
                    //     "http://saap.oservo.com:7777/api/tenant/application/update-partial",
                    //     {
                    //       method: "POST",
                    //       headers: {
                    //         "Content-Type": "application/json",
                    //       },
                    //       body: JSON.stringify(allInputs),
                    //     }
                    //   );
                    // })

                    // .then((data) => {
                    //   if (!data.ok) {
                    //     throw Error(data.status);
                    //   }
                    //   console.log(data);

                    //   return data.text();
                    // })
                    // .then((res) => {
                    //   console.log(res);
                    //   return AsyncStorage.getItem("@maritial_status");
                    //   //redirect to the next from
                    //   // if (redirect_status == true) {
                    //   //   window.location.href = "/tenant/application/step/two";
                    //   // }
                    // })
                    // .then((data) => {
                    //   // console.log(data);
                    // });
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

export default ApplicationStepThreeSP1;
