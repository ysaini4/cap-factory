import Head from "next/head";
import { useEffect, useState } from "react";
const axios = require("axios");

export default function Home() {
  const [list, setList] = useState([]);
  const [capItem, setCapItem] = useState({});
  useEffect(() => {
    axios
      .get("https://api.spacexdata.com/v3/capsules")
      .then(function (response) {
        let capsule_serials = response.data.map((item) => item.capsule_serial);
        setList(capsule_serials);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  function capDetails(capsule_serial) {
    axios
      .get(`https://api.spacexdata.com/v3/capsules/${capsule_serial}`)
      .then(function (response) {
        setCapItem({ ...capItem, [capsule_serial]: response.data });
      });
  }
  return (
    <div className="container">
      <Head>
        <title>Capsules Factory</title>
        <link rel="icon" href="/" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to <a href="/"> Capsules Factory</a>
        </h1>

        <div className="grid">
          <div className="card">
            {list.map((capsule_serial) => {
              return (
                <div className="card" key={capsule_serial}>
                  <button onClick={() => capDetails(capsule_serial)}>
                    {capsule_serial}
                  </button>
                  {!capItem[capsule_serial] ? (
                    <span>{`Click on button to get data for Capsule ${capsule_serial}`}</span>
                  ) : (
                    <div>
                      {Object.keys(capItem[capsule_serial]).map((key) => (
                        <p key={key}>
                          {typeof capItem[capsule_serial][key] === "object"
                            ? `${key}: ${JSON.stringify(
                                capItem[capsule_serial][key]
                              )}`
                            : `${key}:${capItem[capsule_serial][key]}`}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <style jsx>{`
        button {
          background-color: #0070f3;
          border-radius:5px;
          border: none;
          color: white;
          padding: 10px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          margin: 4px 2px;
          cursor: pointer;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          width: 1200px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        p:hover,
        p:focus,
        p:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0;
          font-size: 1.5rem;
        }

        p {
          margin: 0 0 0px 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 1000px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
