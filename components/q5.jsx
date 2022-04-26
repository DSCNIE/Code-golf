import { Code } from "@mantine/core";
export default function Question5({ styles }) {
  return (
    <section className={styles.question}>
      <h1>They sacrifice the few to save many. (Difficulty – HARD)</h1>
      <p>
      In a post apocalyptic world, all societies have been divided into factions. 
      One such faction has N members, and they are stuck in a building surrounded by zombies.
       Member i has the lucky number Ai.
      </p>
      <p>
      The building has a machine that gives ammo in a strange fashion.
      The machine works as follows:
      <ol>
      <li>Two people i and j operate the machine at once.</li>
      <li>The machine takes input two positive integers Ai and Aj</li>
      <li>The machine chooses a number uniformly randomly in the range [1, Ai⋅Aj] (inclusive).
           Let this number be called X.</li>
      <li>If X is coprime to Ai⋅Aj, K units of ammo is won by both i and j, else nobody wins any ammo.
          (Positive integers A and B are said to be coprime to each other if gcd(A,B) = 1)</li>
      </ol>
      </p>
      <p>All the members numbered 1 to N stand around the machine in a circle. Each adjacent 
          member pair in the circle operates the machine exactly once. More formally, ∀ i ∈ [1,N-1] 
          Ai and Ai+1 operate the machine together exactly once. For i = N, AN and A1 operate the
           machine together exactly once.</p>
      <p>
      At the end of the day, all the ammo won by individual members is summed up and is 
      used to fight the zombies. What is the expected value of units of ammo the faction takes away?
      </p>
      <h3>Input Format</h3>
      <ul>
        <li>The first line contains two spaced integers N and K, denoting the number of members in the faction, and the amount 
            of ammo the machine gives.</li>
        <li>The second line contains N spaced integers A1, A2, .., AN
ith integer Ai is the lucky number of ith member
</li>
      </ul>{" "}
      <h1>Constraints</h1>
      <p>
          <ul>
              <li>1&lt;=N&lt;=10<sup>6</sup></li>
              <li>1&lt;=Ai&lt;=10<sup>6</sup></li>
              <li>1&lt;=K&lt;=10<sup>3</sup></li>
          </ul>
      </p>
      <h3>Output Format</h3>
      Print a single real number — the expected number of units of ammo the faction takes 
      away. Your answer will be considered correct if its absolute or relative error does not 
      exceed 10<sup>-6</sup>. <br />
      <h5>Sample Input 0</h5>
      <Code block>
        {`3 10
3 1 1`}
      </Code>
      <h5>Sample Output 0</h5>
      <Code block>{`46.666667`}</Code>{" "}
      <h5>Explanation 0</h5>
      <Code block>{`Machine will be operated exactly 3 times. Let tuple (X1, X2, X3) denote the possible outcomes randomly chosen by the machine. Following are all the possibilities of (X1, X2, X3):
      
      (1,1,1) => Members 1 and 2 operate the machine and win ammo 10 each
      Members 2 and 3 operate the machine and win ammo 10 each
      Members 3 and 1 operate the machine and win ammo 10 each
      Total ammo won at the end of the day = 20+20+20 = 60
      (2,1,1) => 1 and 2 win 10, 2 and 3 win 10, 3 and 1 win 10 => Total ammo won = 60
      (3,1,1) => 1 and 2 win 0, 2 and 3 win 10, 3 and 1 win 10 => Total ammo won = 40
      (1,1,2) => 1 and 2 win 10, 2 and 3 win 10, 3 and 1 win 10 => Total ammo won = 60
      (2,1,2) => 1 and 2 win 10, 2 and 3 win 10, 3 and 1 win 10 => Total ammo won = 60
      (3,1,2) => 1 and 2 win 0, 2 and 3 win 10, 3 and 1 win 10 => Total ammo won = 40
      (1,1,3) => 1 and 2 win 10, 2 and 3 win 10, 3 and 1 win 0 => Total ammo won = 40
      (2,1,3) => 1 and 2 win 10, 2 and 3 win 10, 3 and 1 win 0 => Total ammo won = 40
      (3,1,3) => 1 and 2 win 0, 2 and 3 win 10, 3 and 1 win 0 => Total ammo won = 20
      
      
      ∴ Expected Ammo = (60+60+40+60+60+40+40+40+20)/9
      = 46.666667`}</Code>
      <h5>Sample Input 1</h5>
      <Code block>
        {`4 3
4 3 2 1
`}
      </Code>
      <h5>Sample Output 1</h5>
      <Code block>{`10.000000`}</Code>
      <h5>Sample Input 2</h5>
      <Code block>
        {`10 62
17423 15216 7041 15522 6517 30153 11795 27728 20345 4819 
`}
      </Code>
      <h5>Sample Output 2</h5>
      <Code block>{`532.244953`}</Code>
    </section>
  );
}
