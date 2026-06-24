import * as React from "react";

import useEmblaCarousel from "embla-carousel-react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import Video from "./video";

import * as carouselStyles from "../styles/carousel.module.css";
import * as containerStyles from "../styles/containers.module.css";
import * as mediaStyles from "../styles/media.module.css";

const normalizeMedia = (media, fallbackMedia) => {
  const mediaItems = Array.isArray(media) ? media : media ? [media] : [];
  const normalized = mediaItems
    .map((item) => item?.source || item)
    .filter(Boolean);

  return normalized.length ? normalized : fallbackMedia ? [fallbackMedia] : [];
};

const isVideoFile = (source) => {
  const extension = source?.extension?.toLowerCase() || "";
  return extension.includes("mp4") || extension.includes("mov");
};

const MediaItem = ({ source, title, imageClassName, href }) => {
  const isVideo = isVideoFile(source);
  const media = isVideo ? (
    <Video
      source={source.publicURL}
      title={title}
      classes={`${imageClassName} ${mediaStyles.reel}`}
    />
  ) : (
    <GatsbyImage image={getImage(source)} className={imageClassName} alt={title} />
  );

  return href ? (
    <a href={href} className={carouselStyles.mediaLink}>
      {media}
    </a>
  ) : (
    media
  );
};

const FeaturedMedia = ({
  media,
  fallbackMedia,
  title,
  imageClassName = containerStyles.card_image,
  enableCarousel = true,
  showControls = true,
  href,
}) => {
  const mediaItems = normalizeMedia(media, fallbackMedia);
  const shouldCarousel = enableCarousel && mediaItems.length > 1;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (!mediaItems.length) return null;

  if (!shouldCarousel) {
    return (
      <div className={containerStyles.card_landscape_inner}>
        <MediaItem
          source={mediaItems[0]}
          title={title}
          imageClassName={imageClassName}
          href={href}
        />
      </div>
    );
  }

  return (
    <div className={containerStyles.card_landscape_inner}>
      <div className={carouselStyles.viewport} ref={emblaRef}>
        <div className={carouselStyles.container}>
          {mediaItems.map((source, index) => (
            <div className={carouselStyles.slide} key={`${source.publicURL || title}-${index}`}>
              <MediaItem
                source={source}
                title={title}
                imageClassName={imageClassName}
                href={href}
              />
            </div>
          ))}
        </div>
      </div>

      {showControls && (
        <>
          <button
            className={`${carouselStyles.arrow} ${carouselStyles.previous}`}
            type="button"
            aria-label="Previous media"
            onClick={scrollPrev}
          />
          <button
            className={`${carouselStyles.arrow} ${carouselStyles.next}`}
            type="button"
            aria-label="Next media"
            onClick={scrollNext}
          />
        </>
      )}
    </div>
  );
};

export default FeaturedMedia;
