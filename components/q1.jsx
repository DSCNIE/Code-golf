import { Code } from "@mantine/core";
export default function Question1({ styles }) {
  return (
    <section className={styles.question}>
      <h1>CITY OF DREAMS – KOTA </h1>
      <p>
        After the amazing success of Kota Factory, Jeetu bhaiya wants to test
        his three bright students Vaibhav, Meenal and Meena.
      </p>
      <p>
        There are n beads on a table in a row. Each bead can be either red,
        green or blue. Jeetu bhaiya asked them to remove the minimum number of
        beads from the table such that any two neighbouring beads have different
        colors. Beads in a row are considered neighboring if there are no other
        beads between them.
      </p>
      <p>The task is to print the number of beads remaining on the table.</p>
      <p>
        Since Vaibhav, Meenal and Meena are tired after the shoot, can you help
        them to solve the problem?
      </p>
      <h3>Input Format</h3>
      The first line contains 1 integer n, total number of beads on the table.
      <br />
      The second line contains a string of size n. Each character in string
      represent colour of bead.
      <br />
      <ul>
        <li>&apos;R&apos; = Red bead</li>
        <li>&apos;G&apos; = Green bead</li> <li>&apos;B&apos; = Blue bead</li>
      </ul>{" "}
      <h3>Output Format</h3>
      Print the number of beads remaining on the table. <br />
      <h5>Sample Input 0</h5>
      <Code block>
        {`3
RRG`}
      </Code>
      <h5>Sample Output 0</h5>
      <Code block>{`0 
2`}</Code>{" "}
      <h5>Explanation 0</h5>
      <Code block>{`Remove Red bead either at index 0 or 1. 
Final string becomes 'RG', where neighbouring beads are of different
colours.`}</Code>
      <h5>Sample Input 1</h5>
      <Code block>
        {`5
RRRRR`}
      </Code>
      <h5>Sample Output 1</h5>
      <Code block>{`1`}</Code>
      <h5>Explanation 1</h5>
      <Code block>{`Remove 4 Red beads starting from index 0 to 3.
Final string becomes 'R'.`}</Code>
      <h5>Sample Input 2</h5>
      <Code block>
        {`4
BRBG`}
      </Code>
      <h5>Sample Output 1</h5>
      <Code block>{`4`}</Code>
      <h5>Explanation 1</h5>
      <Code
        block
      >{`Since all neighbours are different, no need to remove any bead.
Final string will be 'BRBG'.`}</Code>
    </section>
  );
}
