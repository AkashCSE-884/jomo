import Svg, { Path } from "react-native-svg";

function NotificationSingleSvgIcon(props) {
    let width = props.width || "20";
    let height = props.height || "20";
    return (
        <Svg  width={width} height={height} viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M5.25 0C2.275 0 0 2.275 0 5.25V15.75C0 18.725 2.275 21 5.25 21H15.3358C15.601 21 15.8554 21.1054 16.0429 21.2929L21.0429 26.2929C21.6729 26.9229 22.75 26.4767 22.75 25.5858V22C22.75 21.4477 23.2017 21.01 23.7452 20.9123C26.2177 20.468 28 18.3832 28 15.75V5.25C28 2.275 25.725 0 22.75 0H5.25Z" fill="#FBAF19"/>
        </Svg>

    )

}

export default NotificationSingleSvgIcon;