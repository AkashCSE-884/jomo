import Svg, { Path } from 'react-native-svg';
function ClockIcon(props) {
    let width = props.width || "20";
    let height = props.height || "20";
    return (
        <Svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19Z" stroke="#231F20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M12.7 13.6001L10.5274 11.4275C10.1898 11.09 10.0001 10.6322 10 10.1549V4.6001" stroke="#231F20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>




    );
}

export default ClockIcon;