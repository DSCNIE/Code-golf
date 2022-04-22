import { AppShell, Button } from "@mantine/core";
import styles from "../styles/Home.module.scss";
import Lottie from "react-lottie";
import * as animationData from "../Assets/JSON/golf.json";

export default function Index() {
  const defaultOptionsGolf = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <AppShell
      padding="md"
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
      <div className={styles.main}>
        <span className={styles.title}>
          Code<span className={styles.flicker}>Golf</span>
        </span>
        <div className={styles.illustration}>
          <Lottie options={defaultOptionsGolf} height={400} width={400} />
        </div>
        <Button
          variant="light"
          color="green"
          radius="md"
          size="xl"
          uppercase
          onClick={() => window.location.href = "/instruction"}
        >
          Start
        </Button>
      </div>
    </AppShell>
  );
}
