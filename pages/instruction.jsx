import Navbar from "../components/navbar";
import styles from "../styles/Home.module.scss";
import { AppShell, Button, Center } from "@mantine/core";
import { useRouter } from "next/router";
import React, { useLayoutEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/Firebase";

export default function Inst() {
  const instructions = [
    "Only C language is allowed.",
    "A participant’s score depends on the total number of characters in the solution. ",
    "Points alloted for a solution is inversly proportional to the number of characters in the solution, i.e. less characters = more points.",
    "Spaces and Newlines are not counted as characters, so feel free to use them in your solutions.",
    "Participants are ranked by score. If two or more participants achieve the same score, then the tie is broken by the total time taken to submit the last solution resulting in a higher score",
    "You can submit the solution for a challenge as many times you want, the submission with lowest character count will be considered for the final leaderboard.",
  ];

  const router = useRouter();

  useLayoutEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/");
      }
    });
  });

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
          height: "95vh",
        },
      })}
    >
      <div>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1> Instructions </h1>
          </div>
          <ul>
            {instructions.map((instruction, index) => (
              <li key={index} className={styles.instructions}>
                {instruction}
              </li>
            ))}
          </ul>
          <Center>
            <Button
              size="md"
              uppercase
              onClick={() => router.push("/questions")}
            >
              Start
            </Button>
          </Center>
        </div>
      </div>
    </AppShell>
  );
}
