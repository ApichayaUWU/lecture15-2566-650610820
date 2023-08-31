"use client";

import { TermsAndCondsModal } from "@/components/TermsAndCondsModal";
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
import { runningPlans } from "../libs/runningPlans";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";

export default function Home() {
  const [opened, { open, close }] = useDisclosure(false);

  const schema = z.object({
    firstName: z.string().min(3, { message: "Required at least 3 characters" }),
    lastName: z.string().min(3, { message: "Required at least 3 characters" }),
    email: z.string().email(3, { message: "Invalid email format" }),
    plan: z.enum(["funrun", "mini", "half", "full"], {
      errorMap: () => ({ message: "Invalid plan" }),
    }),
    gender: z.enum(["male", "female"], {
      errorMap: () => ({ message: "Please choose a gener" }),
    }),
    acceptTermsAndConds: z.literal(true, {
      errorMap: () => ({ message: "You muset accept terms and conditions" }),
    }),
  });
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      plan: null,
      gender: null,
      acceptTermsAndConds: false,
    },
    validate: zodResolver(schema),
  });

  console.log(form.values);

  return (
    <div>
      <Container size="500px">
        <Title italic align="center" color="green">
          Register CMU Marathon 🥈
        </Title>
        <form
          onSubmit={form.onSubmit(() => {
            alert("See you at marathon!");
          })}
        >
          <Stack spacing="sm">
            <Group grow align="start">
              <TextInput
                label="First Name"
                {...form.getInputProps("firstName")}
              />
              <TextInput
                label="Last Name"
                {...form.getInputProps("lastName")}
              />
            </Group>
            <TextInput label="Email" {...form.getInputProps("email")} />
            <Select
              label="Plan"
              data={runningPlans}
              placeholder="Please select plan..."
              {...form.getInputProps("plan")}
            />
            <Radio.Group label="Gender" {...form.getInputProps("gender")}>
              <Radio value="male" label="Male 👨" mb="xs" />
              <Radio value="female" label="Female 👧" />
            </Radio.Group>

            <Checkbox
              {...form.getInputProps("acceptTermsAndConds")}
              label={
                <Text>
                  I accept{" "}
                  <Anchor onClick={open} href="#">
                    terms and conditions
                  </Anchor>
                </Text>
              }
            />
            <Button type="submit">Register</Button>
          </Stack>
        </form>
      </Container>

      <TermsAndCondsModal opened={opened} close={close} />
    </div>
  );
}
