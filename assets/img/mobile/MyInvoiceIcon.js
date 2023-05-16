
import Svg, { Path } from "react-native-svg"

function MyInvoiceIcon(props) {
    let width = props.width || "20";
    let height = props.height || "20";
    return (

        <Svg width={width} height={height} viewBox="0 0 55 73" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M27.5 20.5312V1C27.5 0.447715 27.0523 0 26.5 0H6.875C5.05164 0 3.30295 0.721036 2.01364 2.00449C0.724327 3.28794 0 5.02867 0 6.84375V66.1562C0 67.9713 0.724327 69.7121 2.01364 70.9955C3.30295 72.279 5.05164 73 6.875 73H48.125C49.9484 73 51.697 72.279 52.9864 70.9955C54.2757 69.7121 55 67.9713 55 66.1562V28.375C55 27.8227 54.5523 27.375 54 27.375H34.375C32.5516 27.375 30.803 26.654 29.5136 25.3705C28.2243 24.0871 27.5 22.3463 27.5 20.5312Z" fill="#231F20"/>
        </Svg>
    )
}

export default MyInvoiceIcon;