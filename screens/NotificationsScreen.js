import {
  StyleSheet,
  View,
  FlatList,
  Button,
  Image,
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import styles from "../assets/css/Style";
// import svg icons
import NotificationSingleSvgIcon from "../assets/img/mobile/NotificationsSingleSvgIcon";
import NotificationsDotIcon from "../assets/img/mobile/NotificationsDotIcon";
import MainHeader from "../components/nav/MainHeader";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

function NotificationsScreen({ navigation }) {
  let [allNotification, setAllNotification] = useState([]);
  let getProjects = async (area_id) => {
    let fetched = await fetch(
      "http://saap.oservo.com:7777/api/tenant/notification/paginate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // offset: 0,
          limit: 50,
          // opt__area_id: area_id,
        }),
      }
    );
    let json_data = await fetched.json();
    if (json_data.error == (null || undefined)) {
      setAllNotification(json_data.ret_data);
      // console.log("FROM getProjects");
      console.log(json_data.ret_data);
    } else {
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

        <View style={{ padding: 10 }}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text style={styles.body_title}>{"<"} Notifications</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={{ padding: 20, marginBottom: 20 }}>
          {allNotification.map((e, indx) => {
            return (
              <TouchableOpacity
                key={indx}
                onPress={() => navigation.navigate("EachNotification")}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingBottom: 10,
                    marginTop: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "#231F201A",
                  }}
                >
                  <View style={{}}>
                    <NotificationSingleSvgIcon
                      width={30}
                      height={30}
                    ></NotificationSingleSvgIcon>
                  </View>
                  <View style={{ marginHorizontal: 10 }}>
                    <Text style={{ fontWeight: "bold" }}>{e.title}</Text>
                    <Text style={{ fontSize: 12 }}>
                      {e.sender_trigger_timestamp.split("T")[0]}
                    </Text>
                    <Text>Notification ID:{e.notification_id}</Text>
                  </View>
                  <View
                    style={{
                      marginLeft: "auto",
                      display: e.receiver_read_tick ? "none" : "flex",
                    }}
                  >
                    <NotificationsDotIcon
                      width={15}
                      height={15}
                    ></NotificationsDotIcon>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
          {/* <TouchableOpacity
            onPress={() => navigation.navigate("EachNotification")}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingBottom: 10,
                marginTop: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#231F201A",
              }}
            >
              <View style={{}}>
                <NotificationSingleSvgIcon
                  width={30}
                  height={30}
                ></NotificationSingleSvgIcon>
              </View>
              <View style={{ marginHorizontal: 10 }}>
                <Text style={{ fontWeight: "bold" }}>
                  Lease Expiring in 60 Days
                </Text>
                <Text style={{ fontSize: 12 }}>05 Dec 2022</Text>
              </View>
              <View style={{ marginLeft: "auto" }}>
                <NotificationsDotIcon
                  width={15}
                  height={15}
                ></NotificationsDotIcon>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("EachNotification")}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingBottom: 10,
                marginTop: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#231F201A",
              }}
            >
              <View style={{}}>
                <NotificationSingleSvgIcon
                  width={30}
                  height={30}
                ></NotificationSingleSvgIcon>
              </View>
              <View style={{ marginHorizontal: 10 }}>
                <Text style={{ fontWeight: "bold" }}>
                  Lease Expiring in 60 Days
                </Text>
                <Text style={{ fontSize: 12 }}>05 Dec 2022</Text>
              </View>
              <View style={{ marginLeft: "auto" }}>
                <NotificationsDotIcon
                  width={15}
                  height={15}
                ></NotificationsDotIcon>
              </View>
            </View>
          </TouchableOpacity> */}
        </ScrollView>
      </View>
    </View>
  );
}

export default NotificationsScreen;
