import { Button, Flex, Image, Spinner, Text, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { RModal } from '../../components'
import useAPI from '../../hooks/useAPI'
import { returnImgUrl } from '../../utils'

type Props = {
  showId: number
  seasonNumber: number
  watchedEpisodes: number[]
}

const SeasonEpisodes = ({ showId, seasonNumber, watchedEpisodes }: Props) => {
  const [loading, setLoading] = useState(true)
  const [episodes, setEpisodes] = useState<any[]>([])
  const [episode, setEpisode] = useState<any>()
  const [showModal, setShowModal] = useState(false)
  const toast = useToast()
  const { apiPost } = useAPI()

  const fetchEpisodes = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/tv/${showId}/season/${seasonNumber}?api_key=1e5ff94f206cccc57ee88db7422ec433`
      )
      setEpisodes(data.episodes)
    } catch {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEpisodes()
  }, [seasonNumber, showId])

  const onMarkAsWatched = async ({ episodeNumber, episodeId }: any) => {
    try {
      await apiPost('/add-episode', {
        episodeNumber,
        episodeId,
        showId
      })
      toast({
        title: 'Success',
        description: 'Episode marked',
        status: 'success'
      })
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error'
      })
    }
  }
  const episodeWatched = watchedEpisodes.includes(episode?.id)
  return (
    <Flex overflowX="scroll" width="100%">
      {loading && <Spinner />}
      {episodes.map((episode) => (
        <Flex
          key={episode?.id}
          boxSize={100}
          flexDirection="column"
          margin={2}
          onClick={() => {
            setEpisode(episode)
            setShowModal(true)
          }}
        >
          <Image
            height={100}
            width={100}
            src={returnImgUrl(episode?.still_path)}
            objectFit="cover"
            borderRadius="5px"
          />
          <Text noOfLines={1}>{episode?.name}</Text>
        </Flex>
      ))}
      <RModal hideCloseButton isOpen={showModal} onClose={() => setShowModal(false)}>
        <Image
          width="100%"
          src={returnImgUrl(episode?.still_path)}
          objectFit="cover"
          borderRadius="5px"
        />
        <Flex marginTop={5} justifyContent="space-between">
          <Text>{episode?.name}</Text>
          <Text>{episode?.air_date}</Text>
        </Flex>
        <Flex marginY={5} flexDirection="column">
          <Text>{episode?.overview}</Text>
        </Flex>
        <Flex marginBottom={5} justifyContent="space-between">
          <Text>{episode?.runtime} minutes</Text>
          <Text>⭐️ {episode?.vote_average.toFixed(1)}</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Button
            onClick={() => {
              if (episodeWatched) {
                return
              }
              onMarkAsWatched({
                episodeNumber: episode.episode_number,
                episodeId: episode.id
              })
            }}
          >
            {episodeWatched ? 'Watched' : 'Mark as Watched'}
          </Button>
          <Button onClick={() => setShowModal(false)}>Close</Button>
        </Flex>
      </RModal>
    </Flex>
  )
}

export default SeasonEpisodes
