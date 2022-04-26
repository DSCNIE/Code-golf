import { Code } from "@mantine/core";
export default function Question3({ styles }) {
  return (
    <section className={styles.question}>
      <h1>I&apos;m A Thief (Difficulty – MEDIUM)</h1>
      <p>
      The Professor has planned a new heist, in which they will be robbing the International 
      Bank with a team of X members. But before they start the heist, he wants Tokyo to 
      get X guns ready from the arsenal. So, Tokyo has to get X guns loaded from the 
      arsenal in minimal time.
      </p>
      <p>
      In the arsenal, there are N guns placed in a line. There is a mark in the center of the line.
      The ith gun is placed at a distance ai from the mark. There are guns on both sides 
      of the mark, i.e., left and right.
      </p>
      <p>Initially, no guns are loaded. Now, she starts from the mark in the center (0 on the 
          integer line). She can move either to the left of the mark or the right of the mark with 
          a speed of 1. She can reload a gun when she comes next to it in negligible time.</p>
      <p>
      Find the minimum amount of time Tokyo will require to reload the X guns, for 
      the X team members so that they can execute the heist successfully.
      </p>
      <h3>Input Format</h3>
      The first line of input contains 2 integers, the total number of guns N, and the number of members in the team X.
The Second line of input contains N integers, a1, a2, .. . an, the distance of the guns from the center mark.
(negative value indicates that the gun is placed on the left side of the mark, and positive value indicates that the gun is placed on the right of the mark)
<h1>Constraints</h1>
      <ul>
        <li>1&lt;=N&lt;=105</li>
        <li>1&lt;=X&lt;= N</li>
        <li>| a<sub>i</sub> |&lt;= 105</li>
      </ul>{" "}
      <h3>Output Format</h3>
      Print the minimum time required to load X guns<br />
      <h5>Sample Input 0</h5>
      <Code block>
        {`6 3
-50 -30 -10 10 20 40
`}
      </Code>
      <h5>Sample Output 1</h5>
      <Code block>{`40`}</Code>{" "}
      <h5>Explanation 0</h5>
      <Code block>{`In this case Tokyo can move from the center (point marked as 0) to the gun placed at
-10 and load that gun ( 0 -> -10 ) which will take 10 seconds, then she can move towards 
the gun placed at 10 and load it ( which will take her 20 more seconds (-10 -> 0) + (0 -> 
10) ), and finally move towards the gun placed at 20 ( 10 -> 20). Total Time: 10 + 20 
+ 10 = 40.`}</Code>
      <h5>Sample Input 1</h5>
      <Code block>
        {`8 5
-10 -8 -5 -2 2 3 4 5
`}
      </Code>
      <h5>Sample Output 1</h5>
      <Code block>{`9`}</Code>
      <h5>Explanation 1</h5>
      <Code block>{`In this case Tokyo can move from the center (point marked as 0) to the gun placed at 
-2 and load that gun ( 0 -> -2 ) which will take 2 seconds, then she can move towards 
the gun placed at 2 and load it ( which will take her 4 more seconds (-2 -> 0) + (0 -> 2) ),
and finally move towards the right side (2 -> 3 -> 4 -> 5) which will take 3 more 
seconds. Total Time: 2 + 4 + 6 = 9.`}</Code>
    </section>
  );
}
