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
import * as DocumentPicker from "expo-document-picker";
import DocUploaded from "../../components/modals/DocUploaded";
import { Alert } from "react-native";
let payload = {
  notification_id: 142,
  application_id: 47,
  // "application_id": this.state.application_id
};

function ProofOfPaymentUploadDoc({ navigation }) {
  const [allInputs, setAllInputs] = useState();
  const [modalAppVisible, setModalAppVisible] = useState(false);

  let alldoc = {
    firstdoc: {},
  };
  async function file_upload(
    file_to_up,
    url = "http://saap.oservo.com:7777/api/pub/upload_file"
  ) {
    if (!file_to_up || file_to_up.type == "cancel") {
      console.log("not uploaded");
      return "not uploaded";
    } else {
      const uri =
        Platform.OS === "android"
          ? file_to_up.uri
          : file_to_up.uri.replace("file://", "");

      const filename = file_to_up.uri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const ext = match?.[1];
      const type = match ? `image/${match[1]}` : `image`;

      let formData = new FormData();

      formData.append("image", {
        uri,
        name: `image.${ext}`,
        type,
      });

      // console.log("FORM DATA", formData);

      let fetched = await fetch(url, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      }).then((response) => response.json());

      // console.log("This is FETCHED", fetched);
      return [formData, fetched];
      // .then((data) => {
      //   console.log("res_data", data);
      //   url = data;
      //   return [formData, url];
      // })
      // .catch((error) => {
      //   console.error(error);
      // });
    }
  }
  let PickDocument = async (doc) => {
    let selected_file = await DocumentPicker.getDocumentAsync({});
    if (selected_file.cancelled == true) {
      console.log("cancelled");
      return "cancelled";
    } else {
      let all_ = { ...alldoc };
      all_[doc] = selected_file;
      return file_upload(selected_file);
    }
    //  "name": "Screenshot_20230221_121646_host.exp.exponent.jpg", "size": 141799, "type": "success", "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FJOSHCO-42f1f7c8-ae7d-44f2-aa47-7b40b2ba42c9/DocumentPicker/10064c88-3394-4bec-94ce-9f00a2a6f4e3.jpg"}
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.container}>
        <MainHeader />
        <DocUploaded
          vis={modalAppVisible}
          onModalPress={() => {
            setModalAppVisible(!modalAppVisible);
            navigation.navigate("ApplicationApprovedPayDep");
          }}
          title="CLOSE"
          modalFunc={() => {
            setModalAppVisible(false);
            navigation.navigate("ApplicationApprovedPayDep");
            console.log("clicked");
          }}
        />

        {/* <ScrollView> */}
        <View style={{ padding: 10, paddingHorizontal: 20 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ApplicationApprovedPayDep")}
          >
            <Text style={styles.body_title}>{"<"} Upload Documentation</Text>
            {/* <Text style={{ fontSize: 15, color: "#231F2099" }}>
              05 Dec 2022
            </Text> */}
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
                Proof of Payment
              </Text>
              <Text style={{ color: "#231f20d9", fontSize: 14 }}>
                {"("}Deposit{")"}:
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                PickDocument("firstdoc").then((res) => {
                  // console.log("Pick Docc", res);
                  if (res == "not uploaded") {
                    console.log("nothing will happen");
                  } else {
                    console.log(res[1].image_path);
                    setAllInputs({
                      ...allInputs,
                      doc_proof_of_payment_upload_tick: true,
                      doc_proof_of_payment_filepath: res[1].image_path,
                    });
                  }
                });
              }}
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
              <View style={{ width: "50%", paddingRight: 20 }}>
                {/* <InvertBlackButton 
                                    width='100%'
                                    height='100%'
                                    title='SAVE'/> */}
                <View style={styles.nav_logo}>
                  <TouchableOpacity
                    style={{ width: "100%", height: 45 }}
                    onPress={() => {
                      navigation.navigate("ApplicationApprovedPayDep");
                    }}
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
                      {"CANCEL"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ width: "50%", paddingRight: 20 }}>
                <PrimaryButton
                  width="100%"
                  height={45}
                  title="SUBMIT"
                  additionalFunc={() => {
                    let submit_data = { ...allInputs, ...payload };
                    fetch(
                      "http://saap.oservo.com:7777/api/tenant/notification/pop-requested-update",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(submit_data),
                      }
                    )
                      .then((raw) => {
                        if (!raw.ok) {
                          // throw Error(data.status);
                          Alert.alert(
                            "Error",
                            `Something went wrong Status Code: ${raw.status}`,
                            [
                              // {
                              //   text: "Cancel",
                              //   onPress: () => console.log("Cancel Pressed"),
                              //   style: "cancel",
                              // },
                              {
                                text: "OK",
                                onPress: () => console.log("OK Pressed"),
                              },
                            ]
                          );
                          return;
                        }
                        console.log(raw);
                        return raw.json();
                      })
                      .then((res) => {
                        if (res.error == (null || undefined)) {
                          console.log(res);
                          setModalAppVisible(!modalAppVisible);
                        } else {
                          console.log(res);
                          Alert.alert("Error", "Something went wrong", [
                            // {
                            //   text: "Cancel",
                            //   onPress: () => console.log("Cancel Pressed"),
                            //   style: "cancel",
                            // },
                            {
                              text: "OK",
                              onPress: () => console.log("OK Pressed"),
                            },
                          ]);
                        }
                      });
                  }}
                  // route="App5"
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

export default ProofOfPaymentUploadDoc;
