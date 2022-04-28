import Navbar from "../components/navbar";
import styles from "../styles/Home.module.scss";
import { AppShell, Table, Badge, LoadingOverlay } from "@mantine/core";
import { GiCommercialAirplane } from "react-icons/gi";
import { useRouter } from "next/router";
import React, { useState, useLayoutEffect, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/Firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Ques() {
  const router = useRouter();

  const [read, setRead] = useState(false);

  const [elements, setElements] = useState([
    {
      position: "A",
      difficulty: "Easy",
      status: false,
      name: "CITY OF DREAMS - KOTA",
      count: "NA",
      tcCount: "0",
      tcTotal: "8",
    },
    {
      position: "B",
      difficulty: "Easy",
      status: false,
      name: "WE WE’RE ON A BREAK",
      count: "NA",
      tcCount: "0",
      tcTotal: "5",
    },
    {
      position: "C",
      difficulty: "Medium",
      status: false,
      name: "I'm A Thief ",
      count: "NA",
      tcCount: "0",
      tcTotal: "6",
    },
    {
      position: "D",
      difficulty: "Medium",
      status: false,
      name: "The end is the beginning, and the beginning is the end",
      count: "NA",
      tcCount: "0",
      tcTotal: "4",
    },
    {
      position: "E",
      difficulty: "Hard",
      status: false,
      name: "They sacrifice the few to save many.",
      count: "NA",
      tcCount: "0",
      tcTotal: "6",
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/");
      } else if (!read) {
        let docRef = doc(db, "users", user.uid);
        const data = await getDoc(docRef);
        console.log(data.data());
        let newElements = elements.map((item, index) => ({
          position: item.position,
          difficulty: item.difficulty,
          status: data.data()[`q${index + 1}`].done,
          name: item.name,
          count: data.data()[`q${index + 1}`].chars,
          tcCount: data.data()[`q${index + 1}`].testCase,
          tcTotal: item.tcTotal,
        }));
        setElements(newElements);
        setRead(true);
      }
    });
  }, []);

  const color = (data) => {
    if (data === "Easy") {
      return "green";
    } else if (data === "Hard") {
      return "red";
    } else {
      return "yellow";
    }
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
          height: "95vh",
        },
      })}
    >
      <div>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1> Questions </h1>
          </div>
          <Table striped highlightOnHover verticalSpacing="md" fontSize="md">
            <LoadingOverlay visible={!read} />
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Difficulty</th>
                <th>Status</th>
                <th>Character Count</th>
                <th>Test-Cases</th>
              </tr>
            </thead>
            <tbody>
              {elements.map((element, index) => (
                <tr
                  key={element.name + element.count + index}
                  onClick={() => router.push(`/code/${index}`)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{element.position}</td>
                  <td>{element.name}</td>
                  <td>
                    <Badge color={color(element.difficulty)} variant="dot">
                      {element.difficulty}
                    </Badge>
                  </td>
                  <td>{element.status ? "☑️" : "❌"}</td>
                  <td>{element.count === "" ? "N/A" : element.count}</td>
                  <td>
                    {element.tcCount}/{element.tcTotal}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </AppShell>
  );
}
