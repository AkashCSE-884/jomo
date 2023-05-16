import { View, Text, ScrollView } from "react-native";
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
import AppSaved from "../components/modals/AppSaved";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useValidation } from "react-native-form-validator";
let set_data_to_storage = async (key, value) => {
  const jsonValue = JSON.stringify(value);
  return await AsyncStorage.setItem(key, jsonValue);
};

function ApplicationStepThree({ navigation }) {
  let [incTotal, setIncTotal] = useState(0);
  let [allInputs, setAllInputs] = useState({
    property_id: 9,
    application_id: 1,
    step: "three",
  });
  const [modalAppVisible, setModalAppVisible] = useState(false);
  let [stepThreeData, setStepThreeData] = useState({});
  let get_data_from_storage = async (key) => {
    let sto_data = await AsyncStorage.getItem(key);
    return sto_data;
  };
  let getStepThreeData = async () => {
    let app_id = await get_data_from_storage("@application_id");
    let fetched = await fetch(
      "http://saap.oservo.com:7777/api/tenant/application/view-partial",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          application_id: app_id,
          step: "three",
        }),
      }
    );
    let json_data = await fetched.json();
    // console.log(json_data.ret_data[0]);
    setStepThreeData(json_data.ret_data[0]);
    setAllInputs({
      ...allInputs,
      ...json_data.ret_data[0],
    });
  };
  let sum_total = () => {
    let total =
      allInputs.inc_app_basic_montly_net_income +
      allInputs.inc_app_regular_periodic_allowance +
      allInputs.inc_app_regular_financial_obgigation_met_by_employer +
      allInputs.inc_app_housing_allowance_payable +
      allInputs.inc_spo_commission_received +
      allInputs.inc_app_pension_grant_etc +
      allInputs.inc_app_other;

    setIncTotal(total);
  };
  useEffect(() => {
    sum_total();
    // console.log("totalt_changed");
  }, [allInputs]);
  useEffect(() => {
    getStepThreeData();
  }, []);
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
      net_monthly_salary: { numbers: true, required: true },

      inc_app_basic_montly_net_income: { numbers: true, required: true },
      inc_app_regular_periodic_allowance: {
        numbers: true,
        required: true,
      },
      inc_app_regular_financial_obgigation_met_by_employer: {
        numbers: true,
        required: true,
      },
      inc_app_housing_allowance_payable: {
        numbers: true,
        required: true,
      },
      inc_spo_commission_received: {
        numbers: true,
        required: true,
      },
      inc_app_pension_grant_etc: {
        numbers: true,
        required: true,
      },
      inc_app_other: {
        numbers: true,
        required: true,
      },
      incTotal: {
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
            <TouchableOpacity onPress={() => navigation.navigate("App2")}>
              <Text style={styles.body_title}>
                &lsaquo; Application - Step 3
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{ paddingHorizontal: 25, paddingTop: 20, paddingBottom: 10 }}
          >
            <View>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Household Income:
              </Text>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text>Basic Monthly Net Income:</Text>
              <View>
                <TextInput
                  inputMode="numeric"
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
                      inc_app_basic_montly_net_income: +text,
                    });
                  }}
                  defaultValue={JSON.stringify(
                    stepThreeData.inc_app_basic_montly_net_income
                  )}
                />
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text>Regular Periodic Allowances:</Text>
              <View>
                <TextInput
                  inputMode="numeric"
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
                      inc_app_regular_periodic_allowance: +text,
                    });
                  }}
                  defaultValue={JSON.stringify(
                    stepThreeData.inc_app_regular_periodic_allowance
                  )}
                />
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text>
                Regular Financial Obligations met by employer on behalf of
                Applicant:
              </Text>
              <View>
                <TextInput
                  inputMode="numeric"
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
                      inc_app_regular_financial_obgigation_met_by_employer:
                        text,
                    });
                  }}
                  defaultValue={JSON.stringify(
                    stepThreeData.inc_app_regular_financial_obgigation_met_by_employer
                  )}
                />
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
                  inputMode="numeric"
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
                      inc_app_housing_allowance_payable: +text,
                    });
                  }}
                  defaultValue={JSON.stringify(
                    stepThreeData.inc_app_housing_allowance_payable
                  )}
                />
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
                  inputMode="numeric"
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
                      inc_spo_commission_received: +text,
                    });
                  }}
                  defaultValue={JSON.stringify(
                    stepThreeData.inc_spo_commission_received
                  )}
                />
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text>Pension/Disability/Maintenance Grant:</Text>
              <View>
                <TextInput
                  inputMode="numeric"
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
                      inc_app_pension_grant_etc: +text,
                    });
                  }}
                  defaultValue={JSON.stringify(
                    stepThreeData.inc_app_pension_grant_etc
                  )}
                />
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
                  inputMode="numeric"
                  style={{
                    backgroundColor: "#F2F2F2",
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 10,
                    width: "80%",
                    marginTop: 10,
                  }}
                  onChangeText={(text) => {
                    setAllInputs({ ...allInputs, inc_app_other: +text });
                  }}
                  defaultValue={JSON.stringify(stepThreeData.inc_app_other)}
                />
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text>Total:</Text>
              <View>
                <TextInput
                  // inputMode="numeric"
                  style={{
                    backgroundColor: "#F2F2F2",
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 10,
                    width: "80%",
                    marginTop: 10,
                  }}
                  onChangeText={(text) => {
                    console.log(
                      typeof allInputs.inc_app_basic_montly_net_income,
                      typeof allInputs.inc_app_regular_periodic_allowance,
                      typeof allInputs.inc_app_regular_financial_obgigation_met_by_employer,
                      typeof allInputs.inc_app_housing_allowance_payable,
                      typeof allInputs.inc_spo_commission_received,
                      typeof allInputs.inc_app_pension_grant_etc,
                      typeof allInputs.inc_app_other
                    );
                    console.log(
                      allInputs.inc_app_basic_montly_net_income +
                        allInputs.inc_app_regular_periodic_allowance +
                        allInputs.inc_app_regular_financial_obgigation_met_by_employer +
                        allInputs.inc_app_housing_allowance_payable +
                        allInputs.inc_spo_commission_received +
                        allInputs.inc_app_pension_grant_etc +
                        allInputs.inc_app_other
                    );
                  }}
                  editable={false}
                  // defaultValue={JSON.stringify(stepThreeData.total_app_income)}
                  // value={JSON.stringify(
                  //   allInputs.inc_app_basic_montly_net_income +
                  //     allInputs.inc_app_regular_periodic_allowance +
                  //     allInputs.inc_app_regular_financial_obgigation_met_by_employer +
                  //     allInputs.inc_app_housing_allowance_payable +
                  //     allInputs.inc_spo_commission_received +
                  //     allInputs.inc_app_pension_grant_etc +
                  //     allInputs.inc_app_other
                  // )}
                  value={JSON.stringify(incTotal)}
                />
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
                          let all_data = {
                            ...allInputs,
                            total_app_income: incTotal,
                          };
                          // console.log("ITS ALL DATA", all_data);
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
                  route="App3V2"
                  additionalFunc={() => {
                    // console.log("SUM TOTAL", incTotal);

                    if (_onPressButton() == "") {
                      let all_data = {
                        ...allInputs,
                        total_app_income: incTotal,
                      };
                      // console.log("ITS ALL DATA", all_data);
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

export default ApplicationStepThree;
