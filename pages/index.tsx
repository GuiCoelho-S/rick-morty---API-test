import { Box, Button, Center, Container, Flex, Text, Link, Icon } from '@chakra-ui/react'
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head'
import { AiFillGithub } from 'react-icons/ai';
import RickAndMortyImg from '../assets/rick&morty.png';

import NextLink from 'next/link';
import Image from 'next/image'
import { dehydrate, QueryClient, useQuery } from 'react-query';
import axios from 'axios';
import { CardCharacter } from '../components/Card';

const Home: NextPage = () => {

  const linkPages = [
    {
      slug: "Personagens",
      path: "/"
    },
    {
      slug: "Planetas",
      path: "/planets",
    },
    {
      slug: "Episódios",
      path: "/episodes"
    }
  ]

  const { data } = useQuery('characters', getCharacters);

  return (
    <Container
      maxW="100vw"
      bg="#f2f2f2"
      p="0"
    >

      <Head >
        <title>HomePage | Rick & Morty</title>
      </Head>

      <Box as="section" p="2" bg="#f2f2f2" position='relative' >
        <Flex justify="flex-end">

          <Link isExternal href='https://github.com/GuiCoelho-S' target='_blank' display='flex' alignItems='center' >
            <Text as='h3' color='#333' fontSize='medium' fontWeight='bold' mr='5px'>
              GuiCoelho-S
            </Text>
            <Icon as={AiFillGithub} w='8' h='8' fill='#333' />
          </Link>


        </Flex>
      </Box>
      <Flex as='header'
        justify='space-evenly'
        align='center'
        position='sticky'
        zIndex='3'
        top='0px'
        bgGradient='linear(to-t,#b9fcd3, #f2f2f2)'
        p='4'
        fontSize='xl'
      >
        {
          linkPages.map((page, index) => (
            <NextLink
              href={page.path} passHref key={index + page.slug}>
              <Link fontWeight='extrabold' color='blackAlpha.600' border='2px solid transparent' p='2'
              >{page.slug}</Link>
            </NextLink>

          ))
        }
      </Flex>

      <Flex as='section' m='0 auto' align='center' direction='column' pb='8' bg='#b9fcd3' >
        <Image src={RickAndMortyImg} width='480px' height='480px' objectFit='contain' alt="rick and morty image" />
      </Flex>
      <Flex
        m='0 auto'
        px='3'
        py='5'
        as='main'
        maxW='1200px'
        width='full'
        bg='#f2f2f2'
        flexWrap='wrap'
        justify='center'
        align-items='center'
        gap='10'
      >
        {
          data.results.map((character: any) => (<CardCharacter data={character} key={character.id} />))
        }
      </Flex>
    </Container >
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('characters', getCharacters)

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

const getCharacters = async () => {

  const { data } = await axios.get('https://rickandmortyapi.com/api/character');

  return data;
}
