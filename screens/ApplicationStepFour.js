import { View, Text, ScrollView } from "react-native";
import styles from "../assets/css/Style";
// import svg icons
import CompanyLogo from "../assets/img/mobile/CompanyLogo";
import { useNavigation } from "@react-navigation/native";
import MailIcon from "../assets/img/mobile/MailIcon";
import PhoneIcon from "../assets/img/mobile/PhoneIcon";
import LocationIcon from "../assets/img/mobile/LocationIcon";
import ClockIcon from "../assets/img/mobile/ClockIcon";
import ShowHideIcon from "../assets/img/mobile/ShowHideIcon";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import MainHeader from "../components/nav/MainHeader";
import ApplicationStepTwo from "./ApplicationStepTwo";
import CheckBox from "expo-checkbox";
import PrimaryButton from "../components/buttons/PrimaryButton";
import InvertBlackButton from "../components/buttons/InvertBlackButton";
import DocIcon from "../assets/img/mobile/DocIcon";
import AppSaved from "../components/modals/AppSaved";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { DocumentPicker, ImagePicker } from "expo";
import * as DocumentPicker from "expo-document-picker";
// import DocumentPicker from 'react-native-document-picker';
// import DocumentPicker, { types } from 'react-native-document-picker';

function ApplicationStepFour({ navigation }) {
  let alldoc = {
    firstdoc: {},
    seconddoc: {},
    thirddoc: {},
    fourthdoc: {},
    fifthdoc: {},
    sixethdoc: {},
    seventhdoc: {},
    eighthdoc: {},
    ninthdoc: {},
    tenthdoc: {},
  };

  const [modalAppVisible, setModalAppVisible] = useState(false);
  let [stepFinalData, setStepFinalData] = useState({});

  let [allInputs, setAllInputs] = useState({
    property_id: 9,
    application_id: 1,
    step: "four",
  });

  let get_data_from_storage = async (key) => {
    let sto_data = await AsyncStorage.getItem(key);
    return sto_data;
  };

  let set_data_to_storage = async (key, value) => {
    const jsonValue = JSON.stringify(value);
    return await AsyncStorage.setItem(key, jsonValue);
  };

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

  // file uploads and check start ===================>>>>>>>>>

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

  // file uploads and check end ===================>>>>>>>>>

  let getStepData = async () => {
    let app_id = await get_data_from_storage("@application_id");
    console.log("From 60", app_id);
    let fetched = await fetch(
      "http://saap.oservo.com:7777/api/tenant/application/view-partial",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          application_id: app_id,
          step: "four",
        }),
      }
    );
    let json_data = await fetched.json();
    console.log("from ret data end");
    console.log(json_data.ret_data[0]);
    console.log("from ret data end");

    setStepFinalData(json_data.ret_data[0]);

    setAllInputs({
      ...allInputs,
      property_id: await get_data_from_storage("@property_id"),
      application_id: app_id,
      ...json_data.ret_data[0],
    });
  };

  useEffect(() => {
    getStepData();
  }, []);

  // this.setState({ singleFile: res });
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.container}>
        <MainHeader />
        <AppSaved
          vis={modalAppVisible}
          onModalPress={() => {
            setModalAppVisible(!modalAppVisible);
            //  navigation.navigate('Home');
          }}
          title="CLOSE"
          modalFunc={() => {
            setModalAppVisible(false);
            console.log("clicked");
          }}
        />
        <ScrollView>
          <View style={{ padding: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate("App3V2")}>
              <Text style={styles.body_title}>
                &lsaquo; Application - Step 4
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingHorizontal: 25 }}>
            <View style={{ paddingVertical: 30 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Required Documentation:
              </Text>
              <Text style={{ fontSize: 15, marginTop: 10 }}>
                Please upload a copy of the following documentation:
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 25,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={[
                    { fontSize: 16, fontWeight: "bold" },
                    {
                      color: allInputs.doc_certifed_id_copy__upload_tick
                        ? "#231f20d9"
                        : "black",
                      textDecorationLine:
                        allInputs.doc_certifed_id_copy__upload_tick
                          ? "line-through"
                          : "none",
                    },
                  ]}
                >
                  Certified ID Copy
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
                        doc_certifed_id_copy__upload_tick: true,
                        doc_certifed_id_copy_filepath: res[1].image_path,
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
                flexDirection: "row",
                marginTop: 15,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                }}
              >
                <Text style={{ flex: 1 }}>
                  <Text
                    style={[
                      { fontSize: 16, fontWeight: "bold" },
                      {
                        color: allInputs.doc_latest_payslip__upload_tick
                          ? "#231f20d9"
                          : "black",
                        textDecorationLine:
                          allInputs.doc_latest_payslip__upload_tick
                            ? "line-through"
                            : "none",
                      },
                    ]}
                  >
                    Latest Payslip
                  </Text>
                  <Text style={{ color: "#231f20d9", fontSize: 14 }}>
                    {"("}Affidavit for self-employed{")"}:
                  </Text>
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    PickDocument("seconddoc").then((res) => {
                      // console.log("Pick Docc", res);
                      if (res == "not uploaded") {
                        console.log("nothing will happen");
                      } else {
                        console.log(res[1].image_path);
                        setAllInputs({
                          ...allInputs,
                          doc_latest_payslip__upload_tick: true,
                          doc_latest_payslip_filepath: res[1].image_path,
                        });
                      }
                    });
                  }}
                  style={{
                    flex: 1,
                    backgroundColor: "#000",
                    padding: 5,
                    borderRadius: 10,
                  }}
                >
                  <DocIcon width={30} height={30} />
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 15,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={[
                    { fontSize: 16, fontWeight: "bold" },
                    {
                      color: allInputs.doc_letter_of_employment__upload_tick
                        ? "#231f20d9"
                        : "black",
                      textDecorationLine:
                        allInputs.doc_letter_of_employment__upload_tick
                          ? "line-through"
                          : "none",
                    },
                  ]}
                >
                  Letter of Employment
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  PickDocument("thirddoc").then((res) => {
                    // console.log("Pick Docc", res);
                    if (res == "not uploaded") {
                      console.log("nothing will happen");
                    } else {
                      console.log(res[1].image_path);
                      setAllInputs({
                        ...allInputs,
                        doc_letter_of_employment__upload_tick: true,
                        doc_letter_of_employment_filepath: res[1].image_path,
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
                flexDirection: "row",
                marginTop: 15,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={[
                    { fontSize: 16, fontWeight: "bold" },
                    {
                      color: allInputs.doc_6m_bank_statement__upload_tick
                        ? "#231f20d9"
                        : "black",
                      textDecorationLine:
                        allInputs.doc_6m_bank_statement__upload_tick
                          ? "line-through"
                          : "none",
                    },
                  ]}
                >
                  6 Month Bank Statement
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  PickDocument("fourthdoc").then((res) => {
                    // console.log("Pick Docc", res);
                    if (res == "not uploaded") {
                      console.log("nothing will happen");
                    } else {
                      console.log(res[1].image_path);
                      setAllInputs({
                        ...allInputs,
                        doc_6m_bank_statement__upload_tick: true,
                        doc_6m_bank_statement_filepath: res[1].image_path,
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
                flexDirection: "row",
                marginTop: 15,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={[
                    { fontSize: 16, fontWeight: "bold" },
                    {
                      color: allInputs.doc_proof_of_address__upload_tick
                        ? "#231f20d9"
                        : "black",
                      textDecorationLine:
                        allInputs.doc_proof_of_address__upload_tick
                          ? "line-through"
                          : "none",
                    },
                  ]}
                >
                  Proof of Address
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  PickDocument("fifthdoc").then((res) => {
                    // console.log("Pick Docc", res);
                    if (res == "not uploaded") {
                      console.log("nothing will happen");
                    } else {
                      console.log(res[1].image_path);
                      setAllInputs({
                        ...allInputs,
                        doc_proof_of_address__upload_tick: true,
                        doc_proof_of_address_filepath: res[1].image_path,
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
                flexDirection: "row",
                marginTop: 15,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={[
                    {
                      fontSize: 16,
                      fontWeight: "bold",
                      // color: "#231f20d9",
                    },
                    {
                      color: allInputs.doc_marriage_certificate__upload_tick
                        ? "#231f20d9"
                        : "black",
                      textDecorationLine:
                        allInputs.doc_marriage_certificate__upload_tick
                          ? "line-through"
                          : "none",
                    },
                  ]}
                >
                  Marriage Certificate
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  PickDocument("sixethdoc").then((res) => {
                    // console.log("Pick Docc", res);
                    if (res == "not uploaded") {
                      console.log("nothing will happen");
                    } else {
                      console.log(res[1].image_path);
                      setAllInputs({
                        ...allInputs,
                        doc_marriage_certificate__upload_tick: true,
                        doc_marriage_certificate_filepath: res[1].image_path,
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
                flexDirection: "row",
                marginTop: 15,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text>
                  <Text
                    style={[
                      { fontSize: 16, fontWeight: "bold" },
                      {
                        color:
                          allInputs.doc_birth_certificates_of_dependents__upload_tick
                            ? "#231f20d9"
                            : "black",
                        textDecorationLine:
                          allInputs.doc_birth_certificates_of_dependents__upload_tick
                            ? "line-through"
                            : "none",
                      },
                    ]}
                  >
                    Birth Certificates
                  </Text>
                  <Text style={{ color: "#231f20d9", fontSize: 14 }}>
                    {"("}of dependents{")"}:
                  </Text>
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  PickDocument("seventhdoc").then((res) => {
                    // console.log("Pick Docc", res);
                    if (res == "not uploaded") {
                      console.log("nothing will happen");
                    } else {
                      console.log(res[1].image_path);
                      setAllInputs({
                        ...allInputs,
                        doc_birth_certificates_of_dependents__upload_tick: true,
                        doc_birth_certificates_of_dependents_filepath:
                          res[1].image_path,
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
                flexDirection: "row",
                marginTop: 15,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={[
                    { fontSize: 16, fontWeight: "bold" },
                    {
                      color: allInputs.doc_ck_document__upload_tick
                        ? "#231f20d9"
                        : "black",
                      textDecorationLine: allInputs.doc_ck_document__upload_tick
                        ? "line-through"
                        : "none",
                    },
                  ]}
                >
                  CK Document
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  PickDocument("eighthdoc").then((res) => {
                    // console.log("Pick Docc", res);
                    if (res == "not uploaded") {
                      console.log("nothing will happen");
                    } else {
                      console.log(res[1].image_path);
                      setAllInputs({
                        ...allInputs,
                        doc_ck_document__upload_tick: true,
                        doc_ck_document_filepath: res[1].image_path,
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
                flex: 2,
                flexDirection: "row",
                marginTop: 15,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    { flexShrink: 1, fontSize: 16, fontWeight: "bold" },
                    {
                      color:
                        allInputs.doc_informal_employment_affidavit__upload_tick
                          ? "#231f20d9"
                          : "black",
                      textDecorationLine:
                        allInputs.doc_informal_employment_affidavit__upload_tick
                          ? "line-through"
                          : "none",
                    },
                  ]}
                >
                  Informal Employment Affidavit
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  PickDocument("ninthdoc").then((res) => {
                    // console.log("Pick Docc", res);
                    if (res == "not uploaded") {
                      console.log("nothing will happen");
                    } else {
                      console.log(res[1].image_path);
                      setAllInputs({
                        ...allInputs,
                        doc_informal_employment_affidavit__upload_tick: true,
                        doc_informal_employment_affidavit_filepath:
                          res[1].image_path,
                      });
                    }
                  });
                }}
                style={{
                  flex: 1,
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
                flexDirection: "row",
                marginTop: 15,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={[
                    {
                      fontSize: 16,
                      fontWeight: "bold",
                      // color: "#231f20d9",
                    },
                    {
                      color: allInputs.doc_certified_spo_id_copy__upload_tick
                        ? "#231f20d9"
                        : "black",
                      textDecorationLine:
                        allInputs.doc_certified_spo_id_copy__upload_tick
                          ? "line-through"
                          : "none",
                    },
                  ]}
                >
                  Certified Spouse ID Copy
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  PickDocument("tenthdoc").then((res) => {
                    // console.log("Pick Docc", res);
                    if (res == "not uploaded") {
                      console.log("nothing will happen");
                    } else {
                      console.log(res[1].image_path);
                      setAllInputs({
                        ...allInputs,
                        doc_certified_spo_id_copy__upload_tick: true,
                        doc_certified_spo_id_copy_filepath: res[1].image_path,
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
                flex: 2,
                flexDirection: "row",
                marginTop: 15,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    {
                      fontSize: 16,
                      fontWeight: "bold",
                      // color: "#231f20d9",
                    },
                    {
                      color: allInputs.doc_spo_6m_bank_statement__upload_tick
                        ? "#231f20d9"
                        : "black",
                      textDecorationLine:
                        allInputs.doc_spo_6m_bank_statement__upload_tick
                          ? "line-through"
                          : "none",
                    },
                  ]}
                >
                  Spouse 6 Month Bank Statement
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  PickDocument("eleventhdoc").then((res) => {
                    // console.log("Pick Docc", res);
                    if (res == "not uploaded") {
                      console.log("nothing will happen");
                    } else {
                      console.log(res[1].image_path);
                      setAllInputs({
                        ...allInputs,
                        doc_spo_6m_bank_statement__upload_tick: true,
                        doc_spo_6m_bank_statement_filepath: res[1].image_path,
                      });
                    }
                  });
                }}
                style={{
                  flex: 1,
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
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
                paddingVertical: 20,
              }}
            >
              <View style={{ width: "50%" }}>
                {/* <InvertBlackButton 
                                    width='100%'
                                    height='100%'
                                    title='SAVE'/> */}
                <View style={styles.nav_logo}>
                  <TouchableOpacity
                    style={{ width: 120, height: 50 }}
                    onPress={() =>
                      // navigation.navigate(route)
                      {
                        get_data_from_storage("@app_step_3_app")
                          .then((res) => {
                            // console.log("FROM ASYNC", res);
                            setAllInputs({
                              ...allInputs,
                            });
                            // console.log(allInputs);
                            return res;
                          })
                          .then((sto) => {
                            return fetch(
                              "http://saap.oservo.com:7777/api/tenant/application/update-partial",
                              {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify(allInputs),
                              }
                            );
                          })

                          .then((data) => {
                            if (!data.ok) {
                              throw Error(data.status);
                            }
                            console.log(data);

                            return data.text();
                          })
                          .then((res) => {
                            console.log(res);
                            return "";
                            //redirect to the next from
                            // if (redirect_status == true) {
                            //   window.location.href = "/tenant/application/step/two";
                            // }
                          })
                          .then((data) => {
                            // console.log(data);
                            setModalAppVisible(!modalAppVisible);
                          });
                      }
                    }
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
                      {"SAVE"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ width: "50%" }}>
                <PrimaryButton
                  width="100%"
                  height="100%"
                  title="NEXT"
                  route="App5"
                  additionalFunc={() => {
                    // console.log("button_working");
                    // console.log(allInputs);
                    get_data_from_storage("@app_step_3_app")
                      .then((res) => {
                        // console.log("FROM ASYNC", res);
                        setAllInputs({
                          ...allInputs,
                        });
                        // console.log(allInputs);
                        return res;
                      })
                      .then((sto) => {
                        return fetch(
                          "http://saap.oservo.com:7777/api/tenant/application/update-partial",
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify(allInputs),
                          }
                        );
                      })

                      .then((data) => {
                        if (!data.ok) {
                          throw Error(data.status);
                        }
                        console.log(data);

                        return data.text();
                      })
                      .then((res) => {
                        console.log(res);
                        return AsyncStorage.getItem("@storage_Key");
                        //redirect to the next from
                        // if (redirect_status == true) {
                        //   window.location.href = "/tenant/application/step/two";
                        // }
                      })
                      .then((data) => {
                        // console.log(data);
                      });
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default ApplicationStepFour;
