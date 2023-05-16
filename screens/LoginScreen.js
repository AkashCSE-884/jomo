import {
  TouchableOpacity,
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
import Config from "react-native-config";
import Constants from "expo-constants";

// import svg icons

import { TextInput } from "react-native-gesture-handler";
import DarkCompanyLogo from "../assets/img/mobile/DarkCompanyLogo";
import { useState } from "react";
import ShowHideIcon from "../assets/img/mobile/ShowHideIcon";
import BlackButton from "../components/buttons/BlackButton";
import PrimaryButton from "../components/buttons/PrimaryButton";
import Otp from "../components/modals/Otp";
import ForgotPass from "../components/modals/ForgotPass";
import LinkSent from "../components/modals/LinkSent";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import CookieManager from "@react-native-cookies/cookies";
let set_data_to_storage = async (key, value) => {
  const jsonValue = JSON.stringify(value);
  return await AsyncStorage.setItem(key, jsonValue);
};

function LoginScreen({ navigation }) {
  let [allInputs, setAllInputs] = useState({
    "email_or_mobile_num": "eknoyon@gmail.com",
    "pwd": "123",

    //application_id: 4
  });
  var stateEx = {};
  const [modalVisible, setModalVisible] = useState(false);
  const [modalForgotVisible, setModalForgotVisible] = useState(false);
  const [modalLinkVisible, setModalLinkVisible] = useState(false);
  let [bool, changeBool] = useState(true);
  let onPressIcon = () => {
    changeBool((e) => !e);
  };
  let form_data = {
    email: "a@b.ccc", //email.value.trim(),
    pwd: 12344, //pwd.value.trim()
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={[styles.container, { paddingHorizontal: 30 }]}>
        <View
          style={{
            width: "100%",
            height: "20%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <DarkCompanyLogo width={"100%"} height={"100%"}></DarkCompanyLogo>
        </View>
        <Otp
          vis={modalVisible}
          onModalPress={() => {
            // setModalVisible(!modalVisible);
            // navigation.navigate("Home");
            let otp = 1234;
            if (otp != "") {
              let form_data = {
                otp: otp,
                email_or_mobile_num: allInputs.email_or_mobile_num,
              };
              let isOk = false;
              fetch(
                Constants.expoConfig.extra.apiUrl +
                  "/api/tenant/login-step-two",
                {
                  credentials: "include",
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(form_data),
                }
              )
                .then((data) => {
                  //debugger
                  // if (!data.ok) {
                  //     throw Error(data.status);
                  // }
                  if (data.ok) {
                    isOk = true;
                  }
                  AsyncStorage.setItem(
                    "@login_cookie",
                    data.headers.map["set-cookie"]
                  );
                  return data.json();
                })
                .then((res) => {
                  if (res.error) {
                    // app.alert(app.extractGracefulError(res.error));
                    throw Error(res.error);
                  }
                  console.log(res);

                  if (res.assert_msg) {
                    throw Error(res.assert_msg);
                  }
                  // window.location.href = "/tenant/home";
                  navigation.navigate("Home");
                  console.log(res);
                });
            } else {
              throw Error("Please Enter The Otp");
            }
          }}
          title="LOGIN"
          modalFunc={() => {
            setModalVisible(!modalVisible);
            // console.log("I am in login otp");
          }}
        />
        <ForgotPass
          vis={modalForgotVisible}
          onModalPress={() => {
            setModalForgotVisible(!modalForgotVisible);
            setModalLinkVisible(!modalLinkVisible);
            //  navigation.navigate('Home');
          }}
          title="RESET PASSWORD"
        />
        <LinkSent
          vis={modalLinkVisible}
          onModalPress={() => {
            setModalLinkVisible(!modalLinkVisible);
            //  navigation.navigate('Home');
          }}
          title="CLOSE"
        />

        <ScrollView style={{ marginTop: 20 }}>
          <View>
            <Text style={{ color: "#231F20", fontSize: 15 }}>
              Email/Mobile:
            </Text>
          </View>

          <View>
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
                setAllInputs({ ...allInputs, email_or_mobile_num: text });
              }}
            ></TextInput>
          </View>
          <View style={{ marginTop: 20 }}>
            <View>
              <Text>Password:</Text>
            </View>

            <View
              style={{
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
                  default="123"
                  secureTextEntry={bool}
                  onChangeText={(text) => {
                    setAllInputs({ ...allInputs, pwd: text });
                  }}
                ></TextInput>
              </View>
              <TouchableOpacity
                style={{ paddingHorizontal: 5 }}
                onPress={onPressIcon}
              >
                <ShowHideIcon state={bool}></ShowHideIcon>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 5 }}>
              <TouchableOpacity
                onPress={() => {
                  setModalForgotVisible(!modalForgotVisible);
                  // navigation.navigate('Home');
                }}
              >
                <Text style={{ textAlign: "right", color: "#231F2080" }}>
                  Forget Password?
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <View
                style={{ flex: 1, alignItems: "center", paddingVertical: 20 }}
              >
                {/* <PrimaryButton width={200} height={50} route="Home" title="LOGIN" /> */}
                <TouchableOpacity
                  style={{ width: 200, height: 50 }}
                  onPress={() => {
                    // setModalVisible(!modalVisible);
                    // navigation.navigate(r'Home');
                    console.log("clicked");
                    console.log(allInputs);
                    fetch(
                      Constants.expoConfig.extra.apiUrl + "/api/tenant/login",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(allInputs),
                      }
                    )
                      .then((data) => {
                        // if (!data.ok) {
                        //   throw Error(data.status);
                        // }
                        // console.log("inside Login");
                        // console.log(data);
                        // // console.log(data.headers.map["set-cookie"]);
                        // AsyncStorage.setItem(
                        //   "@login_cookie",
                        //   data.headers.map["set-cookie"]
                        // );
                        // return data.json();

                        let isOk = false;
                        if (data.ok) {
                          isOk = true;
                        }
                        console.log(data);
                        console.log(...data.headers);
                        return data.json();
                      })
                      .then((res) => {
                        // console.log(res);
                        // ret_data = res;
                        // set_data_to_storage("@whole_login_data", res);
                        // window.location.href = url + "/tenant/home";
                        // open_modal(tenant_otp_modal);

                        if (res.error) {
                          // app.alert(app.extractGracefulError(res.error));
                          throw Error(res.error);
                        }
                        console.log(res);

                        if (res.assert_msg) {
                          // app.alert(app.extractGracefulError(res.assert_msg));
                          throw Error(res.assert_msg);
                        }

                        console.log(res);
                        stateEx.email = allInputs.email_or_mobile_num;

                        // ret_data = res;
                        // if (isOk && res.error == (null || undefined)) {
                        //     window.location.href = '/tenant/home';
                        // } else app.alert(app.extractGracefulError(res.error));
                        // window.location.href = url + "/tenant/home";
                        // open_modal(tenant_otp_modal);
                        if (res.email) {
                          // login_otp.show();
                          setModalVisible(!modalVisible);
                        }

                        // navigation.navigate("Home");
                      });
                    // .then(() => {});
                  }}
                >
                  <Text
                    style={{
                      borderColor: "#FBAF19",
                      borderWidth: 1,
                      backgroundColor: "#FBAF19",
                      color: "#231F20",
                      padding: 10,
                      borderRadius: 50,
                      textAlign: "center",
                    }}
                  >
                    {"LOGIN"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View
            style={{
              marginHorizontal: 8,
              marginVertical: 20,
              borderWidth: 1,
              borderBottomColor: "#231F201A",
            }}
          ></View>

          <View>
            <View>
              <Text style={{ textAlign: "center", fontSize: 16 }}>
                Don't have an account?
              </Text>
            </View>
            <View
              style={{ flex: 1, alignItems: "center", paddingVertical: 20 }}
            >
              <BlackButton
                width={200}
                height={50}
                route="Reg1"
                title="Register"
              />
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={{ textAlign: "center" }}>
              To see a full overview of the accommodation Joshco offers view
            </Text>
            <Text
              style={{ textAlign: "center", textDecorationLine: "underline" }}
            >
              Joshco's accommodation list.
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default LoginScreen;
