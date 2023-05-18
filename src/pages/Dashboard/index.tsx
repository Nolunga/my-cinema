import { Card, Flex, Image, Text } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageWrap } from '../../layout'
import { returnImgUrl } from '../../utils'

const Dashboard = () => {
  const navigate = useNavigate()

  const [highlight, setHighlight] = useState<any>()
  const [genres, setGenres] = useState([])
  const [trendingShows, setTrendingShows] = useState([])

  const getGenres = async () => {
    try {
      const { data } = await axios.get(
        'https://api.themoviedb.org/3/genre/tv/list?api_key=1e5ff94f206cccc57ee88db7422ec433'
      )
      setGenres(data.genres)
    } catch (error) {
      console.log({ error })
    }
  }

  const getTrendingShows = async () => {
    try {
      const { data } = await axios.get(
        'https://api.themoviedb.org/3/trending/tv/week?api_key=1e5ff94f206cccc57ee88db7422ec433'
      )
      const tvHighlight = data.results[Math.floor(Math.random() * data.results.length)]
      setHighlight(tvHighlight)
      setTrendingShows(data.results)
    } catch {}
  }

  useEffect(() => {
    getGenres()
    getTrendingShows()
  }, [])

  return (
    <PageWrap title="Home" paddingTop={10}>
      <Flex overflowX="scroll" marginBottom={5} justifyContent="space-evenly" width="100%">
        {genres.map(({ id, name }) => (
          <Card
            key={id}
            minWidth="110px"
            borderRadius="10px"
            alignItems="center"
            justifyContent="center"
            flexDirection="row"
            marginRight={2}
            marginLeft={2}
            marginBottom={2}
          >
            <Text textAlign="center">{name}</Text>
          </Card>
        ))}
      </Flex>
      <Card
        alignSelf="flex-start"
        backgroundImage={returnImgUrl(highlight?.backdrop_path)}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        width="93%"
        height="500px"
        borderRadius="20px"
        justifyContent="flex-end"
        onClick={() => navigate('/show/' + highlight?.id)}
      >
        <Flex marginBottom="50px" flexDirection="column" width="80%" marginLeft="30px">
          <Text fontSize={40}>{highlight?.name}</Text>
          <Text>{highlight?.overview}</Text>
          <Flex>
            <Text marginRight={5}>{highlight?.first_air_date?.split('-')[0]}</Text>
            <Text>⭐️ {highlight?.vote_average.toFixed(1)}</Text>
          </Flex>
        </Flex>
      </Card>
      <Flex alignSelf="flex-start">
        <Text textAlign="left" marginY={10} fontSize={25}>
          Trending
        </Text>
      </Flex>
      <Flex alignItems="center" overflowX="scroll" flexDirection="row" width="100%">
        {trendingShows.map((trending: any) => (
          <Card
            key={trending?.id}
            minWidth="300px"
            minHeight="150px"
            marginLeft={2}
            marginRight={2}
            backgroundColor="transparent"
            onClick={() => navigate('/show/' + trending?.id)}
          >
            <Image
              width="300px"
              height="100px"
              src={returnImgUrl(trending?.backdrop_path)}
              borderRadius="20px"
              objectFit="cover"
            />
            <Flex marginTop={3} justifyContent="space-around">
              <Flex width="60%">
                <Text>{trending?.name}</Text>
              </Flex>
              <Flex width="40%">
                <Text>{trending?.first_air_date?.split('-')[0]}</Text>
                <Text marginLeft={2}>⭐️ {trending?.vote_average.toFixed(1)}</Text>
              </Flex>
            </Flex>
          </Card>
        ))}
      </Flex>
    </PageWrap>
  )
}

export default Dashboard
