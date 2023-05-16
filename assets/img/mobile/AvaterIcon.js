import Svg, { Circle, Path } from "react-native-svg"

function AvaterIcon(props) {
    let width = props.width || "20";
    let height = props.height || "20";
    return (

 
        <Svg width={width} height={height} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Circle cx="25" cy="25" r="25" fill="#DDDDDD" />
            <Path d="M24.9995 5.55566C14.0411 5.55566 5.1582 14.4386 5.1582 25.3969C5.1582 36.3553 14.0411 45.2382 24.9995 45.2382C35.9578 45.2382 44.8407 36.3553 44.8407 25.3969C44.8407 14.4386 35.9578 5.55566 24.9995 5.55566Z" stroke="#AFAEAE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M8.53125 37.3398C8.53125 37.3398 12.1027 28.8695 24.9981 28.8695C36.9043 28.8695 41.8646 37.3398 41.8646 37.3398L35.7138 43.056L24.9995 46.0322L14.0868 43.056L8.53125 37.3398ZM24.9981 26.3894C27.2447 26.3894 29.3993 25.4487 30.988 23.7743C32.5766 22.0998 33.469 19.8288 33.469 17.4608C33.469 15.0928 32.5766 12.8218 30.988 11.1473C29.3993 9.47291 27.2447 8.53223 24.9981 8.53223C22.7515 8.53223 20.5968 9.47291 19.0082 11.1473C17.4196 12.8218 16.5271 15.0928 16.5271 17.4608C16.5271 19.8288 17.4196 22.0998 19.0082 23.7743C20.5968 25.4487 22.7515 26.3894 24.9981 26.3894Z" fill="#AFAEAE" />
        </Svg>


    )
}

export default AvaterIcon;