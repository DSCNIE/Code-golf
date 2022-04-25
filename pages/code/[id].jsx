import styles from "../../styles/code.module.scss";
import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
import { Button, AppShell, Header } from "@mantine/core";
import { useMonaco } from "@monaco-editor/react";
import { ActionIcon } from "@mantine/core";
import { SunIcon, MoonIcon } from "@primer/octicons-react";
import Navbar from "../../components/navbar";
import { useRouter } from "next/router";
import axios from "axios";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"));

export default function CodeLayout() {
  const editorRef = useRef(null);

  const monaco = useMonaco();
  const router = useRouter();
  const { id } = router.query;
  //   const defaultValue = `#include<stdio.h>

  // int main() {
  //     int a = 5;
  //     int b = 4;
  //     int sum = a + b;
  //     printf("Sum = %d", b);
  //     return 0;
  // }

  // // ------------------------------------------------
  // // ------------- Nope let's not that --------------
  // // ------------------------------------------------

  // #include<stdio.h>
  // int main() {
  //     printf("Sum = %d", 5 + 4)
  //     return 0;
  // }
  //   `;

  const defaultValue = `#include<stdio.h>
int main() {
    int a, b;
    scanf("%d", &a);
    scanf("%d", &b);
    printf("Sum = %d", (a+b));
    return 0;
}
  `;

  const run = () => {
    const code = editorRef.current.getValue();
    axios
      .post(
        process.env.NEXT_PUBLIC_API_HOST,
        {
          stdin: "3 4",
          files: [
            {
              name: "main.c",
              content: code,
            },
          ],
        },
        {
          header: {
            Authorization: `Token ${process.env.NEXT_PUBLIC_API_KEY}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then(console.log)
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
      <div className={styles.container}>
        <section>
          <button onClick={showValue} />
          {id}
        </section>
        <section className={styles["code-wrapper"]}>
          <div className={styles["button-bar"]}>
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
          />
        </section>
      </div>
    </AppShell>
  );
}
