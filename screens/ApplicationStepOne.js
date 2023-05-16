import { View, Text, ScrollView } from "react-native";
import styles from "../assets/css/Style";
// import svg icons
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import MainHeader from "../components/nav/MainHeader";
import DropDownPicker from "react-native-dropdown-picker";
import PrimaryButton from "../components/buttons/PrimaryButton";
import InvertBlackButton from "../components/buttons/InvertBlackButton";
import AppSaved from "../components/modals/AppSaved";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { useValidation } from "react-native-form-validator";
let set_data_to_storage = async (key, value) => {
  const jsonValue = JSON.stringify(value);
  return await AsyncStorage.setItem(key, jsonValue);
};

function ApplicationStepOne({ navigation }) {
  let [allInputs, setAllInputs] = useState({
    property_id: 9,
    application_id: 1,
    step: "one",
  });
  //drop down start
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [items, setItems] = useState([
    { label: "Single", value: 1 },
    { label: "Married", value: 2 },
    { label: "Divorced", value: 3 },
    { label: "Widowed", value: 4 },
  ]);

  const [isOwner, setIsOwner] = useState("");
  const [isPostalAddress, setIsPostalAddress] = useState("");
  const [unitTypeId, setUnitTypeId] = useState("");
  let [fetchedDepDetails, setFetchedDepDetails] = useState([]);

  // end drop down

  // let depDetails = [];

  const [modalAppVisible, setModalAppVisible] = useState(false);

  let [stepOneData, setStepOneData] = useState({});
  let get_data_from_storage = async (key) => {
    let sto_data = await AsyncStorage.getItem(key);
    return sto_data;
  };

  let getStepOneData = async () => {
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
          step: "one",
        }),
      }
    );
    let json_data = await fetched.json();
    console.log(json_data.ret_data[0]);
    setStepOneData(json_data.ret_data[0]);
    setAllInputs({
      ...allInputs,
      ...stepOneData,
    });
    setIsOwner(json_data.ret_data[0].is_owner_of_current_dwell);
    setIsPostalAddress(
      json_data.ret_data[0].is_postal_address_eq_physical_address
    );
    setUnitTypeId(json_data.ret_data[0].unit_type_id);
    setValue(json_data.ret_data[0].marital_status_type_id);
    setFetchedDepDetails(json_data.ret_data[0].dependent_detail);
    // depDetails = json_data.ret_data[0].dependent_detail;
  };

  useEffect(() => {
    getStepOneData();
  }, []);

  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
    useValidation({
      state: {
        ...allInputs,
        isOwner,
        isPostalAddress,
        value,

        //  email, number, date, newPassword, confirmPassword
      },
    });

  const _onPressButton = () => {
    // console.log("running validation start");
    validate({
      name: { minlength: 3, maxlength: 7, required: true },
      surname: { minlength: 3, maxlength: 7, required: true },
      maiden_name: {},
      id_num: { numbers: true, required: true },
      contact_num: { numbers: true, required: true },
      email: { email: true, required: true },
      physical_address_line_1: { required: true },
      physical_address_line_2: { required: true },
      physical_address_line_3: { required: true },
      isOwner: { required: true },
      isPostalAddress: { required: true },
      postal_address_line_1: { required: true },
      postal_address_line_2: { required: true },
      postal_address_line_3: { required: true },
      alt_contact_num: { numbers: true, required: true },
      next_of_kin: { minlength: 3, maxlength: 7, required: true },
      next_of_kin_contact_num: { numbers: true, required: true },
      next_of_kin_email: { email: true, required: true },
      value: { required: true },
      num_of_adults: { numbers: true, required: true },
      num_of_dependents: { numbers: true, required: true },

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
      {/* <Pressable disabled={true} onPress={()=>{
                setModalAppVisible(modalAppVisible = false)
            }}> */}
      <View style={styles.container}>
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
          <View style={{ padding: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Text style={styles.body_title}>
                &lsaquo; Application - Step 1
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingHorizontal: 25 }}>
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
                      setAllInputs({ ...allInputs, name: text });
                    }}
                    editable={true}
                    defaultValue={stepOneData.name}
                  ></TextInput>
                </View>
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>{getErrorsInField("name")}</Text>
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
                      setAllInputs({ ...allInputs, surname: text });
                    }}
                    defaultValue={stepOneData.surname}
                  ></TextInput>
                </View>
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("surname")}
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
                      setAllInputs({ ...allInputs, maiden_name: text });
                    }}
                    defaultValue={stepOneData.maiden_name}
                  ></TextInput>
                </View>
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("maiden_name")}
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
                      setAllInputs({ ...allInputs, id_num: text });
                    }}
                    defaultValue={stepOneData.id_num}
                  ></TextInput>
                </View>
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("id_num")}
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
                      setAllInputs({ ...allInputs, contact_num: text });
                    }}
                    defaultValue={stepOneData.contact_num}
                  ></TextInput>
                </View>
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("contact_num")}
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
                      setAllInputs({ ...allInputs, email: text });
                    }}
                    defaultValue={stepOneData.email}
                  ></TextInput>
                </View>
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("email")}
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
                        physical_address_line_1: text,
                      });
                    }}
                    defaultValue={stepOneData.physical_address_line_1}
                  ></TextInput>
                </View>
                <View>
                  {/* <Text style={{ color: "red" }}> from text field </Text> */}
                  <Text style={{ color: "red" }}>
                    {getErrorsInField("physical_address_line_1")}
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
                        physical_address_line_2: text || "",
                      });
                    }}
                    defaultValue={stepOneData.physical_address_line_2}
                  ></TextInput>
                </View>
                <View>
                  {/* <Text style={{ color: "red" }}> from text field </Text> */}
                  <Text style={{ color: "red" }}>
                    {getErrorsInField("physical_address_line_2")}
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
                        physical_address_line_3: text || "",
                      });
                    }}
                    defaultValue={stepOneData.physical_address_line_3}
                  ></TextInput>
                </View>
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("physical_address_line_3")}
                </Text>
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
                        postal_address_line_1: text,
                      });
                    }}
                    defaultValue={stepOneData.postal_address_line_1}
                  ></TextInput>
                </View>
                <View>
                  {/* <Text style={{ color: "red" }}> from text field </Text> */}
                  <Text style={{ color: "red" }}>
                    {getErrorsInField("postal_address_line_1")}
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
                        postal_address_line_2: text,
                      });
                    }}
                    defaultValue={stepOneData.postal_address_line_2}
                  ></TextInput>
                </View>
                <View>
                  {/* <Text style={{ color: "red" }}> from text field </Text> */}
                  <Text style={{ color: "red" }}>
                    {getErrorsInField("postal_address_line_2")}
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
                        postal_address_line_3: text,
                      });
                    }}
                    defaultValue={stepOneData.postal_address_line_3}
                  ></TextInput>
                </View>
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("postal_address_line_3")}
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
                    Alternative Number:
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
                      setAllInputs({ ...allInputs, alt_contact_num: text });
                    }}
                    defaultValue={stepOneData.alt_contact_num}
                  ></TextInput>
                </View>
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("alt_contact_num")}
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
                  <Text style={{ fontWeight: "bold" }}>Alternative Email:</Text>
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
                      setAllInputs({ ...allInputs, alt_email: text });
                    }}
                    defaultValue={stepOneData.alt_email}
                  ></TextInput>
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
                  <Text style={{ fontWeight: "bold" }}>Next Of Kin:</Text>
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
                      setAllInputs({ ...allInputs, next_of_kin: text });
                    }}
                    defaultValue={stepOneData.next_of_kin}
                  ></TextInput>
                </View>
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("next_of_kin")}
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
                      setAllInputs({
                        ...allInputs,
                        next_of_kin_contact_num: text,
                      });
                    }}
                    defaultValue={stepOneData.next_of_kin_contact_num}
                  ></TextInput>
                </View>
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("next_of_kin_contact_num")}
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
                      setAllInputs({ ...allInputs, next_of_kin_email: text });
                    }}
                    defaultValue={stepOneData.next_of_kin_email}
                  ></TextInput>
                </View>
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("next_of_kin_email")}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <View style={{ flex: 2, flexDirection: "row", padding: 10 }}>
                <View style={{ flex: 1, marginTop: 10, marginBottom: 20 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold" }}>Marital Status:</Text>
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
                      console.log(val);
                      setAllInputs({
                        ...allInputs,
                        marital_status_type_id: val,
                      });
                    }}
                  />
                </View>
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("value")}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text>
                Who will be staying at the premises for the whole period of the
                lease?
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
                  <Text style={{ fontWeight: "bold" }}>Number of Adults:</Text>
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
                      setAllInputs({ ...allInputs, num_of_adults: text });
                      console.log(fetchedDepDetails);
                    }}
                    defaultValue={JSON.stringify(stepOneData.num_of_adults)}
                  ></TextInput>
                </View>
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("num_of_adults")}
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
                    Number of Dependents:
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
                      setAllInputs({ ...allInputs, num_of_dependents: text });
                    }}
                    defaultValue={JSON.stringify(stepOneData.num_of_dependents)}
                  ></TextInput>
                </View>
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("num_of_dependents")}
                </Text>
              </View>
              <Text>
                *Dependents must be under the age of 18 years to qualify.
              </Text>
            </View>

            <View style={{ marginTop: 15 }}>
              <View style={{ marginBottom: 5 }}>
                <Text style={{ fontWeight: "bold" }}>
                  Please provide the dependent's names:
                </Text>
              </View>
              <View>
                {fetchedDepDetails ? (
                  fetchedDepDetails.map((each_d, each_indx, array) => {
                    if (each_indx == array.length - 1) {
                      return (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontWeight: "bold" }}>
                              {each_indx + 1}:
                            </Text>
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
                                let all_data = fetchedDepDetails;
                                all_data[each_indx].name = text;
                                setFetchedDepDetails(all_data);
                                // setAllInputs({
                                //   ...allInputs,
                                //   dependent_detail: [
                                //     {
                                //       age_months: "",
                                //       age_years: "",
                                //       name: text,
                                //     },
                                //   ],
                                // });
                                // depDetails[each_indx].name = text;
                              }}
                              defaultValue={each_d.name}
                            ></TextInput>
                          </View>
                          <View style={{ marginLeft: 10 }}>
                            <TouchableOpacity
                              onPress={() => {
                                let all_data = fetchedDepDetails;
                                all_data.push({
                                  name: "",
                                  age_months: "",
                                  age_years: "",
                                });
                                setFetchedDepDetails(all_data);
                                setAllInputs({
                                  ...allInputs,
                                  dependent_detail: fetchedDepDetails,
                                });
                              }}
                            >
                              <View
                                style={{
                                  backgroundColor: "#000",
                                  paddingHorizontal: 15,
                                  paddingVertical: 4,
                                  borderRadius: 10,
                                  marginTop: 10,
                                  marginBottom: "auto",
                                }}
                              >
                                <Text style={{ fontSize: 25, color: "#fff" }}>
                                  +
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      );
                    } else {
                      return (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontWeight: "bold" }}>
                              {each_indx + 1}:
                            </Text>
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
                                let all_data = fetchedDepDetails;
                                all_data[each_indx].name = text;
                                setFetchedDepDetails(all_data);
                                setAllInputs(allInputs);
                                // setAllInputs({
                                //   ...allInputs,
                                //   dependent_detail: [
                                //     {
                                //       age_months: "",
                                //       age_years: "",
                                //       name: text,
                                //     },
                                //   ],
                                // });
                                // if (depDetails[each_indx] == undefined) {
                                //   depDetails[each_indx] = {};
                                //   depDetails[each_indx].name = text;
                                // } else {
                                //   depDetails[each_indx].name = text;
                                // }
                              }}
                              defaultValue={each_d.name}
                            ></TextInput>
                          </View>
                        </View>
                      );
                    }
                  })
                ) : (
                  <Text>Loading</Text>
                )}
              </View>
            </View>

            <View style={{ marginTop: 15 }}>
              <View style={{ marginBottom: 5 }}>
                <Text style={{ fontWeight: "bold" }}>
                  Please provide the dependent's age:
                </Text>
              </View>
              <View>
                {fetchedDepDetails ? (
                  fetchedDepDetails.map((each_d, each_indx, array) => {
                    return (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <View style={{ flexDirection: "row" }}>
                          <Text style={{ fontWeight: "bold" }}>
                            {each_indx + 1}:
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 3,
                            flexDirection: "row",
                            marginLeft: 10,
                          }}
                        >
                          <View style={{ flex: 1 }}>
                            <TextInput
                              placeholder="MM"
                              style={{
                                backgroundColor: "#F2F2F2",
                                paddingHorizontal: 15,
                                paddingVertical: 10,
                                borderRadius: 10,
                                marginTop: 10,
                                marginRight: 10,
                              }}
                              onChangeText={(text) => {
                                let all_data = fetchedDepDetails;
                                all_data[each_indx].age_months = text;
                                setFetchedDepDetails(all_data);
                                // setAllInputs({
                                //   ...allInputs,
                                //   dependent_1_age_y: text,
                                // });
                                // if (depDetails[each_indx] == undefined) {
                                //   depDetails[each_indx] = {};
                                //   depDetails[each_indx].age_months = text;
                                // } else {
                                //   depDetails[each_indx].age_months = text;
                                // }
                                // console.log("This is index", depDetails);
                              }}
                              defaultValue={each_d.age_months}
                            ></TextInput>
                          </View>
                          <View style={{ flex: 1 }}>
                            <TextInput
                              placeholder="YYYY"
                              style={{
                                backgroundColor: "#F2F2F2",
                                paddingHorizontal: 15,
                                paddingVertical: 10,
                                borderRadius: 10,
                                marginTop: 10,
                                marginLeft: 10,
                              }}
                              onChangeText={(text) => {
                                let all_data = fetchedDepDetails;
                                all_data[each_indx].age_years = text;
                                setFetchedDepDetails(all_data);
                                // setAllInputs({
                                //   ...allInputs,
                                //   dependent_1_age_y: text,
                                // });
                                // depDetails[each_indx].age_years = text;
                              }}
                              defaultValue={each_d.age_years}
                            ></TextInput>
                          </View>
                        </View>
                      </View>
                    );
                  })
                ) : (
                  <Text>Loading</Text>
                )}
              </View>
            </View>

            <Text style={{ fontSize: 18, marginTop: 20 }}>Unit Type:</Text>

            <View>
              <RadioButtonGroup
                containerStyle={{
                  flexDirection: "column",
                  marginVertical: 10,
                }}
                selected={unitTypeId}
                onSelected={(value) => setUnitTypeId(value)}
                radioBackground="gray"
              >
                <RadioButtonItem
                  style={{ marginTop: 10 }}
                  value={1}
                  label={
                    <Text style={{ marginLeft: 10, marginTop: 8 }}>
                      1 Bedroom
                    </Text>
                  }
                />
                <RadioButtonItem
                  style={{ marginTop: 10 }}
                  value={2}
                  label={
                    <Text style={{ marginLeft: 10, marginTop: 8 }}>
                      2 Bedroom
                    </Text>
                  }
                />
                <RadioButtonItem
                  style={{ marginTop: 10 }}
                  value={3}
                  label={
                    <Text style={{ marginLeft: 10, marginTop: 8 }}>Room</Text>
                  }
                />
              </RadioButtonGroup>
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
                                        title='SAVE' /> */}
                <View style={styles.nav_logo}>
                  <TouchableOpacity
                    style={{ width: 120, height: "auto" }}
                    onPress={() => {
                      // navigation.navigate(route)
                      if (_onPressButton() == "") {
                        setModalAppVisible(!modalAppVisible);
                        console.log("Everything is fine");
                        get_data_from_storage("@login_cookie")
                          .then((res) => {
                            // console.log("FROM ASYNC", res);
                            set_data_to_storage(
                              "@maritial_status",
                              allInputs.marital_status_type_id
                            );
                            setAllInputs({
                              ...allInputs,
                              is_owner_of_current_dwell:
                                isOwner != (null || undefined) ? isOwner : "",
                              is_postal_address_eq_physical_address:
                                isPostalAddress != (null || undefined)
                                  ? isPostalAddress
                                  : "",
                              unit_type_id:
                                unitTypeId != (null || undefined)
                                  ? unitTypeId
                                  : "",
                              dependent_detail:
                                fetchedDepDetails != (null || undefined)
                                  ? fetchedDepDetails
                                  : [],
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
                            return AsyncStorage.getItem("@login_cookie");
                            //redirect to the next from
                            // if (redirect_status == true) {
                            //   window.location.href = "/tenant/application/step/two";
                            // }
                          });
                      } else {
                        console.log("Input(s) are not valid");
                      }
                    }}
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
                  // route="App2"
                  additionalFunc={() => {
                    // console.log(
                    //   "FROM onPress",
                    //   typeof _onPressButton(),
                    //   _onPressButton()
                    // );
                    if (_onPressButton() == "") {
                      console.log("Everything is fine");
                      get_data_from_storage("@login_cookie")
                        .then((res) => {
                          // console.log("FROM ASYNC", res);
                          set_data_to_storage(
                            "@maritial_status",
                            allInputs.marital_status_type_id
                          );
                          setAllInputs({
                            ...allInputs,
                            is_owner_of_current_dwell:
                              isOwner != (null || undefined) ? isOwner : "",
                            is_postal_address_eq_physical_address:
                              isPostalAddress != (null || undefined)
                                ? isPostalAddress
                                : "",
                            unit_type_id:
                              unitTypeId != (null || undefined)
                                ? unitTypeId
                                : "",
                            dependent_detail:
                              fetchedDepDetails != (null || undefined)
                                ? fetchedDepDetails
                                : [],
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
                          return AsyncStorage.getItem("@login_cookie");
                          //redirect to the next from
                          // if (redirect_status == true) {
                          //   window.location.href = "/tenant/application/step/two";
                          // }
                        })
                        .then((data) => {
                          console.log(data);
                          if (allInputs.marital_status_type_id == 2) {
                            navigation.navigate("App1V2");
                          } else {
                            navigation.navigate("App2");
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
      {/* </Pressable> */}
    </View>
  );
}

export default ApplicationStepOne;
