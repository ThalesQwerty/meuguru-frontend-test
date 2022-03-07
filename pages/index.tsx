import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react';
import { UniversityTable } from '../src/components/university';
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
  useEffect(() => {
    console.log(universities);
  }, []);

  return (
    <div>
      <UniversityTable universities={universities} />
    </div>
  )
}

export default Home
