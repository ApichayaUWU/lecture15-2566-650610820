"use client";

import { TermsAndCondsModal } from "@/components/TermsAndCondsModal";
import { runningPlans } from "@/libs/runningPlans";
import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Radio,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export default function Home() {
  const [opened, { open, close }] = useDisclosure(false);

  //form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState(null); //type is null or string
  const [gender, setGender] = useState(null); //type is null or string
  const [acceptTermsAndConds, setAcceptTermsAndConds] = useState(false);

  //error states
  const [firstNameErr, setFirstNameErr] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");

  const submit = () => {
    if (firstName.length < 3) {
      setFirstNameErr("First name must have at least 3 characters");
    }
    if (lastName.length < 3) {
      setLastNameErr("Last name must have at least 3 characters");
    }

    //4 more to validate!
  };

  return (
    <div>
      <Container size="500px">
        <Title italic align="center" color="grape">
          Register CMU Marathon 🥈
        </Title>
        <Stack spacing="sm">
          <Group grow align="start">
            <TextInput
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={firstNameErr}
            />
            <TextInput
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={lastNameErr}
            />
          </Group>
          <TextInput
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Select
            label="Plan"
            data={runningPlans}
            placeholder="Please select plan..."
            value={plan}
            onChange={(value) => setPlan(value)}
          />
          <Radio.Group
            label="Gender"
            value={gender}
            onChange={(value) => setGender(value)}
          >
            <Radio value="male" label="Male 👨" mb="xs" />
            <Radio value="female" label="Female 👧" />
          </Radio.Group>

          <Checkbox
            checked={acceptTermsAndConds}
            onChange={(event) => setAcceptTermsAndConds(event.target.checked)}
            label={
              <Text>
                I accept{" "}
                <Anchor onClick={open} href="#">
                  terms and conditions
                </Anchor>
              </Text>
            }
          />
          <Button onClick={submit}>Register</Button>
        </Stack>
      </Container>

      <TermsAndCondsModal opened={opened} close={close} />
    </div>
  );
}
