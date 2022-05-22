import { dehydrate, QueryClient, useQuery } from "react-query";
import { GetStaticProps } from "next";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Box, Img } from "@chakra-ui/react";

const CharacterInfo: NextPage = () => {

  const id = useRouter();
  const { data } = useQuery(['posts', id], async () => getAllInfo(id.query.id));

  console.log(data)


  return (
    <>
      {
        data && (

          <Box>
            <Img src={data.image} alt={`imagem de ${data.name}`} w='80px' h='80px' />
          </Box>
        )
      }
    </>
  )
}

export default CharacterInfo;

export const getStaticProps: GetStaticProps = async (context: any) => {

  const queryClient = new QueryClient();

  let id = context.params.id;

  await queryClient.prefetchQuery(['posts', id], async () => getAllInfo(id))

  return {
    props: {
      dehydrateState: dehydrate(queryClient)
    }
  }
}

const getAllInfo = async (id: any) => {

  const { data } = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);

  return data;
}

export const getStaticPaths = async () => {

  return {
    paths: [],
    fallback: true,
  }
}
