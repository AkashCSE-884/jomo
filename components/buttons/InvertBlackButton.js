import { useNavigation } from "@react-navigation/native";
import { Text, Pressable, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Style from "../../assets/css/Style";

function InvertBlackButton(props) {
  const navigation = useNavigation();
  let width = props.width || 20;
  let height = props.height || 20;
  let route = props.route;
  let title = props.title || "Button";
  let disabled = props.disabled || false;
  let extra_style = props.extra_style || {};
  let additionalFunc =
    props.additionalFunc ||
    (() => {
      console.log("additionalFunc is empty");
    });

  let route_func = (prop_route) => {
    navigation.navigate(prop_route);
  };
  let extra_func = additionalFunc;
  return (
    <View style={[Style.nav_logo, extra_style]}>
      <TouchableOpacity
        disabled={disabled}
        style={{ width: width, height: height }}
        onPress={() => {
          extra_func();
          if (route != (undefined || null)) route_func(route);
        }}
      >
        <Text
          style={{
            borderColor: "black",
            borderWidth: 1,
            backgroundColor: "white",
            color: "black",
            padding: 10,
            borderRadius: 50,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default InvertBlackButton;
