import { useNavigation } from "@react-navigation/native";
import { Text, Pressable, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Style from "../../assets/css/Style";

function InvertPrimaryButton(props) {

    const navigation = useNavigation();
    let width = props.width || 20;
    let height = props.height || 20;
    let route = props.route || "Home";
    let title = props.title || "Button";
    return (
        <View style={Style.nav_logo}>

            <TouchableOpacity style={{ width: width, height: height }} onPress={() => navigation.navigate(route)}>
                <Text style={{borderColor:'#FBAF19',borderWidth:1, backgroundColor: '#FBAF19', color: '#231F20', padding: 10, borderRadius: 50, textAlign: 'center' }} >
                    {title}
                </Text>
            </TouchableOpacity>

        </View>


    );
}

export default InvertPrimaryButton;