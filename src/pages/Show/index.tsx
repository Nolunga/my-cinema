import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Card,
  Flex,
  Text,
  useToast
} from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import useAPI from '../../hooks/useAPI'
import { PageWrap } from '../../layout'
import { returnImgUrl } from '../../utils'
import SeasonEpisodes from './SeasonEpisodes'

const ShowPage = () => {
  const { apiPost } = useAPI()
  const params = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const showId = params.id

  const [showDetails, setShowDetails] = useState<any>()

  const getShowDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/tv/${showId}?api_key=1e5ff94f206cccc57ee88db7422ec433`
      )
      setShowDetails(data)
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error'
      })
    }
  }

  useEffect(() => {
    getShowDetails()
  }, [])

  const [watchedEpisodes, setWatchedEpisodes] = useState<number[]>([])

  const getWatchedEpisodes = async () => {
    try {
      const data = await apiPost('/watched-episodes', { showId })
      const ids = data.map((episode: any) => episode.episodeId)
      setWatchedEpisodes(ids)
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error'
      })
    }
  }

  useEffect(() => {
    getWatchedEpisodes()
  }, [])

  const [isSaving, setIsSaving] = useState(false)

  const onSaveShow = async () => {
    try {
      setIsSaving(true)
      await apiPost('/add-show', { showId })
      toast({
        title: 'Success',
        description: 'Show added to your list',
        status: 'success'
      })
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error'
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <PageWrap title="Home" paddingTop={10}>
      <Flex cursor="pointer" alignSelf="flex-start" marginBottom={5} onClick={() => navigate(-1)}>
        <AiOutlineArrowLeft size={24} />
        <Text marginLeft={2}>Go back</Text>
      </Flex>
      <Flex
        width="90%"
        marginBottom={5}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        paddingBottom={5}
      >
        <Text fontSize={35}>{showDetails?.name}</Text>
        <Button isLoading={isSaving} onClick={onSaveShow}>
          Save
        </Button>
      </Flex>
      <Card
        backgroundImage={returnImgUrl(showDetails?.backdrop_path)}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        width="90%"
        height="500px"
        borderRadius="20px"
        justifyContent="flex-end"
      >
        <Flex marginBottom="50px" flexDirection="column" width="80%" marginLeft="30px">
          <Text>{showDetails?.overview}</Text>
          <Flex>
            <Text marginRight={5}>{showDetails?.first_air_date?.split('-')[0]}</Text>
            <Text>⭐️ {showDetails?.vote_average.toFixed(1)}</Text>
          </Flex>
          <Flex>
            {showDetails?.genres.map((genre: any) => (
              <Text key={genre?.id} marginRight={2}>
                {genre?.name}
              </Text>
            ))}
          </Flex>
        </Flex>
      </Card>
      <Flex width="90%" paddingTop={5}>
        <Accordion allowToggle width="100%">
          {showDetails?.seasons.map((season: any) => (
            <AccordionItem key={season.id}>
              <AccordionButton flexDirection="row" justifyContent="space-between">
                <Text fontSize={25}>
                  {season?.name} ({season?.episode_count} Episodes)
                </Text>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                {season?.overview}
                <SeasonEpisodes
                  watchedEpisodes={watchedEpisodes}
                  showId={showDetails?.id}
                  seasonNumber={season?.season_number}
                />
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Flex>
    </PageWrap>
  )
}

export default ShowPage
