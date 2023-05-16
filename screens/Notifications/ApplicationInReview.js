import { View, Text } from "react-native";
import styles from "../../assets/css/Style";
// import svg icons
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import MainHeader from "../../components/nav/MainHeader";
import PrimaryButton from "../../components/buttons/PrimaryButton";

function ApplicationInReview({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.container}>
        <MainHeader />

        <ScrollView>
          <View style={{ padding: 10, paddingHorizontal: 20 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Text style={styles.body_title}>{"<"} Application In Review</Text>
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
                    Application Status:
                  </Text>
                </View>
                <View>
                  <Text style={{ textAlign: "left", fontSize: 18 }}>
                    Application in Review
                  </Text>
                </View>
              </View>

              <View style={{ marginVertical: 10 }}>
                <View>
                  <Text
                    style={{
                      textAlign: "left",
                      fontWeight: "bold",
                      fontSize: 18,
                    }}
                  >
                    Date:
                  </Text>
                </View>
                <View>
                  <Text style={{ textAlign: "left", fontSize: 18 }}>
                    12/11/2022
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View>
            <View style={{ marginVertical: 20 }}>
              <View>
                <Text
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: 18,
                    paddingHorizontal: 30,
                  }}
                >
                  Project:
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    textAlign: "left",
                    fontSize: 18,
                    paddingHorizontal: 30,
                  }}
                >
                  Inner City
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <View>
                <Text
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: 18,
                    paddingHorizontal: 30,
                  }}
                >
                  Address:
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    textAlign: "left",
                    fontSize: 18,
                    paddingHorizontal: 30,
                  }}
                >
                  African Diamond Building, 25 Kerk Street, Johannesburg.
                  RegionD
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <View>
                <Text
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: 18,
                    paddingHorizontal: 30,
                  }}
                >
                  Unit Type: :
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    textAlign: "left",
                    fontSize: 18,
                    paddingHorizontal: 30,
                  }}
                >
                  2 Bedroom
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <View>
                <Text
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: 18,
                    paddingHorizontal: 30,
                  }}
                >
                  Date Submitted:
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    textAlign: "left",
                    fontSize: 18,
                    paddingHorizontal: 30,
                  }}
                >
                  15/11/2022
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default ApplicationInReview;
