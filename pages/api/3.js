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
      stdin: '6 3 -50 -30 -10 10 20 40',
      stdout: '40'
  },
  {
      stdin: '8 5 -10 -8 -5 -2 2 3 4 5',
      stdout: '9'
  },
  {
      stdin: '5 3 -30 -10 10 20 50',
      stdout: '40'
  },
  {
      stdin: '3 2 10 20 30',
      stdout: '20'
  },
  {
      stdin: '1 1 0',
      stdout: '0'
  },
  {
      stdin: '8 5 -9 -7 -4 -3 1 2 3 4',
      stdout: '10'
  }
]