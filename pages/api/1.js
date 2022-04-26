// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(process.env.API_KEY);
    const { code } = req.body;
    let promises = testCases.map((testCase) =>
      axios.post(
        process.env.API_HOST,
        {
          stdin: testCase.stdin,
          files: [
            {
              name: "main.c",
              content: code,
            },
          ],
        },
        {
          headers: {
            Authorization: `Token ${process.env.API_KEY}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
    );
    const responses = await Promise.all(promises);
    const retArray = Array.from({ length: testCases.length });
    responses.forEach(({ data }, index) => {
      if (data.error === "" && data.stderr === "") {
        if (testCases[index].stdout === data.stdout) {
          retArray[index] = {
            testCase: index + 1,
            pass: true,
            stdout: data.stdout,
          };
        } else {
          retArray[index] = {
            testCase: index + 1,
            pass: false,
            stdout: data.stdout,
            error: null,
          };
        }
      } else {
        console.log("reachhh");
        retArray[index] = {
          testCase: index + 1,
          pass: false,
          errText: data.error,
          error: data.stderr,
          stdin: testCases[index].stdin,
        };
      }
    });
    res.status(200).json(retArray);
  }
}

const testCases = [
  {
    stdin: "3 RRG",
    stdout: "2",
  },
  {
    stdin: "5 RRRRR",
    stdout: "1",
  },
  {
    stdin: "4 BRBG",
    stdout: "4",
  },
  {
    stdin: "5 RRBRBR",
    stdout: "4",
  },
  {
    stdin: "1 R",
    stdout: "1",
  },
  {
    stdin: "7 BRRRGGB",
    stdout: "4",
  },
  {
    stdin: "43 RBGRBRBBGGRBRRRBRGRGBRGGRRRGBGBBRBBRBGGBGBB",
    stdout: "32",
  },
  {
    stdin: "31 RBGGRGGBGGBBRRGBGRRRGGGRGRGRRGB",
    stdout: "21",
  },
];
