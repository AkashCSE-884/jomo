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
  Platform,
} from "react-native";
import styles from "../assets/css/Style";
// import svg icons
import CompanyLogo from "../assets/img/mobile/CompanyLogo";
import { useNavigation } from "@react-navigation/native";
import ShowHideIcon from "../assets/img/mobile/ShowHideIcon";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import CheckBox from "expo-checkbox";
import MainHeader from "../components/nav/MainHeader";
import Otp from "../components/modals/Otp";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { useValidation } from "react-native-form-validator";
import * as DocumentPicker from "expo-document-picker";
import PrimaryButton from "../components/buttons/PrimaryButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
let get_data_from_storage = async (key) => {
  let sto_data = await AsyncStorage.getItem(key);
  return sto_data;
};

function RegStepTwoScreen() {
  let alldoc = {
    iddoc: {},
  };
  let [allInputs, setAllInputs] = useState({});
  let [comm, setComm] = useState("");
  let [docPath, setDocPath] = useState("");

  let [name, setName] = useState("");
  let [surname, setSurname] = useState("");
  let [id_num, set_id_num] = useState("");
  let [contact_num, setcontact_num] = useState("");
  let [email, setEmail] = useState("");

  let navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

  const [isCheckedAgree, setCheckedAgree] = useState(false);

  let [PassBool, changePassBool] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let onPressPassIcon = () => {
    changePassBool((e) => !e);
  };

  let [ConfirmPassBool, changeConfirmPassBool] = useState(true);
  let onPressConfirmPassIcon = () => {
    changeConfirmPassBool((e) => !e);
  };

  let PickDocument = async (doc) => {
    let selected_file = await DocumentPicker.getDocumentAsync({});
    if (selected_file.cancelled == true) {
      console.log("cancelled");
      return "cancelled";
    } else {
      let all_ = { ...alldoc };
      all_[doc] = selected_file;
      return file_upload(selected_file);
    }
    //  "name": "Screenshot_20230221_121646_host.exp.exponent.jpg", "size": 141799, "type": "success", "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FJOSHCO-42f1f7c8-ae7d-44f2-aa47-7b40b2ba42c9/DocumentPicker/10064c88-3394-4bec-94ce-9f00a2a6f4e3.jpg"}
  };

  async function file_upload(
    file_to_up,
    url = "http://saap.oservo.com:7777/api/pub/upload_id_doc"
  ) {
    if (!file_to_up || file_to_up.type == "cancel") {
      console.log("not uploaded");
      return "not uploaded";
    } else {
      const uri =
        Platform.OS === "android"
          ? file_to_up.uri
          : file_to_up.uri.replace("file://", "");

      const filename = file_to_up.uri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const ext = match?.[1];
      const type = match ? `image/${match[1]}` : `image`;

      let formData = new FormData();

      formData.append("image", {
        uri,
        name: `image.${ext}`,
        type,
      });

      // console.log("FORM DATA", formData);

      let fetched = await fetch(url, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      }).then((response) => response.json());

      // console.log("This is FETCHED", fetched);
      return [formData, fetched];
      // .then((data) => {
      //   console.log("res_data", data);
      //   url = data;
      //   return [formData, url];
      // })
      // .catch((error) => {
      //   console.error(error);
      // });
    }
  }

  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
    useValidation({
      state: {
        name,
        surname,
        id_num,
        contact_num,
        email,
        comm,
        isCheckedAgree,
        docPath,
        confirmPassword,
      },
    });
  const _onPressButton = () => {
    // console.log("running validation start");
    validate({
      name: { minlength: 3, maxlength: 7, required: true },
      surname: { minlength: 3, maxlength: 7, required: true },
      id_num: { numbers: true, required: true },
      contact_num: { numbers: true, required: true },
      email: { email: true, required: true },
      comm: { required: true },
      isCheckedAgree: { equalPassword: true, required: true },
      docPath: { minlength: 3, required: true },
      confirmPassword: {
        minlength: 4,
        equalPassword: newPassword,
        required: true,
      },

      // email: { email: true },
      // number: { numbers: true },
      // date: { date: 'YYYY-MM-DD' },
      // confirmPassword: { equalPassword: newPassword },
    });

    let error = getErrorMessages();
    // console.log(getErrorMessages());
    // console.log("running validation end");
    return error;
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.container}>
        <MainHeader />
        <Otp
          vis={modalVisible}
          onModalPress={() => {
            setModalVisible(!modalVisible);
            navigation.navigate("Home");
          }}
          title="LOGIN"
          modalFunc={() => {
            setModalVisible(false);
          }}
        />
        <ScrollView>
          <View style={{ padding: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Text style={styles.body_title}>{"<"} Registration</Text>
            </TouchableOpacity>
          </View>

          <View style={{ paddingHorizontal: 20 }}>
            <View>
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
                      setName(text);
                    }}
                  ></TextInput>
                </View>
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>{getErrorsInField("name")}</Text>
              </View>
            </View>

            <View style={{ marginVertical: 10 }}>
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
                      setSurname(text);
                    }}
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

            <View>
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
                      set_id_num(text);
                    }}
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

            <View style={{ marginTop: 20 }}>
              <Text style={{ fontWeight: "bold" }}>ID Upload:</Text>
              <Text style={{ color: "#231F20D9", marginTop: 5 }}>
                Please provide a copy of your ID
              </Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <View
                style={{
                  marginVertical: 20,
                  width: 120,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    PickDocument("iddoc").then((res) => {
                      // console.log("Pick Docc", res);
                      if (res == "not uploaded") {
                        console.log("nothing will happen");
                      } else {
                        console.log(res[1].image_path);
                        setDocPath(res[1].image_path);
                        setAllInputs({
                          ...allInputs,
                          id_num_doc_path: res[1].image_path,
                        });
                      }
                    });
                  }}
                  style={{ width: 120, height: 50 }}
                >
                  <Text
                    style={{
                      borderColor: "black",
                      borderWidth: 2,
                      backgroundColor: "black",
                      color: "white",
                      padding: 10,
                      borderRadius: 50,
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    UPLOAD
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              {/* <Text style={{ color: "red" }}> from text field </Text> */}
              <Text style={{ color: "red" }}>
                {getErrorsInField("docPath").length > 0
                  ? "Please upload an ID"
                  : ""}
              </Text>
            </View>

            <View>
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
                      setcontact_num(text);
                    }}
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

            <View>
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
                      setEmail(text);
                    }}
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

            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontWeight: "bold" }}>Password:</Text>
                  <Text style={{ color: "#BB2200" }}>*</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    marginLeft: 10,
                    backgroundColor: "#F2F2F2",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                    borderRadius: 10,
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <View
                    style={{
                      width: "80%",
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      borderRadius: 10,
                    }}
                  >
                    <TextInput
                      secureTextEntry={PassBool}
                      onChangeText={(text) => {
                        setAllInputs({ ...allInputs, pwd: text });
                        setNewPassword(text);
                        console.log("NEW PASSWORD", newPassword);
                      }}
                    ></TextInput>
                  </View>
                  <TouchableOpacity
                    style={{ paddingHorizontal: 5 }}
                    onPress={onPressPassIcon}
                  >
                    <ShowHideIcon state={PassBool}></ShowHideIcon>
                  </TouchableOpacity>
                </View>
              </View>
              {/* <View>
                <Text style={{ color: "red" }}> from text field </Text>
                <Text style={{ color: "red" }}>{getErrorsInField("name")}</Text>
              </View> */}
            </View>

            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontWeight: "bold" }}>Confirm Password:</Text>
                  <Text style={{ color: "#BB2200" }}>*</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    marginLeft: 10,
                    backgroundColor: "#F2F2F2",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                    borderRadius: 10,
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <View
                    style={{
                      width: "80%",
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      borderRadius: 10,
                    }}
                  >
                    <TextInput
                      secureTextEntry={ConfirmPassBool}
                      onChangeText={(text) => {
                        setAllInputs({ ...allInputs, confirm_pwd: text });
                        setConfirmPassword(text);
                      }}
                    ></TextInput>
                  </View>
                  <TouchableOpacity
                    style={{ paddingHorizontal: 5 }}
                    onPress={onPressConfirmPassIcon}
                  >
                    <ShowHideIcon state={ConfirmPassBool}></ShowHideIcon>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("confirmPassword")}
                </Text>
              </View>
            </View>

            <View style={{ paddingVertical: 30 }}>
              <View>
                <Text>
                  <Text>
                    Please select your preferred form of communication, this
                    will help us keep you up to date.
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
                  selected={comm}
                  onSelected={(value) => {
                    setComm(value);
                    setAllInputs({
                      ...allInputs,
                      notification_destination_type_id: value,
                    });
                  }}
                  radioBackground="gray"
                >
                  <RadioButtonItem
                    value={1}
                    label={<Text style={{ marginLeft: 10 }}>Phone/SMS</Text>}
                  />
                  <RadioButtonItem
                    value={2}
                    label={<Text style={{ marginLeft: 10 }}>Email</Text>}
                  />
                </RadioButtonGroup>
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("comm").length > 0
                    ? "Please check preferred communication"
                    : ""}
                </Text>
              </View>
            </View>

            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginVertical: 10,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <CheckBox
                    value={isCheckedAgree}
                    onValueChange={(e) => {
                      setCheckedAgree(e);
                      _onPressButton();
                    }}
                  />
                  <Text style={{ width: "90%", fontSize: 16, paddingLeft: 10 }}>
                    <Text style={{ color: "#BB2200" }}>*</Text>

                    <Text>
                      I hereby give Johannesburg Social House Company consent to
                      process my personal information, in accordance with the
                      provisions of the Protection of Personal Information Act,
                      for all purposes related to the carrying out of this
                      mandate. Such consent shall extend to the sharing of my
                      personal information with your trusted legal advisors who
                      you may approach for advice or assistance during the
                      provision of your services to me.
                    </Text>
                  </Text>
                </View>
              </View>
              <View>
                {/* <Text style={{ color: "red" }}> from text field </Text> */}
                <Text style={{ color: "red" }}>
                  {getErrorsInField("isCheckedAgree").length > 0
                    ? "The checkbox is empty"
                    : ""}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 0 }}>
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

                    console.log(newPassword);
                    let valid_error = _onPressButton();
                    console.log("This Is error", valid_error);

                    if (valid_error == "" && isCheckedAgree) {
                      console.log("Everything is fine");
                      get_data_from_storage("@reg_q_data")
                        .then((res) => {
                          console.log("FROM ASYNC", res);

                          setAllInputs({
                            ...allInputs,
                            ...res,
                            agreement_tick: isCheckedAgree,
                          });
                          console.log(allInputs);
                          return res;
                        })
                        .then((sto) => {
                          if (valid_error == "") {
                            return fetch(
                              "http://saap.oservo.com:7777/api/tenant/register",
                              {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify(allInputs),
                              }
                            );
                          } else {
                            console.log("Error on validation");
                          }
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
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default RegStepTwoScreen;
