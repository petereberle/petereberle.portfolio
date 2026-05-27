import * as React from "react";

import { graphql, Link, useStaticQuery } from "gatsby";

import { GatsbyImage, getImage } from "gatsby-plugin-image";

import { motion } from "framer-motion";

import SEO from "./seo";
import ContentRouterAnimation from "./partials/content-router-animation";

import useWrapperScrollTo from "./hooks/use-wrapper-scroll-to";

import * as generalStyles from "./styles/general.module.css";
import * as containerStyles from "./styles/containers.module.css";
import * as typographyStyles from "./styles/typography.module.css";
import * as mediaStyles from "./styles/media.module.css";
import * as homeStyles from "./styles/homepage.module.css";

import Video from "./partials/video";

const MotionLink = motion(Link);

const showcaseTransition = {
  type: "spring",
  mass: 0.4,
  stiffness: 75,
  duration: 0.35,
};

const bookmarkOffset = 16;

const getSectionId = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const ShowcaseCard = ({ item, directory, accentClass, isViewAll = false, hash }) => {
  if (isViewAll) {
    return (
      <MotionLink
        to={hash ? `/${directory}/#${hash}` : `/${directory}/`}
        className={`${homeStyles.viewAllCard} ${containerStyles.flex_row} ${containerStyles.justify_center} `}
        whileHover={{ y: -4 }}
        transition={showcaseTransition}
      >
        <div className={generalStyles.tag}>
          <h4 className={generalStyles._0_margin}>All {directory === "projects" ? hash + " Projects" : "Artwork"}</h4>
        </div>
      </MotionLink>
    );
  }

  const { frontmatter, fields } = item.node;
  const title = frontmatter.title;
  const extension = frontmatter.featured_image.extension;
  const isVideo = extension.includes("mp4") || extension.includes("mov");
  const year =
    frontmatter.year ||
    (frontmatter.year_start && frontmatter.year_end
      ? frontmatter.year_start === frontmatter.year_end
        ? frontmatter.year_end
        : `${frontmatter.year_start} - ${frontmatter.year_end}`
      : frontmatter.year_end || frontmatter.year_start);
  const details = frontmatter.tagline || frontmatter.materials || frontmatter.tags?.join(', ');

  return (
    <MotionLink
      to={`/${directory}${fields.slug}`}
      className={`${containerStyles.card_wrapper} ${accentClass}`}
      whileHover={{ y: -4 }}
      transition={showcaseTransition}
    >
      <div className={containerStyles.card}>
        <div className={containerStyles.card_landscape_inner}>
          {!isVideo ? (
            <GatsbyImage
              className={`${containerStyles.card_image} ${mediaStyles.cover}`}
              image={getImage(frontmatter.featured_image)}
              alt={title}
            />
          ) : (
            <Video
              source={frontmatter.featured_image.publicURL}
              title={title}
              classes={`${containerStyles.card_image} ${mediaStyles.cover} ${mediaStyles.reel}`}
            />
          )}
        </div>
      </div>

      <div className={`${homeStyles.cardBody} ${containerStyles.flex_column} ${containerStyles.full_width} ${containerStyles.justify_start}`}>
        <h4>{title}</h4>
        {details && <p>( {details} )</p>}
      </div>
    </MotionLink>
  );
};

const ShowcaseRail = ({ bookmarks, activeBookmark, onSelect }) => {

  return (
    <div className={`${homeStyles.showcaseRail} ${containerStyles.flex_row} ${containerStyles.justify_center}`}>
      <div className={homeStyles.showcaseAnchor} />

      <div className={`${homeStyles.showcaseBookmarks} ${containerStyles.flex_column}`}>
        {bookmarks.map((bookmark) => {
          const isActive = bookmark.id === activeBookmark;

          return (
            <button
              key={bookmark.id}
              className={`${homeStyles.showcaseBookmark} ${isActive ? homeStyles.activeBookmark : ""}`}
              onClick={() => onSelect(bookmark.id)}
              type="button"
            >
              {isActive && (
                <motion.span
                  layoutId="active-bookmark"
                  className={homeStyles.activeBookmarkMarker}
                  transition={showcaseTransition}
                />
              )}
              <h4 className={typographyStyles.text_left}>{bookmark.label}</h4>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const ShowcaseTagSection = React.forwardRef(({ section }, ref) => {
  const cards = section.items.slice(0, 2);

  return (
    <motion.section
      ref={ref}
      id={section.id}
      className={homeStyles.showcaseSection}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={showcaseTransition}
    >
{/*      <div className={homeStyles.sectionHeader}>
        <div>
          <h2>{section.label}</h2>
        </div>
      </div>*/}

      <div className={homeStyles.cardStack}>
        {cards.map((item) => (
          <ShowcaseCard
            key={item.node.id}
            item={item}
            directory="projects"
            accentClass={``}
          />
        ))}

        <ShowcaseCard
          directory="projects"
          accentClass={``}
          isViewAll={true}
          hash={section.label}
        />
      </div>
    </motion.section>
  );
});

ShowcaseTagSection.displayName = "ShowcaseTagSection";

const About = ({ urlParam }) => {
  const { about, featuredProjects, websiteStatement } = useStaticQuery(graphql`
    query {
      about: markdownRemark(frontmatter: { type: { eq: "about" } }) {
        html
        frontmatter {
          title
          bio_statement
          profile {
            childImageSharp {
              gatsbyImageData(width: 800, placeholder: BLURRED, formats: AUTO)
            }
          }
        }
      }

      featuredProjects: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(projects)/" } }
        sort: { frontmatter: { year_end: DESC } }
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              tagline
              year_start
              year_end
              tags
              featured_image {
                extension
                publicURL
                childImageSharp {
                  gatsbyImageData(width: 900, placeholder: BLURRED, formats: AUTO)
                }
              }
            }
            fields {
              slug
            }
          }
        }
      }
      websiteStatement:
      markdownRemark(frontmatter: { type: { eq: "website statement" } }) {
        html
        frontmatter {
          title
        }
      }
    }
  `);

  const profileImage = getImage(about.frontmatter.profile);
  const title = about.frontmatter.title;
  const bio_statement = about.frontmatter.bio_statement;
  const aboutWebsite = websiteStatement.html;

  const tagSections = React.useMemo(() => {
    const groups = new Map();

    featuredProjects.edges.forEach((item) => {
      const tags = item.node.frontmatter.tags || [];
      tags.forEach((tag, i) => {

        if ( i === 0) {

          if (!groups.has(tag)) {
            groups.set(tag, []);
          }
          groups.get(tag).push(item);

        }

      });
    });

    return Array.from(groups.entries()).map(([tag, items]) => ({
      id: getSectionId(tag),
      label: tag,
      items,
    }));
  }, [featuredProjects.edges]);

  const bookmarks = React.useMemo(
    () => [{ id: "bio", label: "Bio" }, ...tagSections.map(({ id, label }) => ({ id, label })), { id: "about_website", label: "This Site" }],
    [tagSections]
  );

  const sectionRefs = React.useRef({});
  const [activeBookmark, setActiveBookmark] = React.useState("bio");
  const wrapperScrollTo = useWrapperScrollTo(bookmarkOffset);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries[0]?.target?.id) {
          setActiveBookmark(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-10% 0px -20% 0px",
        threshold: [0.2, 0.35, 0.55],
      }
    );

    const elements = Object.values(sectionRefs.current).filter(Boolean);
    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [bookmarks]);

  const handleBookmarkSelect = (id) => {

    const target = sectionRefs.current[id];

    if (!target) return;

    wrapperScrollTo(id === "bio" ? 0 : target);

  };

  return (
    <>
      <SEO />

      <ContentRouterAnimation urlParam={urlParam}>
        <div className={homeStyles.homepageLayout}>
          <ShowcaseRail
            bookmarks={bookmarks}
            activeBookmark={activeBookmark}
            onSelect={handleBookmarkSelect}
          />

          <div className={homeStyles.showcaseColumn}>
            <motion.aside
              ref={(element) => {
                sectionRefs.current.bio = element;
              }}
              id="bio"
              className={`${homeStyles.bioCard} ${generalStyles.profile_card} ${containerStyles.grid} ${containerStyles._25_75} ${containerStyles.align_center}`}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={showcaseTransition}
            >

            <div className={generalStyles.profile_wrapper}>
              <GatsbyImage
                style={{ position: "relative" }}
                className={`${generalStyles.profile} ${generalStyles.ellipse_clip}`}
                image={profileImage}
                alt={title}
              />
            </div>

            <div className={`${containerStyles.flex_row} ${containerStyles.align_self_start} ${containerStyles.flex_gap_2} `}>

              <div className={`${containerStyles.flex_column} ${containerStyles.flex_gap} `}>
              
                <h1 className={`${typographyStyles.text_left} ${generalStyles._0_margin}`}>{title}</h1>
                <p className={`${generalStyles._0_margin}`}>{`${bio_statement}`}</p>

              </div>

              <div
                className={`${containerStyles.grid} ${containerStyles._50_50} ${containerStyles.full_width} ${homeStyles.bioText}`}
                dangerouslySetInnerHTML={{ __html: about.html }}
              />

            </div>

            </motion.aside>

            {tagSections.map((section) => (
              <ShowcaseTagSection
                key={section.id}
                section={section}
                ref={(element) => {
                  sectionRefs.current[section.id] = element;
                }}
              />
            ))}

            <motion.aside
              ref={(element) => {
                sectionRefs.current.about_website = element;
              }}
              id="about_website"
              className={`${containerStyles.align_center} ${generalStyles.profile_card}`}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={showcaseTransition}
            >
              <h3>
                {websiteStatement.frontmatter.title}
              </h3>

              <div
                className={``}
                dangerouslySetInnerHTML={{ __html: websiteStatement.html }}
              />
            </motion.aside>


          </div>
        </div>
      </ContentRouterAnimation>
    </>
  );
};

export default About;
