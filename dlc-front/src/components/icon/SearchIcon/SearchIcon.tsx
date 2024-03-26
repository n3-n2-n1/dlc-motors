interface SearchIconProps {
  color?: string;
}

function SearchIcon({ color = "currentColor" }: SearchIconProps) {
  return (
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="10.0193" cy="9.54959" r="8.49784" fill="#CDFF71" stroke="#020202" strokeWidth="2.03948"/>
<path d="M9.40494 12.1566C11.1732 12.1566 12.6068 10.7231 12.6068 8.95474C12.6068 7.18643 11.1732 5.75293 9.40494 5.75293C7.63663 5.75293 6.20312 7.18643 6.20312 8.95474C6.20312 10.7231 7.63663 12.1566 9.40494 12.1566Z" fill="white" stroke="#020202" strokeWidth="2.03948" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M13.8019 13.314L11.6719 11.2217" stroke="#020202" strokeWidth="2.03948" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

  );
}



export const DarkSearchIcon = () => {
  return(

    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="9.51932" cy="10.0496" r="8.49784" fill="#374151" stroke="white" strokeWidth="2.03948"/>
<path d="M8.90494 12.6566C10.6732 12.6566 12.1068 11.2231 12.1068 9.45474C12.1068 7.68643 10.6732 6.25293 8.90494 6.25293C7.13663 6.25293 5.70312 7.68643 5.70312 9.45474C5.70312 11.2231 7.13663 12.6566 8.90494 12.6566Z" fill="#374151" stroke="white" strokeWidth="2.03948" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M13.3019 13.814L11.1719 11.7217" stroke="white" strokeWidth="2.03948" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

  )
}



export default SearchIcon;
