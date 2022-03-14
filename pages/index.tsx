import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import {
  UniversityTable,
  UniversityTableSearchField,
  UniversityTableFilter,
  UniversityTablePageNavigator,
} from "../src/components/university";
import { stateArray } from "../src/data/states";
import { Region } from "../src/types/locations";
import {
  University,
  UniversityFilter,
} from "../src/types/University";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faLightbulb as lightThemeIcon } from "@fortawesome/free-regular-svg-icons";
import { faMoon as darkThemeIcon } from "@fortawesome/free-solid-svg-icons";
interface PageProps {
  universities: University[];
  children?: React.ReactNode;
}

function generateFakeUniversity(): University {
  function randomStr(length: number) {
    var randomChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var result = "";
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length),
      );
    }
    return result;
  }

  return {
    Name:
      ["Universidade", "Colégio", "Escola", "Instituto", "Faculdade"][
        Math.floor(Math.random() * 5)
      ] +
      " " +
      randomStr(32),
    Initial: randomStr(4),
    Region: ["Norte", "Nordeste", "Centro_Oeste", "Sul", "Sudeste"][
      Math.floor(Math.random() * 5)
    ] as Region,
    State: stateArray[Math.floor(Math.random() * stateArray.length)],
    RegionType: Math.round(Math.random()) ? "Capital" : "Interior",
    Type: Math.round(Math.random()) ? "Pública" : "Privada",
  };
}

export async function getStaticProps() {
  var universities: University[] = [];

  try {
    var apiResponse = await fetch(
      "https://api.meuguru.net/global/university",
    );
    universities = await apiResponse.json();
  } catch (e) {
    for (let i = 0; i < 300; i++) {
      universities.push(generateFakeUniversity());
    }
  }

  return {
    props: {
      universities,
    },
    revalidate: 3600,
  };
}

const Home: NextPage<PageProps> = ({ universities: data }) => {
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<{
    function?: UniversityFilter;
  }>({});

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setDarkMode(
      window.matchMedia("(prefers-color-scheme: dark)").matches,
    );
  }, []);

  const [universities, setUniversities] = useState<University[]>([
    ...data,
  ]);

  useEffect(() => {
    setUniversities(
      data
        .filter(
          (university) =>
            !filter.function || filter.function(university),
        )
        .filter((university) => {
          const regex = new RegExp(search, "ig");
          return (
            !search ||
            regex.test(university.Name) ||
            regex.test(university.Initial) ||
            regex.test(university.Region) ||
            regex.test(university.RegionType) ||
            regex.test(university.Type) ||
            regex.test(university.State)
          );
        }),
    );
  }, [search, filter, data]);

  const PAGE_LENGTH = 20;
  const numPages = Math.ceil(universities.length / PAGE_LENGTH);

  const [page, setPage] = useState(1);

  return (
    <>
      <Head>
        <title>MeuGuru: Desafio Front-End</title>
        <meta
          name="description"
          content="Desafio de dev front-end pleno para a empresa MeuGuru"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/css/fontawesome.min.css"
          integrity="sha384-jLKHWM3JRmfMU0A5x5AkjWkw/EYfGUAGagvnfryNV3F9VqM98XiIH7VBGVoxVSc7"
        ></link>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={darkMode ? "dark" : ""}>
        <div className="w-screen min-h-screen flex justify-center items-stretch bg-gray-50 text-black dark:bg-gray-900 dark:text-gray-100">
          <div className="container p-4 flex flex-col h-screen gap-4 lg:py-16">
            <div className="gap-2 flex flex-col lg:flex-row lg:ietms-center lg:justify-between">
              <div className="flex flex-col items-center justify-center gap-2 lg:flex-row lg:gap-4">
                <Icon
                  className="purple-button"
                  icon={darkMode ? lightThemeIcon : darkThemeIcon}
                  onClick={() => setDarkMode((value) => !value)}
                />
                <UniversityTablePageNavigator
                  initialPage={1}
                  numPages={numPages}
                  onChange={({ newPage }) => setPage(newPage)}
                />
              </div>
              <div className="flex flex-col items-center gap-2 lg:gap-4 lg:flex-row lg:flex-grow lg:justify-end">
                <UniversityTableFilter
                  onChange={(e) =>
                    setFilter({
                      function: e.newFilter,
                    })
                  }
                />
                <UniversityTableSearchField
                  onChange={(e) => setSearch(e.newSearch)}
                />
              </div>
            </div>
            <div className="block w-full overflow-x-auto flex-grow">
              <UniversityTable
                universities={universities}
                pageLength={PAGE_LENGTH}
                page={page}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
