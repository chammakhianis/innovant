import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image'

const FooterSection = styled.div`
  background: #222120;
  color: #fff;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Footer = () => {
  return (
    <FooterSection>
      <p><Image src="/logo.png" width={100} height={80}/></p>
      
      <p>All Rights Reserved</p>
    </FooterSection>
  );
};

export default Footer;
