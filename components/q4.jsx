import { Code } from "@mantine/core";
export default function Question4({ styles }) {
  return (
    <section className={styles.question}>
      <h1>The end is the beginning, and the beginning is the end</h1>
      <p>
        Jonas wishes to meet young Martha but he is quite old and wishes to meet
        her as a young man. He recently learnt that by exploiting the energy
        level differences between parallel universes he can become younger.
      </p>
      <p>
        He has a long journey ahead of him as N parallel universes exist in a
        linear fashion with fixed position in space. He is currently on the
        leftmost universe (i, initially i is 1). He knows that he will only be
        able to meet her when only one universe remains. So he must now find a
        way to destroy the remaining universes.
      </p>
      <p>
        A helpful wizard told him that whenever he steps on the very rightmost
        universe (N), the leftmost universe (i) gets destroyed and he gets
        teleported from that (N)th universe to leftmost universe that exists
        which is (i+1)th universe. Let array A denote energies of N parallel
        universes..
      </p>
      <p>
        More formally, calculate: &sum;<sub>i=1</sub>
        <sup>N-1</sup> &sum;<sub>j=i+1</sub>
        <sup>N</sup> |A<sub>i</sub>-A<sub>j</sub>|
      </p>
      <h3>Input Format</h3>
      The first line of input contains 1 integer, the total number of parallel
      universes N
      <br />
      The second line of input contains N integers, A1, A2, A3, .., An, the
      energy levels of the parallel universes
      <br />
      <h1>Constraints</h1>
      <ul>
        <li>2&lt;=N&lt;=105</li>
        <li>| Ai |&lt;=108</li> <li>Ai is an integer</li>
      </ul>{" "}
      <h3>Output Format</h3>
      Print how many years has Jonas become younger when he finally meets Martha
      <br />
      <h5>Sample Input 0</h5>
      <Code block>
        {`6 
31 41 59 26 53 27
`}
      </Code>
      <h5>Sample Output 0</h5>
      <Code block>{`253`}</Code> <h5>Explanation 0</h5>
      <Code
        block
      >{`So there are 6 parallel universes. To destroy the first parallel universe, jonas travels to 
6th parallel universe, during travelling he becomes 69 years young since (|31-41| + |31-59| + |31-26| + |31-53| + |31-27| = 69).
After stepping at 6th parallel universe he gets teleported to 2nd parallel universe since now that first parallel universe is 
destroyed. Now he repeats this process till all (N-1) parallel universes gets destroyed and only one universe remains, 
so that he can meet Martha. During the whole journey we can see that jonas becomes 253 years young.`}</Code>
    </section>
  );
}
