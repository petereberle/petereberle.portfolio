import * as React from "react"

import useEmblaCarousel from "embla-carousel-react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Video from "./video"

import * as carouselStyles from "../styles/carousel.module.css"
import * as containerStyles from "../styles/containers.module.css"
import * as mediaStyles from "../styles/media.module.css"

const normalizeMedia = (media, fallbackMedia) => {
  const mediaItems = Array.isArray(media) ? media : media ? [media] : []
  const normalized = mediaItems
    .map(item => {
      const isDescriptor =
        item &&
        typeof item === "object" &&
        ("source" in item || "iframe" in item || "scroll" in item)

      return {
        source: isDescriptor ? item.source : item,
        iframe: isDescriptor ? item.iframe : null,
        scroll: isDescriptor && item.scroll === true,
      }
    })
    .filter(({ source, iframe }) => Boolean(source || iframe))

  return normalized.length
    ? normalized
    : fallbackMedia
    ? [{ source: fallbackMedia, scroll: false }]
    : []
}

const isVideoFile = source => {
  const extension = source?.extension?.toLowerCase() || ""
  return extension.includes("mp4") || extension.includes("mov")
}

const MediaItem = ({
  source,
  iframe,
  title,
  imageClassName,
  scroll = false,
  href
}) => {
  const isVideo = isVideoFile(source);

  var media;

    if (iframe) {
      media = <iframe
          src={iframe}
          title={title}
          className={`${
            scroll
              ? `${carouselStyles.iframeScroll}`
              : ""
          }`}
          frameBorder="0"
          loading="lazy"
        />
      
    } else if (isVideo) {
      media = <Video
          source={source.publicURL}
          title={title}
          classes={`${imageClassName} ${mediaStyles.reel} ${
            scroll
              ? ` ${carouselStyles.scrollMedia}`
              : ""
          }`}
        />
      
    } else {
      media = <GatsbyImage
        image={getImage(source)}
        className={`${imageClassName} ${
          scroll
            ? ` ${carouselStyles.scrollMedia}`
            : ""
        }`}
        alt={title}
      />
    }
  
  if (!scroll || isVideo) return media;

  return (
    <a
      className={` ${carouselStyles.scrollPane} ${!iframe ? carouselStyles.overflowScrollY : ""}`}
      role="region"
      aria-label={`Scrollable media: ${title}`}
      tabIndex="0"
      href={href}
    >
      {media}
    </a>
  )
}

const FeaturedMedia = ({
  media,
  fallbackMedia,
  title,
  imageClassName = containerStyles.card_image,
  enableCarousel = true,
  showControls = true,
  href,
}) => {
  const mediaItems = normalizeMedia(media, fallbackMedia)
  const shouldCarousel = enableCarousel && mediaItems.length > 1
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" })

  const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  if (!mediaItems.length) return null

  if (!shouldCarousel) {
    const content = (
      <div className={containerStyles.card_landscape_inner}>
        <MediaItem
          source={mediaItems[0].source}
          iframe={mediaItems[0].iframe}
          title={title}
          imageClassName={imageClassName}
          scroll={mediaItems[0].scroll}
          href={href}
        />
      </div>
    )

    return href ? <a href={href}>{content}</a> : content
  }

  return (
    <div className={containerStyles.card_landscape_inner}>
      <div className={carouselStyles.viewport} ref={emblaRef}>
        <div className={carouselStyles.container}>
          {mediaItems.map(({ source, iframe, scroll }, index) => (
            <div
              className={carouselStyles.slide}
              key={`${source?.publicURL || iframe || title}-${index}`}
            >
              <MediaItem
                source={source}
                iframe={iframe}
                title={title}
                imageClassName={imageClassName}
                scroll={scroll}
                href={href}
              />
            </div>
          ))}
        </div>
      </div>

      {showControls && (
        <div
          className={` ${containerStyles.flex_row} ${containerStyles.flex_gap} ${containerStyles.justify_space_between} ${carouselStyles.controls} `}
        >
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
        </div>
      )}
    </div>
  )
}

export default FeaturedMedia
