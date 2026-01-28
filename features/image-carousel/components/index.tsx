import ImageCarouselClient from "@/features/image-carousel/components/ImageCarouselClient";
import { getImageCarouselData } from "@/features/image-carousel/queries";

export default async function ImageCarousel() {
  const imageCarouselData = await getImageCarouselData();

  return <ImageCarouselClient imageCarouselData={imageCarouselData} />;
};
