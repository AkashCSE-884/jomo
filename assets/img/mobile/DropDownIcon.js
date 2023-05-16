import Svg, { Path } from 'react-native-svg';

function DropDownIcon(props) {
  let width = props.width || "20";
  let height = props.height || "20";
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="#000" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <Path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </Svg>


  );
}

export default DropDownIcon;