import Head from 'next/head';
import styled from 'styled-components';

const Hero = styled.div`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #F2F2F2;
`;

const Heading = styled.h1`
  color: #000;
  font-size: 10rem;
  font-weight: 900;
`;

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact</title>
        <link rel='icon' href='/logo.png' />
      </Head>
      <Hero>
        <Heading>CONTACT</Heading>
      </Hero>
    </>
  );
}
