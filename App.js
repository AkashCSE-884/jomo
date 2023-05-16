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
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import styles

//import Screens/pages
import NotificationsScreen from "./screens/NotificationsScreen";
import MainMenuContent from "./components/nav/MainMenuContent";
import HomeScreen from "./screens/HomeScreen";
import QueryHistoryScreen from "./screens/QueryHistoryScreen";
import InvoiceScreen from "./screens/InvoiceScreen";
import EachNotificatonScreen from "./screens/EachNotificatonScreen";
import FaqScreen from "./screens/FaqScreen";
import ContactUsScreen from "./screens/ContactUsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProjectsPage from "./screens/ProjectsPage";
import ButtonsPage from "./screens/ButtonsPage";
import LoginScreen from "./screens/LoginScreen";
import RegStepTwoScreen from "./screens/RegStepTwoScreen";
import RegStepOneScreen from "./screens/RegStepOneScreen";
import Notification from "./screens/NotificationsScreen";
import MyLeasePage from "./screens/MyLeasePage";
import ApplicationStepOne from "./screens/ApplicationStepOne";
import ApplicationStepTwo from "./screens/ApplicationStepTwo";
import ApplicationStepThree from "./screens/ApplicationStepThree";
import ApplicationStepThreeV2 from "./screens/ApplicationStepThreeV2";
import ApplicationStepFour from "./screens/ApplicationStepFour";
import ApplicationStepFive from "./screens/ApplicationStepFive";
import ApplicationStepOneV2 from "./screens/ApplicationStepOneV2";
import ApplicationStepTwoV2 from "./screens/ApplicationStepTwoV2";
import ApplicationStepThreeSP1 from "./screens/ApplicationStepThreeSP1";
import ApplicationStepThreeSP2 from "./screens/ApplicationStepThreeSP2";
// import PopupsScreen from './screens/PopupsScreen';

// temp screens
import Opt from "./components/modals/Otp";
import TerminateLease from "./components/modals/TerminateLease";
import ForgotPass from "./components/modals/ForgotPass";
import LinkSent from "./components/modals/LinkSent";
import AppSent from "./components/modals/AppSent";
import AppSaved from "./components/modals/AppSaved";
import LeaseAgreement from "./screens/LeaseAgreement";

// function ProjectsPage({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button onPress={() => navigation.navigate('Home')} title="Go back home" />
//     </View>
//   );
// }

import { LogBox } from "react-native";
import ExitInterview from "./screens/Notifications/ExitInterview";
import ViewSignedLease from "./screens/Notifications/ViewSignedLease";
import LeaseTerminated from "./screens/Notifications/LeaseTerminated";
import Lease6mExpiryAlert from "./screens/Notifications/Lease6mExpiryAlert";
import UrgentReview from "./screens/Notifications/UrgentReview";
import ApplicationDeclined from "./screens/Notifications/ApplicationDeclined";
import ApplicationInReview from "./screens/Notifications/ApplicationInReview";
import ApplicationWaitlist from "./screens/Notifications/ApplicationWaitlist";
import ApplicationSubmitted from "./screens/Notifications/ApplicationSubmitted";
import ReviewApplicationInformation from "./screens/Notifications/ReviewApplicationInformation";
import MissingDocs from "./screens/Notifications/MissingDocs";
import LeaseIsReadyToSign from "./screens/Notifications/LeaseIsReadyToSign";
import ApplicationApprovedPayDep from "./screens/Notifications/ApplicationApprovedPayDep";
import ApplicationPendingFinalApproval from "./screens/Notifications/ApplicationPendingFinalApproval";
import ProofOfPaymentUploadDoc from "./screens/Notifications/ProofOfPaymentUploadDoc";
import MissingUploadDoc from "./screens/Notifications/MissingUploadDoc";
import LeaseTerminationReq from "./screens/Notifications/LeaseTerminationReq";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

function LeaseScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        onPress={() => navigation.navigate("Home")}
        title="Go back home"
      />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        useLegacyImplementation
        screenOptions={{
          contentOptions: {
            activeTintColor: "red",
            activeBackgroundColor: "green",
            inactiveTintColor: "#FBFBFB",
            inactiveBackgroundColor: "#FBFBFB",
            labelStyle: {
              fontSize: 15,
              marginLeft: 10,
            },
          },
          drawerPosition: "right",
          drawerStyle: {
            backgroundColor: "#231F20", //231F20
            width: 240,
          },
          drawerActiveTintColor: "#FBFBFB",
          // drawerInactiveTintColor: '#FBFBFB'
        }}
        initialRouteName="Login"
        drawerContent={(props) => <MainMenuContent />}
      >
        <Drawer.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="FAQ"
          component={ProjectsPage}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="Terms of use"
          component={NotificationsScreen}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="Privacy Policy"
          component={ProfileScreen}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="Accommodation"
          component={ProjectsPage}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="Notification"
          component={Notification}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="MyLease"
          component={MyLeasePage}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="My invoices"
          component={ProjectsPage}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="My Queires"
          component={ProjectsPage}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="Profile"
          component={ProfileScreen}
        />
        <Drawer.Screen
          options={{ headerShown: false }}
          name="AllProject"
          component={ProjectsPage}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="Buttons"
          component={ButtonsPage}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="QueryHistory"
          component={QueryHistoryScreen}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="Invoice"
          component={InvoiceScreen}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="EachNotification"
          component={EachNotificatonScreen}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="Faq"
          component={FaqScreen}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="ContactUs"
          component={ContactUsScreen}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="Reg2"
          component={RegStepTwoScreen}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="Reg1"
          component={RegStepOneScreen}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="App1"
          component={ApplicationStepOne}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="App1V2"
          component={ApplicationStepOneV2}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="App2"
          component={ApplicationStepTwo}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="App2V2"
          component={ApplicationStepTwoV2}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="App3"
          component={ApplicationStepThree}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="App3SP1"
          component={ApplicationStepThreeSP1}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="App3SP2"
          component={ApplicationStepThreeSP2}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="App3V2"
          component={ApplicationStepThreeV2}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="App4"
          component={ApplicationStepFour}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="App5"
          component={ApplicationStepFive}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="ExitInterview"
          component={ExitInterview}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="ViewSignedLease"
          component={ViewSignedLease}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="LeaseTerminated"
          component={LeaseTerminated}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="LeaseTerminationReq"
          component={LeaseTerminationReq}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="Lease6mExpiryAlert"
          component={Lease6mExpiryAlert}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="UrgentReview"
          component={UrgentReview}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="ApplicationDeclined"
          component={ApplicationDeclined}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="ReviewApplicationInformation"
          component={ReviewApplicationInformation}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="ApplicationWaitlist"
          component={ApplicationWaitlist}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="ApplicationSubmitted"
          component={ApplicationSubmitted}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="ApplicationInReview"
          component={ApplicationInReview}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="MissingDocs"
          component={MissingDocs}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="MissingUploadDoc"
          component={MissingUploadDoc}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="LeaseIsReadyToSign"
          component={LeaseIsReadyToSign}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="ApplicationApprovedPayDep"
          component={ApplicationApprovedPayDep}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="ApplicationPendingFinalApproval"
          component={ApplicationPendingFinalApproval}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="ProofOfPaymentUploadDoc"
          component={ProofOfPaymentUploadDoc}
        />

        {/* <Drawer.Screen  options={{ headerShown: false }} name="Pops" component={PopupsScreen} /> */}

        <Drawer.Screen
          options={{ headerShown: false }}
          name="AS"
          component={AppSaved}
        />

        <Drawer.Screen
          options={{ headerShown: false }}
          name="terminatelease"
          component={TerminateLease}
        />
        <Drawer.Screen
          options={{ headerShown: false }}
          name="LeaseAgreement"
          component={LeaseAgreement}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
