import Navbar from "../components/navbar";
import styles from "../styles/Home.module.scss";
import Lottie from "react-lottie";
import * as animationData from "../Assets/JSON/journey.json";
import { AppShell, Button, Center } from "@mantine/core";


export default function Inst() {

  const instructions = [
    "Only C language is allowed.",
    "A participant’s score depends on the total number of characters in the solution. ",
    "Points alloted for a solution is inversly proportional to the number of characters in the solution, i.e. less characters = more points.",
    "Spaces and Newlines are not counted as characters, so feel free to use them in your solutions.",
    "Participants are ranked by score. If two or more participants achieve the same score, then the tie is broken by the total time taken to submit the last solution resulting in a higher score",
    "You can submit the solution for a challenge as many times you want, the submission with lowest character count will be considered for the final leaderboard.",
  ]

  const  descriptions = [
    "We are excited to bring to you a COMPETITIVE CODING CONTEST",
    "If you are fond of challenges then this event is for you.",
    "This event is exclusively for beginners so as to help you find the footing you need with competitive programming.",
    "It also is a great opportunity for you to learn and grow which in turn will help you with the placement process."
  ]

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

      <div >
        <div className={styles.container}>
        <div className={styles.header}>
          <h1> Instructions </h1>
        </div>
        <ul>
          {instructions.map((instruction) => (<li className={styles.instructions}>{instruction}</li>))}
        </ul>
        <Center>
        <Button  size="md" uppercase
          onClick={() => window.location.href = "/code"}
        >
          Start
        </Button>
        </Center>
        </div>
      </div>
    </AppShell>
  );
}
