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
import UserIcon from "../assets/img/mobile/AddUserSvg";
import NotificationIcon from "../assets/img/mobile/NotificationSvgIcon";
import LeaseIcon from "../assets/img/mobile/MyLeaseIcon";
import ProjectIcon from "../assets/img/mobile/ProjectSvgIcon";
import MainHeader from "../components/nav/MainHeader";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
let get_data_from_storage = async (key) => {
  let sto_data = await AsyncStorage.getItem(key);
  return sto_data;
};

function HomeScreen({ navigation }) {
  let [name, setName] = useState("");
  useEffect(() => {
    get_data_from_storage("@whole_login_data").then((e) => {
      let parsed = JSON.parse(e);
      console.log("FROM HOME", parsed);
      setName(parsed.ret_data[0].name);
    });
  }, []);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.container}>
        <MainHeader />

        <ScrollView style={styles.scroll_home}>
          <View style={styles.header}>
            <Text style={styles.header_span}>Welcome back, Elias!</Text>
            <Text style={styles.header_title}>{name}</Text>
          </View>

          <View style={styles.bodyParent}>
            <View style={styles.body}>
              <View style={styles.icon}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("AllProject")}
                >
                  <ProjectIcon width="60" height="60" />
                  <Text style={{ textAlign: "center" }}>Projects</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.icon}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Profile")}
                >
                  <UserIcon width="60" height="60" />
                  <Text style={{ textAlign: "center" }}>My Profile</Text>
                </TouchableOpacity>
              </View>

              {/* <View style={styles.icon}>
                                <InvoiceIcon width="60" height="60" />
                            </View> */}
            </View>

            <View style={styles.body}>
              <View style={styles.icon}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("MyLease")}
                >
                  <LeaseIcon width="60" height="60" />
                  <Text style={{ textAlign: "center" }}>Lease</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.icon}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Notification")}
                >
                  <NotificationIcon width="60" height="60" />
                  <Text style={{ textAlign: "center" }}>Notification</Text>
                </TouchableOpacity>
              </View>

              {/* <View style={styles.icon}>
                                <QueryIcon width="60" height="60" />
                            </View> */}
            </View>
          </View>
        </ScrollView>

        <Text
          style={{ color: "white", textAlign: "center", paddingVertical: 10 }}
        >
          {" "}
          Powered With Expo{" "}
        </Text>
      </View>
    </View>
  );
}

export default HomeScreen;
