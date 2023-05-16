import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Button,
  Image,
  Text,
  ScrollView,
  Pressable,
  SafeAreaView,
  Platform,
  UIManager,
} from "react-native";

import styles from "../assets/css/Style";
import { AccordionList } from "react-native-accordion-list-view";
// import svg icons
import CompanyLogo from "../assets/img/mobile/CompanyLogo";
import { useNavigation } from "@react-navigation/native";
import AccTitle from "../components/faq/AccTitle";
import DropDownIcon from "../assets/img/mobile/DropDownIcon";
import AccBody from "../components/faq/AccBody";
import MainHeader from "../components/nav/MainHeader";
import { TouchableOpacity } from "react-native-gesture-handler";

function FaqScreen() {
  const navigation = useNavigation();
  const data = [
    {
      id: 0,
      title: "How to apply for JOSHCO unit",
      body: [
        "Applicants should send Heita JOSHCO to our WhatsApp number: 066 511 7139",
        "Receive an automated response detailing all available units and their rental requirements including amounts",
        "If JOSHCO advertises using digital platforms, then a specific email address will be provided",
        "Some applications can be done through walk-in at specified sites",
      ],
    },
    {
      id: 1,
      title: "What is required for one to qualify for a JOSHCO unit",
      body: [
        "Have permanent residence ",
        "Be 18 years and older/ open to suretyship agreement form if under 18",

        "Be permanently employed",

        "Be self-employed, with proof of income in a way of a bank statement.",
      ],
    },
    {
      id: 2,
      title: "Documents required for your application to be processed",
      body: [
        "Certified ID copy",

        "Letter of employment signed and dated, letter to confirm employment date and must have  reachable employer contact details.",

        "Latest pay slip if you earn a monthly  salary",

        "12 consecutive pays lip if your earning is commission based",

        "4 pay slips for weekly earners",

        "2 consecutive pay slips for Fortnite earners",

        "3 months Bank statement,  stamped inside the bank / ink-based stamp",

        "Proof of residence/ letter from loans- cellphone account, Edgar’s account, municipal account etc.",
      ],
    },
    {
      id: 3,
      title: "Does a bank statement work as Proof of Residence?",
      body: ["NO"],
    },
    {
      id: 4,
      title: "Can I use proof of residence of someone I stay with?",
      body: ["NO"],
    },
    {
      id: 5,
      title:
        "Can applications be done online, or it is only physical applications?",
      body: [
        "Applicants can send Heita JOSHCO to our WhatsApp number: 066 511 7139",
        "The online applications app is not yet available – to be launched soon",
      ],
    },
    {
      id: 6,
      title: "If I am not South African, can I apply?",
      body: [
        "We consider permanent residents of JOHANNESBURG; however, we PRIORITISE South African residents.",
      ],
    },
    {
      id: 7,
      title: "What if I have a work permit, but I am not South African?",
      body: ["We PRIORITISE South African residents."],
    },
    {
      id: 8,
      title: "Can I apply with someone if my salary is too low?",
      body: [
        "Only when married in community of property can do a joint lease agreement",
      ],
    },
    {
      id: 9,
      title:
        "Can you use my deposit towards my rent if I can’t pay current month’s rental?",
      body: [
        "NO",
        "Deposit stays in an interest-bearing account for when the tenants want to vacate the unit, Joshco will then monitor the condition and use it to pay for damages caused (if at all) and when there is none the applicant receives the deposit back.",
      ],
    },
    {
      id: 10,
      title: "Can someone apply on my behalf if I earn too much?",
      body: [
        "NO",
        "JOSHCO does not do individual subsidy but institutionalised subsidies through SHRA, with the aim to service certain groups of individuals. When one applies for someone else is called subletting when this happen, the tenant will be given notice to vacate",
      ],
    },
    {
      id: 11,
      title:
        "What if my friend is moving out and is prepared for me to take over payments of the flat, can I move in?",
      body: [
        "If you require to stay in a JOSHCO unit, you must apply. NO one is allowed to inherit a unit.",
      ],
    },
    {
      id: 12,
      title: "Do you look at my income before deductions or after?",
      body: [
        "We process your application based on your Gross earning (income before deductions)",
      ],
    },
    {
      id: 13,
      title: "Can I view the units before I apply?",
      body: ["NO"],
    },
    {
      id: 14,
      title: "How long does it take for one to get approved?",
      body: [
        "6 - 8 weeks to get approved or declined (under normal circumstances)",
      ],
    },
    {
      id: 15,
      title: "What delays the processing of an application?",
      body: [
        "Confirmation of employment, when the employer is unreachable or takes long to respond",
        "Blurry documents or documents not sent in the correct format",
        "Incomplete documents",
      ],
    },
    {
      id: 16,
      title:
        "Why must we apply before we see the flat, what if we don’t like it?",
      body: [
        "Picture of the flats/ units can be seen on the website or via WhatsApp.",
      ],
    },
    {
      id: 17,
      title: "How do I get parking?",
      body: [
        "Confirmation from the bank to show who is paying for the car",
        "Proof of ownership/ car papers from the bank that are in your name",
        "Certified ID copy",
        "Letter from the employer if it’s a company car",
      ],
    },
    {
      id: 18,
      title: "How much are the rentals?",
      body: [
        "Dependant on the type of projects, location, and the square meters",
      ],
    },
    {
      id: 19,
      title: "Does the rental vary because of area?",
      body: ["Rental can be dependent on earnings"],
    },
    {
      id: 20,
      title: "Why do I wait so long for deposit refund?",
      body: [
        "The refund is subject to 1 month’s statement",
        "Please submit all required documents (certified ID copy, bank account to verify were the money needs to be paid).",
        "Property Supervisor to conduct snagging,",
        "once it has been established that the unit is still in a good condition, it will take up to 14 days for the money to be paid into your account.",
      ],
    },
    {
      id: 21,
      title: "Is the rent including water and electricity?",
      body: [
        "NO",
        "Water and Electricity is prepaid; however, some project water is charged according to consumption.",
      ],
    },
    {
      id: 22,
      title:
        "Why does my lease expire after 2 years, can’t I give notice if I want to leave",
      body: [
        "The lease agreement is valid for 2 years",
        "You are required to give 30 days notice to vacate or forfeit your deposit money.",
      ],
    },
    {
      id: 23,
      title:
        "Why can I not leave my family in the unit if I work in a different place out of Joburg?",
      body: [
        "The Lease holder is the only person obliged to paying rental and to stay in the unit, that is why one can’t leave family.",
        "The Lease holder is required to do an affidavit stating that when they leave, they will do so with their dependant",
        "And if a Lease holder is deployed to a different province by their employer, a letter from the employer is required and the property supervisor will also monitor if the Lease Holder does come to the flat often.",
      ],
    },
    {
      id: 24,
      title: "My spouse/ mother passed away, what can I do now?",
      body: ["If married in community of property, we require"],
    },
    {
      id: 25,
      title: "My spouse/ mother passed away, what can I do now?",
      body: [
        "Your query can be logged with the Property Supervisor or directly with maintenance department",
        "If not assisted, you may escalate the issue to the Portfolio Manager or our customer services department",
      ],
    },
    {
      id: 26,
      title: "How can I report a problem with my neighbour anonymously?",
      body: ["Report to the Property Supervisor"],
    },
    {
      id: 27,
      title: "How can I report a problem with my neighbour anonymously?",
      body: ["WhatsApp number: 066 511 7139 | 011 406 7300"],
    },
    {
      id: 28,
      title: "Where are other Joshco flat besides the ones in CBD?",
      body: [
        "We have created a map to show where Joshco projects are located on our website.",
      ],
    },
    {
      id: 29,
      title:
        "Why must we apply before we see the flat, what if we don’t like it?",
      body: [
        "Picture of the flats/ units can be seen on the website or via WhatsApp.",
      ],
    },
    {
      id: 30,
      title: "How does one check their application status of a residence?",
      body: [
        "Through email: applicant can follow up from the same email address they used to apply.",
      ],
    },
    {
      id: 31,
      title: "Are weekends considered on a waiting period?",
      body: ["NO", "JOSHCO leasing offices are closed on weekends."],
    },
    {
      id: 32,
      title:
        "Does an individual get to own the residence after a certain period?",
      body: ["NO", "It is a rental agreement, tenants cannot own the flat."],
    },
    {
      id: 33,
      title: "How do we differentiate a JOSHCO ad from a scammed one?",
      body: ["Verify through WhatsApp line to check if the post is valid"],
    },
    {
      id: 34,
      title: "Can a Real Estate agent collaborate with JOSHCO?",
      body: [
        "NO",
        "Real Estate agent is a sale agreement and Joshco is not selling flats as it is a social housing.",
      ],
    },
  ];
  useEffect(() => {
    if (Platform.OS === "android") {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }, []);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.container}>
        <MainHeader />

        <ScrollView>
          <View style={{ padding: 10 }}>
            <View style={{ marginTop: 10, marginBottom: 20 }}>
              <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Text style={styles.body_title}>{"<"} FAQ</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ padding: 20, backgroundColor: "#fff" }}>
            <View style={acc_styles.container}>
              <AccordionList
                customIcon={() => {
                  // return(
                  //     <DropDownIcon></DropDownIcon>
                  // )
                }}
                data={data}
                customTitle={(item) => {
                  return <AccTitle title={item.title}></AccTitle>;
                }}
                customBody={(item) => {
                  return <AccBody body={item.body}></AccBody>;
                }}
                animationDuration={400}
                expandMultiple={true}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default FaqScreen;

const acc_styles = StyleSheet.create({
  container: {
    // height: '80%',
    // marginTop:'auto',
    // width: '100%',
    paddingHorizontal: 10,
    // backgroundColor: '#000',
    // position: 'relative',
  },
});
