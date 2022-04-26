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
        if (testCases[index].stdout === data.stdout.replace('\n', '')) {
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
      stdin: '6 98 30 20 10 33 90 21',
      stdout: '315.296970'
  },
  {
      stdin: '4 189 44 22 9 98',
      stdout: '541.636364'
  },
  {
      stdin: '8 100 10 20 40 11 20 38 291 38',
      stdout: '582.047058'
  }
]