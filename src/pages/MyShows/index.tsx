import { Button, Card, Flex, Spinner, Text, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import useAPI from '../../hooks/useAPI'
import { PageWrap } from '../../layout'
import { returnImgUrl } from '../../utils'

const MyShowsPage = () => {
  const { apiGet, apiPost } = useAPI()
  const navigate = useNavigate()
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [myShows, setMyShows] = useState<any[]>([])

  const getMyShows = async () => {
    try {
      const data = await apiGet('/my-shows', '')
      setMyShows(data)
    } catch (error: any) {
      toast({
        status: 'error',
        title: 'Error',
        description: error.message
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getMyShows()
  }, [])

  const onRemoveShow = async (showId: string) => {
    try {
      await apiPost('/delete-show', { showId })
      toast({
        title: 'Success',
        description: 'Show has been removed',
        status: 'success'
      })
      getMyShows()
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error'
      })
    }
  }

  return (
    <PageWrap title="Home" paddingTop={10}>
      <Flex cursor="pointer" alignSelf="flex-start" marginBottom={5} onClick={() => navigate(-1)}>
        <AiOutlineArrowLeft size={24} />
        <Text marginLeft={2}>Go back</Text>
      </Flex>
      <Flex
        width="100%"
        marginBottom={5}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        paddingBottom={5}
      >
        <Text fontSize={35}>My Shows</Text>
      </Flex>
      {isLoading && <Spinner alignSelf="center" />}
      {myShows?.map((show) => (
        <Flex key={show.id} width="100%" borderBottomWidth="1px" paddingTop={5} paddingBottom={1}>
          <Card
            backgroundImage={returnImgUrl(show?.backdrop_path)}
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            width="60%"
            height="350px"
            borderRadius="20px"
            justifyContent="flex-end"
            onClick={() => navigate('/show/' + show?.id)}
          >
            <Flex marginBottom="50px" flexDirection="column" width="80%" marginLeft="30px">
              <Text>{show?.overview}</Text>
              <Flex>
                <Text marginRight={5}>{show?.first_air_date?.split('-')[0]}</Text>
                <Text>⭐️ {show?.vote_average.toFixed(1)}</Text>
              </Flex>
              <Flex>
                {show?.genres.map((genre: any) => (
                  <Text key={genre?.id} marginRight={2}>
                    {genre?.name}
                  </Text>
                ))}
              </Flex>
            </Flex>
          </Card>
          <Flex width="30%" paddingLeft={5} flexDirection="column">
            <Flex justifyContent="space-between" marginBottom={4}>
              <Button onClick={() => navigate('/show/' + show?.id)}>View Episodes</Button>
              <Button onClick={() => onRemoveShow(show.dbId)}>Remove Show</Button>
            </Flex>
            <Text>Next Episode</Text>
            <Card
              backgroundImage={returnImgUrl(show?.backdrop_path)}
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              width="100%"
              height="150px"
              borderRadius="20px"
              justifyContent="flex-end"
            />
          </Flex>
        </Flex>
      ))}
    </PageWrap>
  )
}

export default MyShowsPage
