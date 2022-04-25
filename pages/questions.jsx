import Navbar from "../components/navbar";
import styles from "../styles/Home.module.scss";
import { AppShell, Button, Center, Table } from "@mantine/core";
import {BsCodeSlash} from "react-icons/bs";
import {GiCommercialAirplane} from "react-icons/gi";

import { CountdownCircleTimer } from 
    'react-countdown-circle-timer'

export default function ques() {

    const elements = [
        { position: 'A', difficulty: 'Easy', status: 0, name: 'Log Chopping', count:'NA', tcCount:'0/15' },
        { position: 'B', difficulty: 'Easy', status: 0, name: 'I love AAAB', count:'NA', tcCount:'0/16' },
        { position: 'C', difficulty: 'Medium', status: 0, name: 'Unequal Array', count:'NA', tcCount:'0/20' },
        { position: 'D', difficulty: 'Medium', status: 0, name: 'Cyclic Rotation', count:'NA', tcCount:'0/10' },
        { position: 'E', difficulty: 'Hard', status: 0, name: 'notepad.exe', count:'NA', tcCount:'0/20' },
      ];

    const rows = elements.map((element) => (
        <tr key={element.name}>
          <td>{element.position}</td>
          <td>{element.name}</td>
          <td>{element.difficulty}</td>
          <td><GiCommercialAirplane/></td>
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
        },
      })}
    >

      <div >
      
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

            <Center>
        <Button  size="md" uppercase style={{margin: '20px'}}
          onClick={() => window.location.href = "/instructions"}
        >
          Instructions 
        </Button>
        </Center>
            

        </div>
        
      </div>
    </AppShell>
  );
}
