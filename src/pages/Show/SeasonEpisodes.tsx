import { Button, Flex, Image, Spinner, Text } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'
import { RModal } from '../../components'

type Props = {
  showId: number
  seasonNumber: number
}

const SeasonEpisodes = ({ showId, seasonNumber }: Props) => {
  const [loading, setLoading] = useState(true)
  const [episodes, setEpisodes] = useState<any[]>([])
  const [episode, setEpisode] = useState<any>()
  const [showModal, setShowModal] = useState(false)

  const fetchEpisodes = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/tv/${showId}/season/${seasonNumber}?api_key=1e5ff94f206cccc57ee88db7422ec433`
      )
      console.log({ data })
      setEpisodes(data.episodes)
    } catch {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEpisodes()
  }, [seasonNumber, showId])

  return (
    <Flex overflowX="scroll">
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
            src={'https://image.tmdb.org/t/p/w500' + episode?.still_path}
            objectFit="cover"
            borderRadius="5px"
          />
          <Text noOfLines={1}>{episode?.name}</Text>
        </Flex>
      ))}
      <RModal hideCloseButton isOpen={showModal} onClose={() => setShowModal(false)}>
        <Image
          width="100%"
          src={'https://image.tmdb.org/t/p/w500' + episode?.still_path}
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
          <Button leftIcon={<AiFillCheckCircle />}> Watched</Button>
          <Button onClick={() => setShowModal(false)}>Close</Button>
        </Flex>
      </RModal>
    </Flex>
  )
}

export default SeasonEpisodes
