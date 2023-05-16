import Svg, { Path } from 'react-native-svg';

function SearchIcon(props) {
  let width = props.width || "20";
  let height = props.height || "20";
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#000" >
        <Path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </Svg>
  );
}

export default SearchIcon;