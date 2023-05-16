import Svg, { Path,Circle } from "react-native-svg";

function NotificationsDotIcon(props) {
    let width = props.width || "20";
    let height = props.height || "20";
    return (
        <Svg width={width} height={height} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Circle cx="6" cy="6" r="6" fill="#FBAF19"/>
        </Svg>


    )

}

export default NotificationsDotIcon;