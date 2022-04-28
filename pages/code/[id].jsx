import styles from "../../styles/code.module.scss";
import dynamic from "next/dynamic";
import { useRef, useState, useLayoutEffect } from "react";
import {
  Button,
  AppShell,
  Modal,
  Kbd,
  Loader,
  Center,
  Blockquote,
  Code,
  RingProgress,
  Text,
} from "@mantine/core";
import { useMonaco } from "@monaco-editor/react";
import { ActionIcon } from "@mantine/core";
import { SunIcon, MoonIcon } from "@primer/octicons-react";
import Navbar from "../../components/navbar";
import { useRouter } from "next/router";
import axios from "axios";
import Question1 from "../../components/q1";
import Question2 from "../../components/q2";
import Question3 from "../../components/q3";
import Question4 from "../../components/q4";
import Question5 from "../../components/q5";
import { onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/Firebase";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"));

export default function CodeLayout() {
  const router = useRouter();
  useLayoutEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/");
      } else {
        localStorage.setItem("uid", user.uid);
      }
    });
  });

  const editorRef = useRef(null);

  const monaco = useMonaco();
  const { id } = router.query;
  const [chars, setChars] = useState(0);
  const defaultValue = `#include<stdio.h>

int main() {
    int a = 5;
    int b = 4;
    int sum = a + b;
    printf("Sum = %d", b);
    return 0;
}

// ------------------------------------------------
// ----------- Nope let's not do that -------------
// ------------------------------------------------

#include<stdio.h>
int main() {
    printf("Sum = %d", 5 + 4)
    return 0;
}
  `;

  const [dialog, setDialog] = useState({
    open: false,
    loading: true,
    all: false,
    error: false,
    some: false,
    title: "Running code on test-cases",
  });

  const run = () => {
    setDialog({ ...dialog, open: true });
    const code = editorRef.current.getValue();
    axios
      .post(`/api/run/${Number(id) + 1}`, {
        code,
      })
      .then(({ data }) => {
        const fail = data.filter((ele) => !ele.pass);
        console.log(fail);
        if (fail.length === 0) {
          setDialog({
            title: "Run complete",
            loading: false,
            all: true,
            open: true,
            error: false,
          });
        } else {
          const err = fail.filter((ele) => ele.error != null);
          if (err.length > 0) {
            setDialog({
              title: "Run complete",
              loading: false,
              all: false,
              open: true,
              error: true,
              errorData: err[0].error,
              errorCode: err[0].errText,
            });
          } else {
            setDialog({
              title: "Run complete",
              loading: false,
              all: false,
              open: true,
              some: true,
              error: false,
              pass: data.length - fail.length,
              total: data.length,
            });
          }
        }
      })
      .catch(console.error);
  };

  const submit = () => {
    setDialog({ ...dialog, open: true });
    const code = editorRef.current.getValue();
    axios
      .post(`/api/${Number(id) + 1}`, {
        code,
      })
      .then(({ data }) => {
        let docRef = doc(db, "users", localStorage.getItem("uid"));
        let newDoc = {};
        newDoc[`q${Number(id) + 1}`] = {
          code,
          chars,
          testCase: 0,
          done: false,
        };
        const fail = data.filter((ele) => !ele.pass);
        if (fail.length === 0) {
          setDialog({
            title: "Run complete",
            loading: false,
            all: true,
            open: true,
            error: false,
          });
          newDoc[`q${Number(id) + 1}`].testCase = data.length + 3;
          newDoc[`q${Number(id) + 1}`].done = true;
        } else {
          const err = fail.filter((ele) => ele.error != null);
          if (err.length > 0) {
            setDialog({
              title: "Run complete",
              loading: false,
              all: false,
              open: true,
              error: true,
              errorData: err[0].error,
              errorCode: err[0].errText,
            });
          } else {
            setDialog({
              title: "Run complete",
              loading: false,
              all: false,
              open: true,
              some: true,
              error: false,
              pass: data.length + 3 - fail.length,
              total: data.length + 3,
            });
            newDoc[`q${Number(id) + 1}`].testCase =
              data.length + 3 - fail.length;
          }
        }
        updateDoc(docRef, newDoc).then(() => router.push("/questions"));
      })
      .catch(console.error);
  };

  const [theme, setTheme] = useState("vs-dark");

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const switchTheme = () => {
    if (theme === "vs-dark") setTheme("vs-light");
    else setTheme("vs-dark");
  };

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
      <Modal
        opened={dialog.open}
        onClose={() =>
          setDialog({
            open: false,
            loading: true,
            all: false,
            error: false,
            title: "Running code on test-cases",
          })
        }
        title={dialog.title}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {dialog.loading && (
            <Center>
              <Loader color="green" size="xl" />
            </Center>
          )}

          {dialog.all && (
            <>
              <Blockquote color="green" cite="~ Team GDSC">
                All Test cases passed, you are doing great!
              </Blockquote>
            </>
          )}

          {dialog.some && (
            <Center>
              <RingProgress
                label={
                  <Text size="xs" align="center">
                    {dialog.pass}/{dialog.total}
                  </Text>
                }
                sections={[
                  { value: (dialog.pass / dialog.total) * 100, color: "green" },
                ]}
              />
            </Center>
          )}

          {dialog.error && (
            <>
              <h3>Error occured</h3>
              <h5 style={{ color: "red" }}>{dialog.errorCode}</h5>
              <Code block>{dialog.errorData}</Code>
            </>
          )}
        </div>
      </Modal>
      <div className={styles.container}>
        {id == "0" && <Question1 styles={styles} />}
        {id == "1" && <Question2 styles={styles} />}
        {id == "2" && <Question3 styles={styles} />}
        {id == "3" && <Question4 styles={styles} />}
        {id == "4" && <Question5 styles={styles} />}
        <section className={styles["code-wrapper"]}>
          <div className={styles["button-bar"]}>
            <span>
              Chars: <Kbd>{chars}</Kbd>
            </span>
            <ActionIcon variant="default" onClick={switchTheme}>
              {theme === "vs-dark" ? <SunIcon /> : <MoonIcon />}
            </ActionIcon>
            <Button
              style={{ marginRight: "5px" }}
              onClick={run}
              variant="light"
            >
              Run Code
            </Button>
            <Button onClick={submit}>Submit Code</Button>
          </div>
          <MonacoEditor
            defaultLanguage="c"
            defaultValue={defaultValue}
            onMount={handleEditorDidMount}
            theme={theme}
            height="80vh"
            fontLigatures={true}
            miniMap={true}
            fontSize="30"
            onChange={() =>
              editorRef.current.getValue().length > 0 &&
              setChars(editorRef.current.getValue().length)
            }
          />
        </section>
      </div>
    </AppShell>
  );
}
