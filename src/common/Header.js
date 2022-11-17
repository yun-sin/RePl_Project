import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

const Header = memo(() => {
    return (
        <div>
            <div className='navbarLogo'>
                <NavLink to ="/">RePl</NavLink>
            </div>
        <div className='navbarMenu'>
            <NavLink to ="/login" >login</NavLink>
            <NavLink to ="/mypage" >mypage</NavLink>
        </div>
        </div>
    );
});

export default Header;