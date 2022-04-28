import { AppShell, Button } from "@mantine/core";
import styles from "../styles/Home.module.scss";
import Lottie from "react-lottie";
import * as animationData from "../Assets/JSON/golf.json";
import { useRouter } from "next/router";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../firebase/Firebase";
import React, { useLayoutEffect } from "react";
import { doc, setDoc } from "firebase/firestore";

export default function Index() {
  const provider = new GoogleAuthProvider();

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        console.log(result.user);
        let docRef = doc(db, "users", result.user.uid);
        let ques = [0, 1, 2, 3, 4, 5].map(() => ({
          code: "",
          chars: "",
          testCase: 0,
          done: false,
        }));
        let data = {
          name: result.user.displayName,
          photoUrl: result.user.photoURL,
          q1: ques[1],
          q2: ques[2],
          q3: ques[3],
          q4: ques[4],
          q5: ques[5],
        };
        console.log(data);
        await setDoc(docRef, data);
        router.push("/instruction");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const router = useRouter();
  useLayoutEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/instruction");
      }
    });
  });

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
          // onClick={() => router.push("/instruction")}
          onClick={handleLogin}
        >
          Sign In With Google
        </Button>
      </div>
    </AppShell>
  );
}
