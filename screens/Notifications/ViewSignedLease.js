import { View, Text } from "react-native";
import styles from "../../assets/css/Style";
// import svg icons
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MainHeader from "../../components/nav/MainHeader";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import InvertBlackButton from "../../components/buttons/InvertBlackButton";
// import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
// import * as Permissions from "expo-permissions";
import * as Linking from "expo-linking";
import { useEffect, useState } from "react";
let saveFile = async (fileUri) => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  if (status === "granted") {
    const asset = await MediaLibrary.createAssetAsync(fileUri);
    await MediaLibrary.createAlbumAsync("Download", asset, false);
  }
};
let payload = {
  notification_id: 142,
  application_id: 47,
  // "application_id": this.state.application_id
};

function ViewSignedLease({ navigation }) {
  let [notificationData, setNotificationData] = useState({});
  let getProjects = async (area_id) => {
    let fetched = await fetch(
      "http://saap.oservo.com:7777/api/tenant/notification/view-signed-lease-view",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...payload,
          // offset: 0,
          limit: 50,
          // opt__area_id: area_id,
        }),
      }
    );
    let json_data = await fetched.json();
    if (json_data.error == (null || undefined)) {
      console.log(json_data.ret_data);
      setNotificationData(json_data.ret_data[0]);
    } else {
      console.log(json_data);
      Alert.alert("Error", "Something went wrong", [
        // {
        //   text: "Cancel",
        //   onPress: () => console.log("Cancel Pressed"),
        //   style: "cancel",
        // },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };
  useEffect(() => {
    getProjects();
  }, []);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.container}>
        <MainHeader />

        <View style={{ padding: 10, paddingHorizontal: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text style={styles.body_title}>{"<"} View your Signed Lease</Text>
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
              <Text
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                Please view your signed lease below.
              </Text>
            </View>
            <View>
              <Text style={{ textAlign: "left", fontSize: 18 }}>
                Your lease is complete and signed. You can also view your lease
                below and under the "My Lease" button on the home screen.
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
              marginBottom: 10,
            }}
          >
            <PrimaryButton
              width="100%"
              height={45}
              title="VIEW LEASE"
              additionalFunc={() => {
                Linking.openURL(
                  `http://saap.oservo.com:7777${notificationData.lease_agreement_filepath}`
                );
              }}
            />
            <InvertBlackButton
              width="100%"
              height={45}
              title="DOWNLOAD LEASE"
              extra_style={{ marginTop: 20 }}
              // additionalFunc={() => {
              //   FileSystem.downloadAsync(
              //     "http://saap.oservo.com:7777/tenant/15/1680678834_ContactUsBackground.png",
              //     FileSystem.documentDirectory + "small.png"
              //   )
              //     .then(({ uri }) => {
              //       console.log("Finished downloading to ", uri);
              //       saveFile(uri);
              //     })
              //     .catch((error) => {
              //       console.error(error);
              //     });
              // }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

export default ViewSignedLease;
