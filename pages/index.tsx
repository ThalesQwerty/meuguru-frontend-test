import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { UniversityTable, UniversityTableSearchField, UniversityTableFilter, UniversityTablePageNavigator } from '../src/components/university';
import { stateArray } from '../src/data/states';
import { Region } from '../src/types/locations';
import { University, UniversityFilter } from '../src/types/University';

interface PageProps {
  universities: University[],
  children?: React.ReactNode
}

function randomUniversity(): University {
  function randomStr(length: number) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

  return {
    Name: "Universidade " + randomStr(32),
    Initial: randomStr(4),
    Region: ["Norte", "Nordeste", "Centro_Oeste", "Sul", "Sudeste"][Math.floor(Math.random() * 5)] as Region,
    State: stateArray[Math.floor(Math.random() * stateArray.length)],
    RegionType: Math.round(Math.random()) ? "Capital" : "Interior",
    Type: Math.round(Math.random()) ? "Pública" : "Privada",
  }
}

export async function getStaticProps() {
  var universities: University[] = [];

  try {
    var apiResponse = await fetch("https://api.meuguru.net/global/university")
    universities = await apiResponse.json();
  } catch (e) {
    for (let i = 0; i < 300; i++) {
      universities.push(randomUniversity());
    }
  }

  return {
    props: {
      universities,
    },
    revalidate: 1,
  }
}

const Home: NextPage<PageProps> = ({ universities: data }) => {
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<{ function?: UniversityFilter }>({});

  const [universities, setUniversities] = useState<University[]>([...data]);

  useEffect(() => {
    setUniversities(data.filter(university => !filter.function || filter.function(university)).filter(university => {
      const regex = new RegExp(search, "ig");
      return !search || regex.test(university.Name) || regex.test(university.Initial) || regex.test(university.Region) || regex.test(university.RegionType) || regex.test(university.Type) || regex.test(university.State);
    }))
  }, [search, filter]);

  const PAGE_LENGTH = 15;
  const numPages = Math.ceil(universities.length / PAGE_LENGTH);

  const [page, setPage] = useState(1);

  return <>
    <Head>
      <title>Create Next App</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/css/fontawesome.min.css" integrity="sha384-jLKHWM3JRmfMU0A5x5AkjWkw/EYfGUAGagvnfryNV3F9VqM98XiIH7VBGVoxVSc7"></link>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="w-100 flex justify-center items-center">
      <div className="w-100 lg:mx-2">
        <div className="my-2 flex flex-row justify-between gap-2">
          <UniversityTablePageNavigator initialPage={1} numPages={numPages} onChange={({ newPage }) => setPage(newPage)} />
          <div className="flex items-center gap-4">
            <UniversityTableFilter onChange={e => setFilter({ function: e.newFilter })} />
            <UniversityTableSearchField onChange={e => setSearch(e.newSearch)} />
          </div>
        </div>
        <div>
          <UniversityTable universities={universities} pageLength={PAGE_LENGTH} page={page} />
        </div>
      </div>
    </div>
  </>;
}

export default Home
