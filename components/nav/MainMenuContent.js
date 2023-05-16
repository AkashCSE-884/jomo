import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Button,
  View,
  Text,
  Pressable,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Divider, List } from "react-native-paper";
import AvaterIcon from "../../assets/img/mobile/AvaterIcon";
import LogoutIcon from "../../assets/img/mobile/LogoutIcon";
import { ScrollView } from "react-native-gesture-handler";

const MainMenuContent = () => {
  const navigation = useNavigation();
  const navigate = (route) => navigation.navigate(route);
  // let current_route = navigation.getState().routeNames[0] !== 'Rooms'

  return (
    <ScrollView>
      <View style={{ justifyContent: "space-between" }}>
        <View>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              paddingTop: 50,
              paddingLeft: 15,
              height: 100,
              marginBottom: 10,
            }}
          >
            <View style={{ height: 40 }}>
              <AvaterIcon width="40" height="40" />
            </View>
            <View style={{ width: "auto", height: 100 }}>
              <Text style={styles.avater_section_text}>Brad Blender</Text>
              <Text style={{ color: "#fbfbfbb3", fontSize: 10 }}>
                bradblender@gmail.com
              </Text>
            </View>
          </View>

          <View style={{ paddingVertical: 20 }}></View>
          <List.Item
            titleStyle={{ color: "#FBFBFB" }}
            title="Home"
            onPress={() => navigate("Home")}
          />
          <List.Item
            titleStyle={{ color: "#FBFBFB" }}
            title="Project"
            onPress={() => navigate("AllProject")}
          />
          <List.Item
            titleStyle={{ color: "#FBFBFB" }}
            title="My Lease"
            onPress={() => navigate("MyLease")}
          />

          {/* <List.Item titleStyle={{ color: "#FBFBFB" }} title="My invoices" onPress={() => navigate('Invoice')} /> */}
          {/* <List.Item titleStyle={{ color: "#FBFBFB" }} title="My Queries" onPress={() => navigate('QueryHistory')} /> */}

          <List.Item
            titleStyle={{ color: "#FBFBFB" }}
            title="Profile"
            onPress={() => navigate("Profile")}
          />
          <List.Item
            titleStyle={{ color: "#FBFBFB" }}
            title="Notification"
            onPress={() => navigate("Notification")}
          />

          <View
            style={{
              marginHorizontal: 8,
              marginVertical: 10,
              borderWidth: 1,
              borderBottomColor: "#fbfbfbb3",
            }}
          ></View>

          <List.Item
            titleStyle={{ color: "#FBFBFB" }}
            title="FAQ"
            onPress={() => navigate("Faq")}
          />

          {/* <List.Item titleStyle={{ color: "#FBFBFB" }} title="Terms of use" onPress={() => navigate('terms_of_use')} /> */}
          {/* <List.Item titleStyle={{ color: "#FBFBFB" }} title="Privacy Policy" onPress={() => navigate('privacy_policy')} /> */}

          <List.Item titleStyle={{ color: "#FBFBFB" }} title="Terms of use" />

          <List.Item titleStyle={{ color: "#FBFBFB" }} title="Privacy Policy" />

          <List.Item
            titleStyle={{ color: "#FBFBFB" }}
            title="Contact Us"
            onPress={() => navigate("ContactUs")}
          />

          {/* <List.Item titleStyle={{ color: "#FBFBFB" }} title="Pops" onPress={() => navigate('Pops')} /> */}
          {/* <List.Item titleStyle={{ color: "#FBFBFB" }} title="AS" onPress={() => navigate('AS')} /> */}

          {/* <List.Item titleStyle={{ color: "#FBFBFB" }} title="Buttons" onPress={() => navigate('Buttons')} /> */}

          {/* <List.Item titleStyle={{ color: "#FBFBFB" }} title="Login" onPress={() => navigate('Login')} /> */}

          {/* <List.Item titleStyle={{ color: "#FBFBFB" }} title="Reg2" onPress={() => navigate('Reg2')} /> */}

          {/* <List.Item titleStyle={{ color: "#FBFBFB" }} title="Terminate Lease" onPress={() => navigate('terminatelease')} /> */}

          <List.Item
            titleStyle={{ color: "#FBFBFB" }}
            title="App1"
            onPress={() => navigate("App1")}
          />

          <List.Item
            titleStyle={{ color: "#FBFBFB" }}
            title="App1V2"
            onPress={() => navigate("App1V2")}
          />

          <List.Item
            titleStyle={{ color: "#FBFBFB" }}
            title="App3SP1"
            onPress={() => navigate("App3SP1")}
          />

          <List.Item
            titleStyle={{ color: "#FBFBFB" }}
            title="App2"
            onPress={() => navigate("App2")}
          />

          <List.Item
            titleStyle={{ color: "#FBFBFB" }}
            title="App2V2"
            onPress={() => navigate("App2V2")}
          />

          <List.Item
            titleStyle={{ color: "#FBFBFB" }}
            title="App3SP2"
            onPress={() => navigate("App3SP2")}
          />

          <List.Item
            titleStyle={{ color: "#FBFBFB" }}
            title="App3"
            onPress={() => navigate("App3")}
          />

          <List.Item
            titleStyle={{ color: "#FBFBFB" }}
            title="App3V2"
            onPress={() => navigate("App3V2")}
          />

          <List.Item
            titleStyle={{ color: "#FBFBFB" }}
            title="App4"
            onPress={() => navigate("App4")}
          />

          <List.Item
            titleStyle={{ color: "#FBFBFB" }}
            title="App5"
            onPress={() => navigate("App5")}
          />

          <List.Item
            titleStyle={{ color: "#FBFBFB" }}
            title="ViewSignedLease"
            onPress={() => navigate("ViewSignedLease")}
          />

          <List.Item
            titleStyle={{ color: "#FBFBFB" }}
            title="ApplicationSubmitted"
            onPress={() => navigate("ApplicationSubmitted")}
          />

          <List.Item
            titleStyle={{ color: "#FBFBFB" }}
            title="MissingDocs"
            onPress={() => navigate("MissingDocs")}
          />

          <List.Item
            titleStyle={{ color: "#FBFBFB" }}
            title="ApplicationDeclined"
            onPress={() => navigate("ApplicationDeclined")}
          />

          <List.Item
            titleStyle={{ color: "#FBFBFB" }}
            title="UrgentReview"
            onPress={() => navigate("UrgentReview")}
          />

          <List.Item
            titleStyle={{ color: "#FBFBFB" }}
            title="ApplicationPendingFinalApproval"
            onPress={() => navigate("ApplicationPendingFinalApproval")}
          />

          <List.Item
            titleStyle={{ color: "#FBFBFB" }}
            title="ApplicationDeclined"
            onPress={() => navigate("ApplicationDeclined")}
          />

          <List.Item
            titleStyle={{ color: "#FBFBFB" }}
            title="Lease6mExpiryAlert"
            onPress={() => navigate("Lease6mExpiryAlert")}
          />

          <List.Item
            titleStyle={{ color: "#FBFBFB" }}
            title="ApplicationApprovedPayDep"
            onPress={() => navigate("ApplicationApprovedPayDep")}
          />

          <List.Item
            titleStyle={{ color: "#FBFBFB" }}
            title="MissingDocs"
            onPress={() => navigate("MissingDocs")}
          />
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            minHeight: 100,
            paddingLeft: 20,
          }}
        >
          <LogoutIcon />

          <TouchableOpacity
            onPress={() => {
              navigate("Login");
            }}
          >
            <Text style={styles.text}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default MainMenuContent;

const styles = StyleSheet.create({
  avater_section_text: {
    color: "#FBFBFB",
    fontSize: 15,
  },
  text: {
    color: "#FBFBFB",
    paddingLeft: 20,
  },
});
