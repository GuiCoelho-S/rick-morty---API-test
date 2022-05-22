import { NextPage } from "next";
import { useRouter } from "next/router";

const CharacterInfo: NextPage = () => {

  const id = useRouter();
  console.log(id.query.id);

  return (
    <p>{id.query.id}</p>
  )
}

export default CharacterInfo;
