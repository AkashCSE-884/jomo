import Svg, { Path } from "react-native-svg"

function DocIcon(props) {
    let width = props.width || "20";
    let height = props.height || "20";
    return (
        <Svg width={width} height={height} viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M7.875 14.1075V17.6C7.875 17.9117 7.983 18.1727 8.199 18.3832C8.41425 18.5944 8.68125 18.7 9 18.7C9.31875 18.7 9.58613 18.5944 9.80212 18.3832C10.0174 18.1727 10.125 17.9117 10.125 17.6V14.1075L11.1375 15.0975C11.25 15.2075 11.3767 15.29 11.5177 15.345C11.658 15.4 11.7986 15.4227 11.9396 15.4132C12.0799 15.4044 12.2156 15.3725 12.3469 15.3175C12.4781 15.2625 12.6 15.18 12.7125 15.07C12.9187 14.85 13.0268 14.5933 13.0365 14.3C13.0455 14.0067 12.9375 13.75 12.7125 13.53L9.7875 10.67C9.675 10.56 9.55313 10.4819 9.42188 10.4357C9.29062 10.3902 9.15 10.3675 9 10.3675C8.85 10.3675 8.70938 10.3902 8.57812 10.4357C8.44687 10.4819 8.325 10.56 8.2125 10.67L5.2875 13.53C5.0625 13.75 4.95487 14.0067 4.96463 14.3C4.97363 14.5933 5.09063 14.85 5.31563 15.07C5.54063 15.2717 5.80313 15.3773 6.10313 15.3868C6.40313 15.3956 6.66563 15.29 6.89062 15.07L7.875 14.1075ZM2.25 22C1.63125 22 1.10175 21.7848 0.6615 21.3543C0.2205 20.9231 0 20.405 0 19.8V2.2C0 1.595 0.2205 1.0769 0.6615 0.6457C1.10175 0.215233 1.63125 0 2.25 0H10.3219C10.6219 0 10.908 0.0550001 11.1803 0.165C11.4517 0.275 11.6906 0.430833 11.8969 0.6325L17.3531 5.9675C17.5594 6.16917 17.7188 6.40273 17.8313 6.6682C17.9438 6.9344 18 7.21417 18 7.5075V19.8C18 20.405 17.7799 20.9231 17.3396 21.3543C16.8986 21.7848 16.3687 22 15.75 22H2.25ZM10.125 6.6V2.2H2.25V19.8H15.75V7.7H11.25C10.9312 7.7 10.6643 7.5944 10.449 7.3832C10.233 7.17273 10.125 6.91167 10.125 6.6ZM2.25 2.2V7.7V2.2V19.8V2.2Z" fill="#FBFBFB"/>
        </Svg>

    );
}

export default DocIcon;