import {
  StyleSheet,
  View,
  FlatList,
  Button,
  Image,
  Text,
  ScrollView,
  Pressable,
  ImageBackground,
  Platform,
} from "react-native";
import styles from "../assets/css/Style";
// import svg icons
// import { useNavigation } from '@react-navigation/native';
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import MainHeader from "../components/nav/MainHeader";

import DropDownPicker from "react-native-dropdown-picker";
import InvertBlackButton from "../components/buttons/InvertBlackButton";
import PrimaryButton from "../components/buttons/PrimaryButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
// MultiSelectInput
let set_data_to_storage = async (key, value) => {
  const jsonValue = JSON.stringify(value);
  return await AsyncStorage.setItem(key, jsonValue);
};

function RegStepOneScreen({ navigation }) {
  let [regQData, setRegQData] = useState({});
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Income Band: *");
  const [items, setItems] = useState([
    { label: "R 1850-6700", value: "1" },
    { label: "R 6701-22000", value: "2" },
    { label: "+R 22000", value: "3" },
    { label: "Pensioner", value: "4" },
  ]);

  const [Age_open, Age_setOpen] = useState(false);
  const [Age_value, Age_setValue] = useState("Income Band: *");
  const [Age_items, Age_setItems] = useState([
    { label: "15-25 ", value: "1" },
    { label: "25-30 ", value: "2" },
    { label: "60+", value: "3" },
  ]);

  // let navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.container}>
        <MainHeader />

        <ScrollView>
          <View style={{ padding: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Text style={styles.body_title}>{"<"} Registration</Text>
            </TouchableOpacity>
          </View>

          <View style={{ paddingHorizontal: 20, height: 500 }}>
            <View style={{ marginVertical: 20 }}>
              <Text>
                In order to proceed with registration please select the income
                band and age group applicable to you below:
              </Text>
            </View>

            <View>
              <Text style={{ paddingVertical: 5 }}>Income Band: *</Text>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                zIndex={10}
                onChangeValue={(val) => {
                  // console.log(val);
                  //   setAllInputs({
                  //     ...allInputs,
                  //     employment_status_type_id: val,
                  //   });
                  setRegQData({
                    ...regQData,
                    income_band_type_id: val,
                  });
                }}
              />
            </View>

            <View style={{ marginTop: 30 }}>
              <Text style={{ paddingVertical: 5 }}>Age Group: *</Text>
              <DropDownPicker
                open={Age_open}
                value={Age_value}
                items={Age_items}
                setOpen={Age_setOpen}
                setValue={Age_setValue}
                setItems={Age_setItems}
                zIndex={5}
                onChangeValue={(val) => {
                  // console.log(val);
                  //   setAllInputs({
                  //     ...allInputs,
                  //     employment_status_type_id: val,
                  //   });
                  setRegQData({
                    ...regQData,
                    age_group_type_id: val,
                  });
                }}
              />
            </View>

            <View style={{ paddingTop: 40, alignItems: "center" }}>
              <PrimaryButton
                width={200}
                height={100}
                // route="Reg2"
                title="Continue"
                additionalFunc={() => {
                  if (
                    regQData.income_band_type_id &&
                    regQData.age_group_type_id
                  ) {
                    console.log(regQData);
                    set_data_to_storage("@reg_q_data", regQData).then(() => {
                      navigation.navigate("Reg2");
                    });
                  }
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default RegStepOneScreen;
