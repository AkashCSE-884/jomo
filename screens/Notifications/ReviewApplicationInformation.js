import { View, Text } from "react-native";
import styles from "../../assets/css/Style";
// import svg icons
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import MainHeader from "../../components/nav/MainHeader";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { useState } from "react";
import CheckBox from "expo-checkbox";

function ReviewApplicationInformation({ navigation }) {
  const [isCheckedFirst, setCheckedFirst] = useState(false);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.container}>
        <MainHeader />

        <ScrollView>
          <View style={{ padding: 10, paddingHorizontal: 20 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Text style={styles.body_title}>{"<"} Application Submitted</Text>
              <Text style={{ fontSize: 15, color: "#231F2099" }}>
                05 Dec 2022
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ paddingHorizontal: 30, marginVertical: 30 }}>
            <View
              style={{
                borderBottomColor: "#efefef",
                borderBottomWidth: 2,
                paddingBottom: 30,
              }}
            >
              <View style={{ marginBottom: 10 }}>
                <View>
                  <Text
                    style={{
                      textAlign: "left",
                      fontWeight: "bold",
                      fontSize: 18,
                    }}
                  >
                    A Unit is available!
                  </Text>
                </View>
                <View>
                  <Text
                    style={{ textAlign: "left", fontSize: 18, marginTop: 10 }}
                  >
                    A unit has become available and you have been taken off of
                    the waitlist. Please confirm that your information has not
                    change and is still correct, if any information has changed
                    please edit your application accordingly
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <View>
                  <CheckBox
                    onValueChange={(bol) => {
                      setCheckedFirst(bol);
                      // console.log("clicked", bol);
                      // setAllInputs({
                      //   ...allInputs,
                      //   aggrement_condition_1_tick: bol,
                      // });
                    }}
                    value={isCheckedFirst}
                  />
                </View>

                <View style={{ marginLeft: 10 }}>
                  <Text style={{ fontSize: 18 }}>
                    I confirm that the information in the application has not
                    changed and is correct.
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <View
                style={{
                  marginRight: "auto",
                  marginLeft: "auto",
                  width: "80%",
                  marginTop: 20,
                }}
              >
                <PrimaryButton
                  width="100%"
                  height="100%"
                  title="REVIEW APPLICATION"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default ReviewApplicationInformation;
