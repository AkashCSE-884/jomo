import * as React from 'react';
import Svg, { Path } from 'react-native-svg'; 

function ProjectSvgIcon(props) {
    let width = props.width || "20";
    let height = props.height || "20";
    return (

        <Svg width={width} height={height} viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M21.9942 9.98047C21.9942 10.6836 21.4213 11.2344 20.7719 11.2344H19.5496L19.5763 17.4922C19.5763 17.5977 19.5687 17.7031 19.5572 17.8086V18.4375C19.5572 19.3008 18.8735 20 18.0293 20H17.4181C17.3761 20 17.3341 20 17.2921 19.9961C17.2386 20 17.1851 20 17.1317 20H14.9735C14.1293 20 13.4456 19.3008 13.4456 18.4375V15C13.4456 14.3086 12.8994 13.75 12.2233 13.75H9.77861C9.10251 13.75 8.55628 14.3086 8.55628 15V18.4375C8.55628 19.3008 7.87255 20 7.02838 20H4.89313C4.83583 20 4.77853 19.9961 4.72124 19.9922C4.6754 19.9961 4.62956 20 4.58372 20H3.97256C3.12839 20 2.44465 19.3008 2.44465 18.4375V14.0625C2.44465 14.0273 2.44465 13.9883 2.44847 13.9531V11.2344H1.22233C0.534768 11.2344 0 10.6875 0 9.98047C0 9.62891 0.114593 9.31641 0.381977 9.04297L10.1759 0.3125C10.4432 0.0390625 10.7488 0 11.0162 0C11.2836 0 11.5892 0.078125 11.8184 0.273438L21.5741 9.04297C21.8796 9.31641 22.0324 9.62891 21.9942 9.98047Z" fill="#231F20" />
        </Svg>

    );
}

export default ProjectSvgIcon;