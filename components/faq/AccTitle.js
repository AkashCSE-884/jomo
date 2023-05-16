import React from "react";
import { View, Text, Platform } from "react-native";
import QH from "../../assets/css/QH";
import DropDownIcon from "../../assets/img/mobile/DropDownIcon";

function AccTitle(props) {
  return (
    <View
      style={[
        {
          width: "100%",
          height: "100%",
          paddingVertical: 0,
          paddingHorizontal: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#ececec",
          borderRadius: 10,
          zIndex: 10,
        },
        QH.shadow,
      ]}
    >
      <View style={{ padding: 15, width: "70%" }}>
        <Text>{props.title}</Text>
      </View>
      <View
        style={{
          backgroundColor: "#FBAF19",
          height: "100%",
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          paddingTop: 10,
        }}
      >
        <DropDownIcon width="30" height="30"></DropDownIcon>
      </View>
    </View>
  );
}

export default AccTitle;
