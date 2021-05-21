import { useParams,Link } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import Movie from "../components/Movie"

const LANGUAGE={
  en:"ENGLISH",
  ja:"JAPAN"
}
const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      title
      medium_cover_image
      language
      rating
      description_intro
    }
    suggestions(id: $id){
      id
      title
      medium_cover_image
      rating
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
  width:50vw;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center center;
`;

const Suggestions = styled.div`
  display:flex
  align-item:center
  margin-right:10px
  width:10vw
  height:20vh
`
const MiniPoster = styled.div`
width: 100vw;
height: 60%;
background-color: transparent;
background-image: url(${props => props.bg});
background-size: cover;
background-position: center center;
`
const MiniRating = styled.p`
width:100%
height:20%

`
const MiniContainer = styled.div`
width:100%;
height:100%;
margin-right:10px
`
function Item(m){
  console.log(m)
  return(
    <MiniContainer>
      <Link to={`${m.id}`}>
        <MiniPoster bg={m.medium_cover_image}/>
        <MiniRating>{m.rating}</MiniRating>
      </Link>
    </MiniContainer>
    
  )
}
export default () => {
  const { id } = useParams();
  
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: {id:+id}
  });
  
console.log(data)
  return (
    <Container>
      <Column>
        <Title>{loading ? "Loading...." : data?.movie?.title}</Title>
        <Subtitle>{LANGUAGE[data?.movie?.language]}·{data?.movie?.rating}</Subtitle>
        <Description>{data?.movie?.description_intro} </Description>
        <Suggestions>
        {data?.suggestions?.map(m=>{
             <Movie
             key={m.id}
             id={m.id}
 
             bg={m.medium_cover_image}
           />
          
        })}


        </Suggestions>
      </Column>
      <Poster bg={data?.movie?.medium_cover_image}></Poster>

    </Container>
  );
};