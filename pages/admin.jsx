import { useLayoutEffect, useState } from "react";
import { auth, db } from "../firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot, collection } from "firebase/firestore";
import { useRouter } from "next/router";
import { AppShell, Table, LoadingOverlay, Avatar } from "@mantine/core";
import Navbar from "../components/navbar";

export default function Admin() {
  const router = useRouter();
  useLayoutEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user && user.uid != "fHZTitd8s4OFoWWovLKLP2uPDIt1") {
        router.push("/");
      }
    });
  });

  const [data, setData] = useState(null);

  onSnapshot(collection(db, "users"), (data) => {
    let tableData = data.docs.map((doc) => doc.data());
    tableData.sort((a, b) => {
      let chg =
        a.q1.chars +
        a.q2.chars +
        a.q3.chars +
        a.q4.chars +
        a.q5.chars -
        (b.q1.chars + b.q2.chars + b.q3.chars + b.q4.chars + b.q5.chars);
      if (chg > 0) {
        return 1;
      } else if (chg < 0) {
        return -1;
      }
      return 0;
    });
    setData(tableData);
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
        },
      })}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          backgroundColor: "#141517",
        }}
      >
        <h1 style={{ fontFamily: "'Press Start 2P', cursive" }}>Scoreboard</h1>
        <LoadingOverlay visible={!data} />
        <Table striped style={{ width: "70vw" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Q1 TestCase</th>
              <th>Q1 chars</th>
              <th>Q2 TestCase</th>
              <th>Q2 chars</th>
              <th>Q3 TestCase</th>
              <th>Q3 chars</th>
              <th>Q4 TestCase</th>
              <th>Q4 chars</th>
              <th>Q5 TestCase</th>
              <th>Q5 chars</th>
              <th>Total chars</th>
            </tr>
          </thead>
          <tbody>
            {!!data &&
              data.map((item, index) => (
                <tr key={index} style={{ textAlign: "center" }}>
                  <td style={{ display: "flex" }}>
                    <Avatar
                      radius="sm"
                      size="sm"
                      src={item.photoUrl}
                      alt="it's me"
                    />
                    {item.name}
                  </td>
                  <td>
                    {item.q1.testCase}
                    {"  "}
                    {item.q1.done ? "☑️" : "❌"}
                  </td>
                  <td>{item.q1.chars}</td>
                  <td>
                    {item.q2.testCase}
                    {"  "}
                    {item.q2.done ? "☑️" : "❌"}
                  </td>
                  <td>{item.q2.chars}</td>
                  <td>
                    {item.q3.testCase}
                    {"  "}
                    {item.q3.done ? "☑️" : "❌"}
                  </td>
                  <td>{item.q3.chars}</td>
                  <td>
                    {item.q4.testCase}
                    {"  "}
                    {item.q4.done ? "☑️" : "❌"}
                  </td>
                  <td>{item.q4.chars}</td>
                  <td>
                    {item.q5.testCase}
                    {"  "}
                    {item.q5.done ? "☑️" : "❌"}
                  </td>
                  <td>{item.q5.chars}</td>
                  <td>
                    {item.q1.chars +
                      item.q2.chars +
                      item.q3.chars +
                      item.q4.chars +
                      item.q5.chars}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </AppShell>
  );
}
