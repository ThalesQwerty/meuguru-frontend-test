import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { UniversityTable } from '../src/components/university';
import { UniversityTablePageNavigator } from '../src/components/university/UniversityTablePageNavigator';
import { University } from '../src/types/University';

interface PageProps {
  universities: University[],
  children?: React.ReactNode
}

export async function getStaticProps() {
  const apiResponse = await fetch("https://api.meuguru.net/global/university");
  const universities = await apiResponse.json();

  return {
    props: {
      universities,
    },
    revalidate: 3600,
  }
}

const Home: NextPage<PageProps> = ({ universities }) => {
  const PAGE_LENGTH = 15;
  const numPages = Math.ceil(universities.length / PAGE_LENGTH);

  const [page, setPage] = useState(1);

  useEffect(() => {
    console.log(numPages);
  }, []);

  return (
    <div>
      <UniversityTable universities={universities} pageLength={PAGE_LENGTH} page={page} />
      <UniversityTablePageNavigator initialPage={1} numPages={numPages} onChange={({ newPage }) => setPage(newPage)} />
    </div>
  )
}

export default Home
