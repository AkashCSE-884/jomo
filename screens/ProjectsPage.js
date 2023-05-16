import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Platform,
  UIManager,
} from "react-native";

import styles from "../assets/css/Style";
import { AccordionList } from "react-native-accordion-list-view";
// import svg icons
import { useNavigation } from "@react-navigation/native";
import AccTitle from "../components/faq/AccTitle";
import AccBody from "../components/faq/AccBody";
import MainHeader from "../components/nav/MainHeader";
import { TouchableOpacity } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";
import PrimaryButton from "../components/buttons/PrimaryButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
// MultiSelectInput
let set_data_to_storage = async (key, value) => {
  const jsonValue = JSON.stringify(value);
  return await AsyncStorage.setItem(key, jsonValue);
};

let optForArea = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: {
    offset: 0,
    limit: 50,
  },
};

let for_unit_types = (arr) => {
  let all_unit_type_names = "";
  if (arr) {
    arr.forEach((a) => {
      all_unit_type_names += `${a.title},`;
    });
  } else {
    all_unit_type_names = `not found`;
  }
  return all_unit_type_names;
};

function ProjectsPage() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [items, setItems] = useState([
    // { label: "Deep city", value: "deep_city" },
    { area_id: 0, title: "Bellavista" },
    // { label: "selby", value: "selby" },
  ]);

  let [projects, setProjects] = useState([]);
  let getProjects = async (area_id) => {
    let fetched = await fetch(
      "http://saap.oservo.com:7777/api/tenant/property/paginate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          offset: 0,
          limit: 50,
          opt__area_id: area_id,
        }),
      }
    );
    let json_data = await fetched.json();
    // console.log("FROM getProjects");
    // console.log(json_data);
    setProjects(json_data.ret_data);
  };

  let getAreas = async () => {
    let fetched = await fetch(
      "http://saap.oservo.com:7777/api/pub/area/list",
      optForArea
    );
    let json_data = await fetched.json();
    // console.log(json_data);
    setItems(json_data.ret_data);
  };

  const navigation = useNavigation();
  const data = [
    {
      id: 0,
      title: "How to apply for a JOSHCO unit:",
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
    },
    {
      id: 7,
      title: "Lorem Ipsum is simply dummy",
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      id: 3,
      title: "Lorem Ipsum is simply dummy",
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      id: 2,
      title: "Lorem Ipsum is simply dummy",
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      id: 5,
      title: "Lorem Ipsum is simply dummy",
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
  ];
  useEffect(() => {
    getProjects(value);
  }, [value]);
  useEffect(() => {
    if (Platform.OS === "android") {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
    getProjects(0);
    getAreas();
  }, []);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.container}>
        <MainHeader />

        <ScrollView>
          <View style={{ flex: 2, flexDirection: "row", padding: 10 }}>
            <View style={{ flex: 1, marginTop: 10, marginBottom: 20 }}>
              <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Text style={styles.body_title}>{"<"} Projects</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, marginTop: 10, marginBottom: 20 }}>
              <DropDownPicker
                schema={{
                  label: "title",
                  value: "area_id",
                }}
                open={open}
                value={value}
                items={[{ area_id: 0, title: "All" }, ...items]}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                // onChangeValue={(value) => {
                //   //   console.log(value);
                // }}
              />
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
                data={projects}
                customTitle={(item) => {
                  return <AccTitle title={item.name}></AccTitle>;
                }}
                customBody={(item) => {
                  return (
                    <View
                      style={{
                        shadowColor: "#000",
                        flex: 1,
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                        backgroundColor: "#fff",
                        borderRadius: 10,
                        marginTop: -10,
                        zIndex: -1,
                        paddingVertical: 20,
                      }}
                    >
                      <View
                        style={{
                          flex: 3,
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                      >
                        <View style={{ flex: 1, alignItems: "center" }}>
                          <Text style={{ fontSize: 10 }}>Total Units</Text>
                          <Text style={{ fontSize: 14 }}>{item.units}</Text>
                        </View>

                        <View style={{ flex: 1, alignItems: "center" }}>
                          <Text style={{ fontSize: 10 }}>Accommodation</Text>
                          <Text style={{ fontSize: 14 }}>{item.title}</Text>
                        </View>

                        <View style={{ flex: 1, alignItems: "center" }}>
                          <Text style={{ fontSize: 10 }}>Units Types</Text>
                          <Text style={{ fontSize: 14 }}>
                            {for_unit_types(item.unit_types)}
                          </Text>
                        </View>
                      </View>

                      <View style={{ paddingTop: 10, alignItems: "center" }}>
                        <PrimaryButton
                          width={200}
                          height={"auto"}
                          title="Apply"
                          route="App1"
                          additionalFunc={() => {
                            // console.log(item.property_id);
                            fetch(
                              "http://saap.oservo.com:7777/api/tenant/application/start",
                              {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                  property_id: item.property_id,
                                }),
                              }
                            )
                              .then((data) => {
                                if (!data.ok) {
                                  throw Error(data.status);
                                }
                                console.log(data);
                                return data.json();
                              })
                              .then((res) => {
                                console.log("From 249 valll", res.ret_val);
                                // ret_data = res;
                                set_data_to_storage(
                                  "@property_id",
                                  item.property_id
                                );
                                set_data_to_storage(
                                  "@application_id",
                                  res.ret_val
                                );
                              });
                          }}
                        />
                      </View>
                    </View>
                  );
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

export default ProjectsPage;

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
