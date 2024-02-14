import React, { ReactNode } from 'react';
import styled from 'styled-components';
import logo from '../../img/new-point-logo.svg';

const Wrapper = styled.div`
  width:100%;
  max-width:1032px;
  height:100%;
  margin:0px auto 100px auto;
`

const HeaderBlock = styled.div`
  display:flex;
  justify-content: center;
  margin-top:100px;
`

const Logotype = styled.img`
  width:170px;
  height:48px;
  margin-bottom:100px;
`

interface WrapperProps {
    children: ReactNode;
}

export const Header:React.FC<WrapperProps> = ({children}) => {

    return (
        <Wrapper>
            <HeaderBlock>
                <a href="/">
                    <Logotype src={logo} alt="logo" />
                </a>
            </HeaderBlock>

            {children}
        </Wrapper>
    )
};