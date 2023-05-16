import React from "react";
import { View, Text, Platform } from "react-native";
import QH from "../../assets/css/QH";

function AccBody(props) {
  return (
    <View
      style={[
        QH.shadow,
        {
          padding: 10,
          borderRadius: 10,
          marginTop: -10,
          zIndex: -1,
          paddingTop: 20,
        },
      ]}
    >
      {/* <Text>{props.body}</Text> */}
      {props.body.map((e) => {
        return (
          <View style={{ marginTop: 10 }}>
            <Text>{e}</Text>
          </View>
        );
      })}
    </View>
  );
}

export default AccBody;
