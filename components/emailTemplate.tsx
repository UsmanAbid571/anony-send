import {
    Html,
    Body,
    Head,
    Row,
    Section,
    Preview,
    Text,
    Heading

} from "@react-email/components";


interface verificationEmailProps{
    username:string;
    otp:string;
}   

export default function VerificationEmail({username,otp}:verificationEmailProps) {
    return (
        <Html lang="en" dir='ltr'>
            <Head>
                <title>Verification Email</title>
            </Head>
            <Preview>Here&apos;s your verification code: {otp}</Preview>
            <Section>
                <Row>
                    <Heading as="h2" >Hello {username},</Heading>
                </Row>
                <Row>
                    <Text>
                        Thank You for registering. Please use the following verification code to complete your registration.
                    </Text>
                </Row>
                <Row>
                    <Text>
                        {otp}
                    </Text>
                </Row>
                <Row>
                    <Text>
                        If you did not register, please ignore this email.
                    </Text>
                </Row>
            </Section>
            <Body>

            </Body>
        </Html>
                    )}