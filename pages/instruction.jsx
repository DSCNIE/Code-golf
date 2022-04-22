import { AppShell } from "@mantine/core";
import Navbar from "../components/navbar";

export default function Inst() {
  return (
    <AppShell
      padding="md"
      header={<Navbar />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          color: theme.colors.gray[0],
        },
      })}
    >
        Ssup!
    </AppShell>
  );
}
