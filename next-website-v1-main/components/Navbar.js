import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image'

const Nav = styled.nav`
  height: 80px;
  background: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
`;
const Nav1 = styled.nav`
height: 42px;
background: #FFFFFF 0% 0% no-repeat padding-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
font: normal normal normal 14px/19px Segoe UI;
letter-spacing: 0px;
color: #707070;
opacity: 1;
`;
const StyledLink = styled.a`
  padding: 0rem 2rem;
`;

const Navbar = () => {
  return (
    <><Nav1>
      <div></div>
      <div>
          <Link href='/signin' passHref>
            <StyledLink>Sign in</StyledLink>
          </Link>
          <Link href='/register' passHref>
            <StyledLink>Register</StyledLink>
          </Link>
        </div>
    </Nav1><Nav>
        <div>

          <Link href='/' passHref>
            <StyledLink><Image src="/logo.png" width={50} height={50} /></StyledLink>
          </Link>
          <Link href='/' passHref>
            <StyledLink>Home</StyledLink>
          </Link>
          <Link href='/about' passHref>
            <StyledLink>About us</StyledLink>
          </Link>
          <Link href='/contact' passHref>
            <StyledLink>Contact us</StyledLink>
          </Link>
        </div>
       
      </Nav></>
  );
};

export default Navbar;
