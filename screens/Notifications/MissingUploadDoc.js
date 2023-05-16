import { View, Text } from "react-native";
import styles from "../../assets/css/Style";
// import svg icons
import { useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import MainHeader from "../../components/nav/MainHeader";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { useState } from "react";
import CheckBox from "expo-checkbox";
import Unorderedlist from "react-native-unordered-list";
import BlackButton from "../../components/buttons/BlackButton";
import DocIcon from "../../assets/img/mobile/DocIcon";
function MissingUploadDoc({ route, navigation }) {
  let props = route.params;
  const [signLeaseFirst, setSignLeaseFirst] = useState(false);
  const [signLeaseSecond, setSignLeaseSecond] = useState(false);
  const [signLeaseThird, setSignLeaseThird] = useState(false);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.container}>
        <MainHeader />

        {/* <ScrollView> */}
        <View style={{ padding: 10, paddingHorizontal: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("MissingDocs")}>
            <Text style={styles.body_title}>{"<"} Upload Documentation</Text>
            <Text style={{ fontSize: 15, color: "#231F2099" }}>
              05 Dec 2022
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            height: "auto",
            // borderWidth: 1,
            // borderColor: "red",
            height: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginTop: 25,
              alignItems: "center",
              justifyContent: "space-between",
              padding: 10,
              paddingHorizontal: 20,
            }}
          >
            <View>
              <Text
                style={[
                  { fontSize: 16, fontWeight: "bold" },
                  // {
                  //   color: allInputs.doc_certifed_id_copy__upload_tick
                  //     ? "#231f20d9"
                  //     : "black",
                  //   textDecorationLine:
                  //     allInputs.doc_certifed_id_copy__upload_tick
                  //       ? "line-through"
                  //       : "none",
                  // },
                ]}
              >
                {/* {props.docArr} */}
              </Text>
              <Text style={{ color: "#231f20d9", fontSize: 14 }}>
                {"("}Deposit{")"}:
              </Text>
            </View>
            <TouchableOpacity
              // onPress={() => {
              //   PickDocument("firstdoc").then((res) => {
              //     // console.log("Pick Docc", res);
              //     if (res == "not uploaded") {
              //       console.log("nothing will happen");
              //     } else {
              //       console.log(res[1].image_path);
              //       setAllInputs({
              //         ...allInputs,
              //         doc_certifed_id_copy__upload_tick: true,
              //         doc_certifed_id_copy_filepath: res[1].image_path,
              //       });
              //     }
              //   });
              // }}
              style={{
                backgroundColor: "#000",
                padding: 5,
                borderRadius: 10,
              }}
            >
              <DocIcon width={30} height={30} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              // borderWidth: 1,
              // borderColor: "red",
              flexGrow: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "auto",
                paddingVertical: 20,
              }}
            >
              <View style={{ width: "50%" }}>
                {/* <InvertBlackButton 
                                    width='100%'
                                    height='100%'
                                    title='SAVE'/> */}
                <View style={styles.nav_logo}>
                  <TouchableOpacity style={{ width: 120, height: 50 }}>
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
                      {"CANCEL"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ width: "50%", paddingRight: 20 }}>
                <PrimaryButton
                  width="100%"
                  height={50}
                  title="SUBMIT"
                  route="App5"
                />
              </View>
            </View>
          </View>
        </View>
        {/* </ScrollView> */}
      </View>
    </View>
  );
}

export default MissingUploadDoc;
