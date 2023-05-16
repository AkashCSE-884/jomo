import { View, Text, ScrollView } from "react-native";
import styles from "../assets/css/Style";
// import svg icons

import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";
import { useEffect, useState } from "react";
import MainHeader from "../components/nav/MainHeader";
import CheckBox from "expo-checkbox";
import PrimaryButton from "../components/buttons/PrimaryButton";
import AppSaved from "../components/modals/AppSaved";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useValidation } from "react-native-form-validator";
function ApplicationStepTwo({ navigation }) {
  let [allInputs, setAllInputs] = useState({
    property_id: 9,
    application_id: 1,
    step: "two",
  });
  //drop down start
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [items, setItems] = useState([
    { label: "Employed", value: 1 },
    { label: "Self Employed", value: 2 },
  ]);
  let [isEmployedByEntity, setIsEmployedByEntity] = useState("");

  // end drop down
  const [modalAppVisible, setModalAppVisible] = useState(false);
  let [stepTwoData, setStepTwoData] = useState({});
  let get_data_from_storage = async (key) => {
    let sto_data = await AsyncStorage.getItem(key);
    return sto_data;
  };

  let getStepTwoData = async () => {
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
          step: "two",
        }),
      }
    );
    let json_data = await fetched.json();
    // console.log(json_data.ret_data[0]);
    setStepTwoData(json_data.ret_data[0]);
    setAllInputs({
      ...allInputs,
      ...json_data.ret_data[0],
    });
    setValue(json_data.ret_data[0].employment_status_type_id);
  };

  useEffect(() => {
    getStepTwoData();
  }, []);

  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
    useValidation({
      state: {
        ...allInputs,
        value,
        isEmployedByEntity,

        //  email, number, date, newPassword, confirmPassword
      },
    });

  // is_employed_by_entity ,
  // employment_status_type_id ,
  // occupation ",
  // current_employer ",
  // employer_contact_details ",
  // employer_address_line_1 ",
  // employer_address_line_2 ",
  // employer_address_line_3 ",
  // employment_period_y ,
  // employment_period_m ,
  // gross_monthly_salary ,
  // net_monthly_salary ,
  // salary_payment_day ,

  const _onPressButton = () => {
    // console.log("running validation start");
    validate({
      isEmployedByEntity: { required: true },
      value: { required: true },
      occupation: { required: true },
      current_employer: { required: true },
      employer_contact_details: { numbers: true, required: true },
      employer_address_line_1: { required: true },
      employer_address_line_2: { required: true },
      employer_address_line_3: { required: true },
      employment_period_y: { numbers: true, required: true },
      gross_monthly_salary: { numbers: true, required: true },
      net_monthly_salary: { numbers: true, required: true },
      salary_payment_day: { numbers: true, required: true },

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
            <TouchableOpacity onPress={() => navigation.navigate("App1")}>
              <Text style={styles.body_title}>
                &lsaquo; Application - Step 2
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingHorizontal: 25 }}>
            <View style={{ marginTop: 20 }}>
              <View>
                <Text>
                  <Text>
                    Are you employed by City Of Johannesburg or any of its
                    entities?
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
                  selected={isEmployedByEntity}
                  onSelected={(value) => setIsEmployedByEntity(value)}
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
                  {getErrorsInField("isEmployedByEntity")}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <View style={{ flex: 2, flexDirection: "column", padding: 10 }}>
                <View style={{ flex: 1, marginTop: 10, marginBottom: 10 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold" }}>
                      Employment Status:
                    </Text>
                  </View>
                </View>
                <View style={{ flex: 1, marginTop: 10, marginBottom: 20 }}>
                  <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    onChangeValue={(val) => {
                      // console.log(val);
                      setAllInputs({
                        ...allInputs,
                        employment_status_type_id: val,
                      });
                    }}
                  />
                </View>
                <View>
                  {/* <Text style={{ color: "red" }}> from text field </Text> */}
                  <Text style={{ color: "red" }}>
                    {getErrorsInField("value")}
                  </Text>
                </View>
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
                  <Text style={{ fontWeight: "bold" }}>Occupation:</Text>
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
                      setAllInputs({ ...allInputs, occupation: text });
                    }}
                    defaultValue={stepTwoData.occupation}
                  ></TextInput>
                </View>
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("occupation")}
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
                  <Text style={{ fontWeight: "bold" }}>Current Employer:</Text>
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
                      setAllInputs({ ...allInputs, current_employer: text });
                    }}
                    defaultValue={stepTwoData.current_employer}
                  ></TextInput>
                </View>
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("current_employer")}
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
                  <Text style={{ fontWeight: "bold" }}>
                    Employer Contact Details:
                  </Text>
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
                      setAllInputs({
                        ...allInputs,
                        employer_contact_details: text,
                      });
                    }}
                    defaultValue={stepTwoData.employer_contact_details}
                  ></TextInput>
                </View>
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("employer_contact_details")}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 20 }}>
              <View style={{ flexDirection: "column", width: "100%" }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontWeight: "bold" }}>
                    Employer's Address:
                  </Text>
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
                        employer_address_line_1: text,
                      });
                    }}
                    defaultValue={stepTwoData.employer_address_line_1}
                  ></TextInput>
                </View>
                <View>
                  {/* <Text style={{ color: "red" }}> from text field </Text> */}
                  <Text style={{ color: "red" }}>
                    {getErrorsInField("employer_address_line_1")}
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
                        employer_address_line_2: text,
                      });
                    }}
                    defaultValue={stepTwoData.employer_address_line_2}
                  ></TextInput>
                </View>
                <View>
                  {/* <Text style={{ color: "red" }}> from text field </Text> */}
                  <Text style={{ color: "red" }}>
                    {getErrorsInField("employer_address_line_2")}
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
                        employer_address_line_3: text,
                      });
                    }}
                    defaultValue={stepTwoData.employer_address_line_3}
                  ></TextInput>
                </View>
                <View>
                  {/* <Text style={{ color: "red" }}> from text field </Text> */}
                  <Text style={{ color: "red" }}>
                    {getErrorsInField("employer_address_line_3")}
                  </Text>
                </View>
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
                  <Text style={{ fontWeight: "bold" }}>Employment Period:</Text>
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
                      setAllInputs({ ...allInputs, employment_period_y: text });
                    }}
                    defaultValue={JSON.stringify(
                      stepTwoData.employment_period_y
                    )}
                  ></TextInput>
                </View>
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("employment_period_y")}
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
                  <Text style={{ fontWeight: "bold" }}>
                    Gross Monthly Salary:
                  </Text>
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
                      setAllInputs({
                        ...allInputs,
                        gross_monthly_salary: text,
                      });
                    }}
                    defaultValue={JSON.stringify(
                      stepTwoData.gross_monthly_salary
                    )}
                  ></TextInput>
                </View>
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("gross_monthly_salary")}
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
                  <Text style={{ fontWeight: "bold" }}>
                    Nett Monthly Salary:
                  </Text>
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
                      setAllInputs({ ...allInputs, net_monthly_salary: text });
                    }}
                    defaultValue={JSON.stringify(
                      stepTwoData.net_monthly_salary
                    )}
                  ></TextInput>
                </View>
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("net_monthly_salary")}
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
                  <Text style={{ fontWeight: "bold" }}>
                    Salary Payment Date:
                  </Text>
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
                      setAllInputs({ ...allInputs, salary_payment_day: text });
                    }}
                    defaultValue={JSON.stringify(
                      stepTwoData.salary_payment_day
                    )}
                  ></TextInput>
                </View>
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("salary_payment_day")}
                </Text>
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
                          get_data_from_storage("@login_cookie")
                            .then((res) => {
                              // console.log("FROM ASYNC", res);
                              setAllInputs({
                                ...allInputs,
                                is_employed_by_entity:
                                  isEmployedByEntity != (null || undefined)
                                    ? isEmployedByEntity
                                    : "",
                                //   is_postal_address_eq_physical_address:
                                //     isPostalAddress != (null || undefined)
                                //       ? isPostalAddress
                                //       : "",
                                //   unit_type_id:
                                //     unitTypeId != (null || undefined) ? unitTypeId : "",
                              });
                              // console.log("FROM ALL INPUTS", allInputs);
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
                              return AsyncStorage.getItem("@maritial_status");
                              //redirect to the next from
                              // if (redirect_status == true) {
                              //   window.location.href = "/tenant/application/step/two";
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
                  // route="App3"
                  additionalFunc={() => {
                    if (_onPressButton() == "") {
                      get_data_from_storage("@login_cookie")
                        .then((res) => {
                          // console.log("FROM ASYNC", res);
                          setAllInputs({
                            ...allInputs,
                            is_employed_by_entity:
                              isEmployedByEntity != (null || undefined)
                                ? isEmployedByEntity
                                : "",
                            //   is_postal_address_eq_physical_address:
                            //     isPostalAddress != (null || undefined)
                            //       ? isPostalAddress
                            //       : "",
                            //   unit_type_id:
                            //     unitTypeId != (null || undefined) ? unitTypeId : "",
                          });
                          // console.log("FROM ALL INPUTS", allInputs);
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
                          return AsyncStorage.getItem("@maritial_status");
                          //redirect to the next from
                          // if (redirect_status == true) {
                          //   window.location.href = "/tenant/application/step/two";
                          // }
                        })

                        .then((data) => {
                          // console.log(data);
                          if (data == 2) {
                            navigation.navigate("App2V2");
                          } else {
                            navigation.navigate("App3");
                          }
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

export default ApplicationStepTwo;
