import Navbar from "../components/navbar";
import styles from "../styles/Home.module.scss";
import { AppShell, Table } from "@mantine/core";
import { GiCommercialAirplane } from "react-icons/gi";
import { useRouter } from "next/router";

import { CountdownCircleTimer } from "react-countdown-circle-timer";
import React, { useLayoutEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/Firebase";

export default function Ques() {
  const router = useRouter();

  useLayoutEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/");
      }
    });
  });
  const elements = [
    {
      position: "A",
      difficulty: "Easy",
      status: 0,
      name: "CITY OF DREAMS - KOTA",
      count: "NA",
      tcCount: "0/15",
    },
    {
      position: "B",
      difficulty: "Easy",
      status: 0,
      name: "WE WE’RE ON A BREAK",
      count: "NA",
      tcCount: "0/16",
    },
    {
      position: "C",
      difficulty: "Medium",
      status: 0,
      name: "I'm A Thief ",
      count: "NA",
      tcCount: "0/20",
    },
    {
      position: "D",
      difficulty: "Medium",
      status: 0,
      name: "The end is the beginning, and the beginning is the end",
      count: "NA",
      tcCount: "0/10",
    },
    {
      position: "E",
      difficulty: "Hard",
      status: 0,
      name: "They sacrifice the few to save many.",
      count: "NA",
      tcCount: "0/20",
    },
  ];

  const rows = elements.map((element, index) => (
    <tr key={element.name} onClick={() => router.push(`/code/${index}`)}>
      <td>{element.position}</td>
      <td>{element.name}</td>
      <td>{element.difficulty}</td>
      <td>
        <GiCommercialAirplane />
      </td>
      <td>{element.count}</td>
      <td>{element.tcCount}</td>
    </tr>
  ));

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
            <tbody>{rows}</tbody>
          </Table>
        </div>
      </div>
    </AppShell>
  );
}
