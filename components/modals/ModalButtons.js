import {TouchableOpacity,Text, Pressable, View } from "react-native";
import Style from "../../assets/css/Style";


// black button
function BlackModalButton(props) {
 
    let width = props.width || 20;
    let height = props.height || 20;
    let route = props.route || (()=>{console.warn('need a function')});
    let title = props.title || "Button";
    return (
        <View style={Style.nav_logo}>

            <TouchableOpacity style={{ width:width,height:height }} onPress={route}>
                <Text style={{ backgroundColor: 'black', color: 'white', padding: 10, borderRadius: 50, textAlign: 'center' }} >
                    {title}
                </Text>
            </TouchableOpacity>

        </View>


    );
}

// Invert black button 
function InvertBlackModalButton(props) {
 
    let width = props.width || 20;
    let height = props.height || 20;
    let route = props.route || (()=>{console.warn('need a function')});
    let title = props.title || "Button";
    return (
        <View style={Style.nav_logo}>

            <TouchableOpacity style={{ flex:1, width: width, height: height }} onPress={route} >
                <Text style={{ borderColor: 'black', borderWidth: 1, backgroundColor: 'white', color: 'black', padding: 10, borderRadius: 50, textAlign: 'center' }} >
                    {title}
                </Text>
            </TouchableOpacity>

        </View>


    );
}

// Invert Primary Button

// function InvertPrimaryModalButton(props) {
 
//     let width = props.width || 20;
//     let height = props.height || 20;
//     let route = props.route || (()=>{console.warn('need a function')});
//     let title = props.title || "Button";
//     return (
//         <View style={Style.nav_logo}>

//             <TouchableOpacity style={{ flex:1, width: width, height: height }} onPress={route} >
//                 <Text style={{borderColor:'#FBAF19',borderWidth:1, backgroundColor: 'white', color: '#FBAF19', padding: 10, borderRadius: 50, textAlign: 'center' }} >
//                     {title}
//                 </Text>
//             </TouchableOpacity>

//         </View>


//     );
// }



// Red Button
// function ReadModalButton(props) {
 
//     let width = props.width || 20;
//     let height = props.height || 20;
//     let route = props.route || (()=>{console.warn('need a function')});
//     let title = props.title || "Button";
//     return (
//         <View style={Style.nav_logo}>

//             <TouchableOpacity style={{ flex:1, width: width, height: height }}  onPress={route}  >
//                 <Text style={{borderColor:'#BB2200',borderWidth:1, backgroundColor: '#BB2200', color: '#FBFBFB', padding: 10, borderRadius: 50, textAlign: 'center' }} >
//                     {title}
//                 </Text>
//             </TouchableOpacity>

//         </View>


//     );
// }

// Primary Button
function PrimaryModalButton(props) {
 
    let width = props.width || 20;
    let height = props.height || 20;
    let route = props.route || (()=>{console.warn('need a function')});
    let title = props.title || "Button";
    return (
        <View style={Style.nav_logo}>

            <TouchableOpacity style={{ width:width,height:height }} onPress={route}>
                <Text style={{borderColor:'#FBAF19',borderWidth:1, backgroundColor: '#FBAF19', color: '#231F20', padding: 10, borderRadius: 50, textAlign: 'center',fontWeight:'bold' }} >
                    {title}
                </Text>
            </TouchableOpacity>

        </View>


    );
}


function RedModalButton(props) {
 
    let width = props.width || 20;
    let height = props.height || 20;
    let route = props.route || (()=>{console.warn('need a function')});
    let title = props.title || "Button";
    return (
        <View style={Style.nav_logo}>

            <TouchableOpacity style={{ width:width,height:height }} onPress={route}>
                <Text style={{borderColor:'#BB2200',borderWidth:1, backgroundColor: '#BB2200', color: '#FBFBFB', padding: 10, borderRadius: 50, textAlign: 'center' }} >
                    {title}
                </Text>
            </TouchableOpacity>

        </View>


    );
}

// function PrimaryModalButton(props) {

//     const navigation = useNavigation();
//     let width = props.width || 20;
//     let height = props.height || 20;
//     let route = props.route || (()=>{console.warn('need a function')});
//     let title = props.title || "Button";
//     return (
//         <View style={Style.nav_logo}>

//             <TouchableOpacity style={{ }} onPress={route}>
//                 <Text style={{borderColor:'#FBAF19',borderWidth:1, backgroundColor: '#FBAF19', color: '#231F20', padding: 10, borderRadius: 50, textAlign: 'center' }} >
//                     {title}
//                 </Text>
//             </TouchableOpacity>

//         </View>


//     );
// }
 


export {BlackModalButton,InvertBlackModalButton,PrimaryModalButton,RedModalButton};