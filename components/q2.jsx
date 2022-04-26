import { Code } from "@mantine/core";
export default function Question2({ styles }) {
  return (
    <section className={styles.question}>
      <h1>WE WE’RE ON A BREAK(difficulty – EASY)</h1>
      <p>
      Emily is helping ross pick a team for the upcoming tournament in london, he is building a team 
      with her help, he has already picked the majority of his team.
      </p>
      <p>
      He needs a total of 15 players and he has already purchased 11 players for his team.
He requires 1 more player for each position. (goal keeper , midfielder , defender and forward).
      </p>
      <p>
      There are N more players available that play at different positions (goal keepers , midfielders 
      , defenders and forwards). Let emily know if he can afford to complete his team within 
      his remaining budget B.
      </p>
      <h3>Input Format</h3>
      The first line of the input contains a single integer T denoting the number of test cases. Each test case consists of 3 lines. The description of T test cases follows:
      <br />
      Each test case consists of 3 lines. The description of T test cases follows:
      <br />
      <p>The first line contains 2 space-separated integers N and B.</p>
      <p>The second line consists of N integers that are the cost of each player available (Pi is the 
          cost of each players i).</p>
          <p>The third line consists of N integers with a code denoted by Xi for telling which player plays at which position (0 – GK , 1 – Mid , 2 – Def , 3 - Forward)
(If the first integer is 0 it means the first player available is a goal keeper).
</p>
<p>It is guaranteed that there is 1 player for each position in the N players given.</p>
<h1>Constraints</h1>
      <ul>
        <li>T&lt;=5</li>
        <li>4&lt;= N&lt;=5x105</li> 
        <li>1&lt;= B&lt;=200</li>
        <li>1&lt;=Pi&lt;=100</li>
        <li>0&lt;= Xi&lt;= 3</li>
      </ul>{" "}
      <h3>Output Format</h3>
      <p>For each test case, print a single line containing the string &quot;yes&quot; if it is possible to build a complete team or &quot;no&quot; otherwise (without quotes).
strictly print lowercase &quot;yes&quot; or &quot;no&quot;
</p>
      <h5>Sample Input 0</h5>
      <Code block>
        {`1
6 45 
3 3 9 5 8 15
1 2 3 0 2 3
`}
      </Code>
      <h5>Sample Output 0</h5>
      <Code block>{`yes`}</Code>{" "}
      <h5>Explanation 0</h5>
      <Code block>{`We have to pick 1 player for each position. On looking through the players available we 
can choose 1 from each position. While adding up the cost (5 for the GK, 3 for the mid, 
3 for the defender, 9 for the forward = 20 ) thus it stays below 45 which is the budget
given. Thus we print yes.`}</Code>
    </section>
  );
}
