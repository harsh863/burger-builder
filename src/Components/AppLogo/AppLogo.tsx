import React from "react"
import burgerLogo from '../../assets/images/burger-logo.png';
import './AppLogo.scss';

export const AppLogo = (props: AppLogoProps) => {
    return (
        <div className='logo' style={{height: props.height}}>
            <img src={burgerLogo} alt="MyBurger" />
        </div>
    )
}

interface AppLogoProps {
    height?: number;
    width?: number;
}