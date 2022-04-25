import styles from "../../styles/code.module.scss";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import {
  Button,
  AppShell,
  Modal,
  Kbd,
  Loader,
  Center,
  Blockquote,
  Code,
} from "@mantine/core";
import { useMonaco } from "@monaco-editor/react";
import { ActionIcon } from "@mantine/core";
import { SunIcon, MoonIcon } from "@primer/octicons-react";
import Navbar from "../../components/navbar";
import { useRouter } from "next/router";
import axios from "axios";
import Question1 from "../../components/q1";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"));

export default function CodeLayout() {
  const editorRef = useRef(null);

  const monaco = useMonaco();
  const router = useRouter();
  const { id } = router.query;
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
    title: "Running code on test-cases",
  });

  const run = () => {
    setDialog({ ...dialog, open: true });
    const code = editorRef.current.getValue();
    axios
      .post("/api/one", {
        code,
      })
      .then(({ data }) => {
        if (data.pass === "pass") {
          setDialog({
            title: "Run complete",
            loading: false,
            all: true,
            open: true,
            error: false,
          });
        } else if (data.pass === "error") {
          setDialog({
            title: "Run complete",
            loading: false,
            all: false,
            open: true,
            error: true,
            errorData: data.stderr,
            errorCode: data.error,
          });
        }
      })
      .catch(console.error);
  };

  const [theme, setTheme] = useState("vs-dark");

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const showValue = () => {
    alert(editorRef.current.getValue());
  };

  const switchTheme = () => {
    if (theme === "vs-dark") setTheme("vs-light");
    else setTheme("vs-dark");
  };

  const [chars, setChars] = useState(0);

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
            <Button onClick={showValue}>Submit Code</Button>
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
