// Import Swiper styles

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Backdrop, Images, Poster } from "../../../types";
import {
  Box,
  Divider,
  Group,
  Image,
  SegmentedControl,
  Tabs,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useEffect, useState } from "react";

// import Image from "next/image";
import Slider from "react-slick";

type mediaImagesProps = {
  images: Images;
};

export function MediaCarousel({ images }: mediaImagesProps) {
  const [value, setValue] = useState("posters");

  const theme = useMantineTheme();

  const posterSettings = {
    className: "slider variable-width",
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 5,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const backdropSettings = {
    className: "slider variable-width",

    infinite: false,

    slidesToShow: 2,
    slidesToScroll: 2,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    if (value === "posters") {
      setActiveTab("posters");
    } else {
      setActiveTab("backdrops");
    }
  }, [value, images.posters, images.backdrops]);

  const [activeTab, setActiveTab] = useState<string | null>("posters");

  return (
    <>
      <Group spacing="xs" mb="md" mt={75}>
        <Divider
          my={6}
          size="sm"
          color={theme.colors.yellow[5]}
          orientation="vertical"
        />

        <Title size="h3">Photos</Title>

        <SegmentedControl
          ml="xl"
          value={value}
          onChange={setValue}
          size="sm"
          data={[
            { label: "Posters", value: "posters" },
            { label: "Backdrops", value: "backdrops" },
          ]}
        />
      </Group>
      <Tabs keepMounted={false} value={activeTab} onTabChange={setActiveTab}>
        <Tabs.Panel value="posters">
          {" "}
          <Slider {...posterSettings}>
            {images.posters.length > 4 &&
              images.posters.map((posters: Poster) => (
                <Box key={posters.file_path} w="100%">
                  <Box bg="dark.7">
                    <Image
                      height={258}
                      src={`https://image.tmdb.org/t/p/w780${posters.file_path}`}
                      alt=""
                    />
                  </Box>
                </Box>
              ))}
          </Slider>
        </Tabs.Panel>
        <Tabs.Panel value="backdrops">
          {" "}
          <Slider {...backdropSettings}>
            {images.backdrops.length > 4 &&
              images.backdrops.map((posters: Poster) => (
                <Box key={posters.file_path} w="100%">
                  <Box bg="dark.7">
                    <Image
                      height={258}
                      src={`https://image.tmdb.org/t/p/w1280${posters.file_path}`}
                      alt=""
                    />
                  </Box>
                </Box>
              ))}
          </Slider>
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
