import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
// @ts-expect-error
// biome-ignore lint/correctness/noUnusedImports: explain
import React from "react";

interface Props {
  code: string;
  appUrl: string;
  appName: string;
  expiration: number;
  companyName?: string;
  companyAddr?: string;
}

const VerifyOTPEmail = ({ code, appUrl, expiration, companyName, companyAddr }: Props) => {
  return (
    <Html>
      <Head />
      <Preview>{code} is your verfication code</Preview>
      <Tailwind>
        <Body className="bg-gray-100 p-6 font-sans text-primary-foreground">
          <Container className="mx-auto max-w-[600px] rounded bg-white p-8">
            <Section className="mb-10">
              <Img
                src={`${appUrl}/assets/logo.svg`}
                width="140"
                height="30"
                alt="logo"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="font-bold text-xl">Verification Code</Heading>
            <Text>Enter the following verification code when prompted:</Text>
            <Text className="font-black text-3xl">{code}</Text>
            <Text className="font-bold">This code will expire in {expiration} minutes.</Text>
            <Text>
              To protect your account, do not share this code.
              <br />
              If you didn't request this email, please ignore it.
            </Text>
            <Section className="mt-10">
              <Hr />
              <Text className="text-center text-gray-500 text-sm">
                © 2025 {companyName}. All rights reserved. <br /> {companyAddr}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerifyOTPEmail;

VerifyOTPEmail.PreviewProps = {
  code: "123456",
  appUrl: "http://localhost:3000",
  appName: "Acme",
  expiration: 1,
  companyName: "Acme. inc",
  companyAddr: "123 Main St, Anytown, ST 12345",
} as Props;
