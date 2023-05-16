import { View, Text, ScrollView } from "react-native";
import styles from "../assets/css/Style";
// import svg icons
import { useNavigation } from "@react-navigation/native";
import ShowHideIcon from "../assets/img/mobile/ShowHideIcon";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import MainHeader from "../components/nav/MainHeader";
import InvertBlackButton from "../components/buttons/InvertBlackButton";
import PrimaryButton from "../components/buttons/PrimaryButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

let get_data_from_storage = async (key) => {
  let sto_data = await AsyncStorage.getItem(key);
  return sto_data;
};

function ProfileScreen(props) {
  let [profileData, setProfileData] = useState({});
  let [allInputs, setAllInputs] = useState({});
  let [editAble, setEditAble] = useState(false);
  useEffect(() => {
    get_data_from_storage("@whole_login_data").then((e) => {
      let parsed = JSON.parse(e);
      let pro_data = parsed.ret_data[0];
      setProfileData({
        ...profileData,
        name: pro_data.name,
        surname: pro_data.surname,
        id_num: pro_data.id_num,
        contact_num: pro_data.contact_num,
        email: pro_data.email,
        usr_id: pro_data.usr_id,
      });
      setAllInputs({
        ...allInputs,
        email: pro_data.email,
        contact_num: pro_data.contact_num,
        pwd: pro_data.pwd,
      });
    });
  }, []);
  const navigation = useNavigation();

  let [bool, changeBool] = useState(true);
  let onPressIcon = () => {
    changeBool((e) => !e);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View style={styles.container}>
        <MainHeader />
        <ScrollView>
          <View style={styles.nav_logo}>
            <View style={{ padding: 10 }}>
              <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Text style={styles.body_title}>{"<"} Profile</Text>
              </TouchableOpacity>
            </View>

            <View style={{ paddingHorizontal: 30 }}>
              <View>
                <Text style={{ color: "#231F20B2", fontSize: 15 }}>
                  Name and Surname:
                </Text>
                <Text
                  style={{ fontWeight: "bold", marginTop: 5, fontSize: 16 }}
                >
                  {profileData.name} {profileData.surname}
                </Text>
              </View>

              <View style={{ marginTop: 20 }}>
                <Text style={{ color: "#231F20B2", fontSize: 15 }}>
                  ID/Passport Number:
                </Text>
                <Text
                  style={{ fontWeight: "bold", marginTop: 5, fontSize: 16 }}
                >
                  {profileData.id_num}
                </Text>
              </View>

              <View style={{ marginTop: 20 }}>
                <View>
                  <Text style={{ color: "#231F20", fontSize: 15 }}>
                    Contact number:
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
                    placeholder="081 234 5678"
                    editable={editAble}
                    onChangeText={(text) => {
                      setAllInputs({
                        ...allInputs,
                        contact_num: text,
                      });
                    }}
                    defaultValue={profileData.contact_num}
                  ></TextInput>
                </View>
              </View>

              <View style={{ marginTop: 20 }}>
                <View>
                  <Text style={{ color: "#231F20", fontSize: 15 }}>
                    Email Address:
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
                    editable={editAble}
                    onChangeText={(text) => {
                      setAllInputs({
                        ...allInputs,
                        email: text,
                      });
                    }}
                    defaultValue={profileData.email}
                    placeholder="email@gmail.com"
                  ></TextInput>
                </View>
              </View>

              <View style={{ marginTop: 20 }}>
                <Text style={{ color: "#231F20B2", fontSize: 15 }}>
                  Unique ID:
                </Text>
                <Text
                  style={{ fontWeight: "bold", marginTop: 5, fontSize: 16 }}
                >
                  {profileData.usr_id}
                </Text>
              </View>

              <View style={{ marginTop: 20 }}>
                <View>
                  <Text style={{ color: "#231F20B2", fontSize: 15 }}>
                    Password:
                  </Text>
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
                      editable={editAble}
                      secureTextEntry={bool}
                      onChangeText={(text) => {
                        setAllInputs({
                          ...allInputs,
                          pwd: text,
                        });
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
                  <Text style={{ textAlign: "right" }}>Reset Password</Text>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  paddingTop: 40,
                  height: 120,
                }}
              >
                {/* <InvertBlackButton
                  width={120}
                  height={50}
                  route="Home"
                  title="Edit"
                /> */}
                <View style={{ width: "50%" }}>
                  {/* <InvertBlackButton
                                        width='100%'
                                        height='100%'
                                        title='SAVE' /> */}
                  <View style={styles.nav_logo}>
                    <TouchableOpacity
                      onPress={() => {
                        setEditAble(true);
                      }}
                      style={{ width: 120, height: "auto" }}
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
                        {"EDIT"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <PrimaryButton
                  width={120}
                  height={50}
                  //   route="Home"
                  title="Save"
                  additionalFunc={() => {
                    let form_data = {
                      ...allInputs,
                      name: profileData.name,
                      surname: profileData.surname,
                    };
                    if (editAble) {
                      fetch(
                        "http://saap.oservo.com:7777/api/tenant/profile/update",
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(form_data),
                        }
                      )
                        .then((data) => {
                          if (!data.ok) {
                            throw Error(data.status);
                          }
                          return data.json();
                        })
                        .then((res) => {
                          console.log(res);
                        });
                    } else {
                      console.log("First click edit button");
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

export default ProfileScreen;
