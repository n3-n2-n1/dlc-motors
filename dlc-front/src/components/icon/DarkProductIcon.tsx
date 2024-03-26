interface ProductsIconProps {
    color?: string;
  }

function DarkProductIcon({ color = "" }: ProductsIconProps)  {
    return(
        <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.89215 17.3163C10.8549 18.1956 12.3237 18.2536 13.3748 17.4821C14.1299 16.928 14.8872 16.3416 15.5719 15.6568C16.2567 14.9721 16.8431 14.2148 17.3972 13.4597C18.1687 12.4085 18.1107 10.9398 17.2314 9.97703C14.7337 7.24228 12.1602 4.70713 9.36695 2.22779C9.02812 1.92704 8.62047 1.71838 8.17574 1.63193C6.56561 1.31894 2.55331 0.660557 1.5645 1.64937C0.575685 2.63818 1.23406 6.65048 1.54705 8.26061C1.6335 8.70534 1.84216 9.11299 2.14292 9.45182C4.62225 12.245 7.15741 14.8186 9.89215 17.3163Z" fill="#374151" stroke="white" strokeWidth="2.03948"/>
<circle cx="6.32587" cy="6.41211" r="1.64049" transform="rotate(-45 6.32587 6.41211)" fill="white" stroke="white" strokeWidth="2.03948"/>
</svg>

    )
}

export default DarkProductIcon;