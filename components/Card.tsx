import { Flex, Text, Img, Container } from "@chakra-ui/react";
import Link from "next/link";

import { FC } from "react";

interface Props {
  data: {
    name: string;
    id: number;
    gender: string;
    status: string;
    url: string;
    species: string;
    image: string;
  }
}
export const CardCharacter: FC<Props> = ({ data }: Props) => {

  console.log(data.url)

  const getStatusColor = (data: string, mode: string) => {

    let content = data.toLowerCase();

    if (mode === 'color') {

      if (content === 'alive') return 'green.700'
      if (content === 'dead') return 'red.700'
      else return 'white.200'
    }

    if (mode === 'bg') {
      if (content === 'alive') return 'green.300'
      if (content === 'dead') return 'red.300'
      else return 'black.100'
    }
  }
  return (
    <Link href={`/characters/${data.id}`} >
      <Flex border='4px solid' borderColor='green.200' py='4' px='3' w='220px' align='center'
        justify='center' direction='column' borderRadius='20px'
      >
        {
          data && (
            <>
              <Text as='h3' textAlign='center' pb='3' fontSize='lg' fontWeight='semibold' >{data.name} </Text>
              <Img
                src={data.image}
                alt={`image de ${data.name}`}
                width={180} height={180}
                borderRadius="50%"
              />

              <Flex justify='space-evenly' w='full' pt='6'>
                <Text>{data.gender} </Text>
                <Text color={getStatusColor(data.status, 'color')}
                  bg={getStatusColor(data.status, 'bg')}
                  px='6px'
                  py='3px'
                  borderRadius='8px'
                  fontWeight='semibold'
                >{data.status}</Text>
              </Flex>
              <Text textAlign='center' pt='3'>{data.species}</Text>
            </>
          )
        }
      </Flex >
    </Link>
  )

}
