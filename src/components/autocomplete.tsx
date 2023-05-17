import {
  AspectRatio,
  Box,
  Button,
  Grid,
  Group,
  Image,
  Modal,
  Text,
} from "@mantine/core";
import { Cast, MediaItemType } from "../../types";
import React, { ChangeEvent, useState } from "react";

import { useDisclosure } from "@mantine/hooks";

const Autocomplete = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MediaItemType[]>([]);

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=0fd7a8764e6522629a3b7e78c452c348&query=${value}`
      );
      const data = await response.json();
      const searchResults = data.results || [];

      // Fetch credits for each item
      const resultsWithCredits = await Promise.all(
        searchResults.map(async (item: MediaItemType) => {
          if (item.media_type === "movie" || item.media_type === "tv") {
            const creditsResponse = await fetch(
              `https://api.themoviedb.org/3/${item.media_type}/${item.id}/credits?api_key=0fd7a8764e6522629a3b7e78c452c348`
            );
            const creditsData = await creditsResponse.json();
            const credits = creditsData.cast || [];
            return { ...item, credits };
          }
          return item;
        })
      );

      setResults(resultsWithCredits);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
      <Modal opened={opened} onClose={close} title="Authentication">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
        />
        <Box>
          {results.map(
            (item) =>
              (item.poster_path || item.profile_path) && (
                <Grid key={item.id}>
                  <Grid.Col span="content">
                    <AspectRatio ratio={2 / 3} w={50}>
                      <Image
                        placeholder="blur"
                        src={`https://image.tmdb.org/t/p/w500${
                          item.media_type === "person"
                            ? item.profile_path
                            : item.poster_path
                        }`}
                        alt={item.title}
                      />
                    </AspectRatio>
                  </Grid.Col>
                  <Grid.Col span={10}>
                    <Text truncate>{item.title || item.name}</Text>
                    {item.media_type === "person" && item.known_for && (
                      <Group spacing={0}>
                        {item.known_for.slice(0, 2).map((knownItem, index) => (
                          <React.Fragment key={knownItem.id}>
                            <Text fz="sm" c="dimmed">
                              {knownItem.title}
                            </Text>
                            {item.known_for &&
                              index !==
                                item.known_for.slice(0, 2).length - 1 && (
                                <Text>,&nbsp;</Text>
                              )}
                          </React.Fragment>
                        ))}
                      </Group>
                    )}
                    {item.media_type === "movie" && item.credits && (
                      <Group spacing={0}>
                        {item.credits
                          .slice(0, 2)
                          .map((credit: Cast, index: number) => (
                            <React.Fragment key={credit.id}>
                              <Text fz="sm" c="dimmed">
                                {credit.name}
                              </Text>
                              {item.credits &&
                                index !==
                                  item.credits.slice(0, 2).length - 1 && (
                                  <Text>,&nbsp;</Text>
                                )}
                            </React.Fragment>
                          ))}
                      </Group>
                    )}
                    {item.media_type === "tv" && item.credits && (
                      <Group spacing={0}>
                        {item.credits &&
                          item.credits
                            .slice(0, 2)
                            .map((credit: Cast, index: number) => (
                              <React.Fragment key={credit.id}>
                                <Text fz="sm" c="dimmed">
                                  {credit.name}
                                </Text>
                                {item.credits &&
                                  index !==
                                    item.credits.slice(0, 2).length - 1 && (
                                    <Text>,&nbsp;</Text>
                                  )}
                              </React.Fragment>
                            ))}
                      </Group>
                    )}
                  </Grid.Col>
                </Grid>
              )
          )}
        </Box>
      </Modal>
      <Group position="center">
        <Button onClick={open}>Open modal</Button>
      </Group>
    </div>
  );
};

export default Autocomplete;

// import {
//   AspectRatio,
//   Box,
//   Button,
//   Flex,
//   Group,
//   Image,
//   Modal,
//   Text,
// } from "@mantine/core";
// import React, { ChangeEvent, useState } from "react";

// import { MediaItemType } from "../../types";
// import { useDisclosure } from "@mantine/hooks";

// interface SearchResult extends MediaItemType {
//   title: string;
//   name: string;
// }

// const Autocomplete = () => {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState<SearchResult[]>([]);

//   const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setQuery(value);
//     console.log(value);

//     try {
//       const response = await fetch(
//         `https://api.themoviedb.org/3/search/multi?api_key=0fd7a8764e6522629a3b7e78c452c348&query=${value}`
//       );
//       const data = await response.json();
//       setResults(data.results || []);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   const [opened, { open, close }] = useDisclosure(false);

//   return (
//     <div>
//       <Modal opened={opened} onClose={close} title="Authentication">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={query}
//           onChange={handleInputChange}
//         />
//         <Box>
//           {results.map(
//             (item) =>
//               (item.poster_path || item.profile_path) && (
//                 <Flex key={item.id}>
//                   <AspectRatio ratio={2 / 3} w={50}>
//                     <Image
//                       placeholder="blur"
//                       src={`https://image.tmdb.org/t/p/w500${
//                         item.media_type === "person"
//                           ? item.profile_path
//                           : item.poster_path
//                       }`}
//                       alt={item.title}
//                     />
//                   </AspectRatio>
//                   <Box>
//                     <Text>{item.title || item.name}</Text>
//                     {item.media_type === "person" &&
//                       item.known_for &&
//                       item.known_for.length > 1 && (
//                         <Group spacing={0}>
//                           <Text fz="sm">{item.known_for[1].title},</Text>&nbsp;
//                           <Text fz="sm">{item.known_for[2].title}</Text>
//                         </Group>
//                         // <Text>
//                         //   {item.known_for.slice(0, 2).map((knownItem) => (
//                         //     <Text fz="sm" span key={knownItem.id}>
//                         //       {knownItem.title}
//                         //     </Text>
//                         //   ))}
//                         // </Text>
//                       )}
//                   </Box>
//                 </Flex>
//               )
//           )}
//         </Box>
//       </Modal>

//       <Group position="center">
//         <Button onClick={open}>Open modal</Button>
//       </Group>
//     </div>
//   );
// };

// export default Autocomplete;
