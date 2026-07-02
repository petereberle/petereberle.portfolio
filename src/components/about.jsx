import * as React from "react";

import { graphql, Link, useStaticQuery } from "gatsby";

import { GatsbyImage, getImage } from "gatsby-plugin-image";

import { motion } from "framer-motion";

import SEO from "./seo";
import ContentRouterAnimation from "./partials/content-router-animation";
import FeaturedMedia from "./partials/featured-media";

import useWrapperScrollTo from "./hooks/use-wrapper-scroll-to";

import * as generalStyles from "./styles/general.module.css";
import * as containerStyles from "./styles/containers.module.css";
import * as typographyStyles from "./styles/typography.module.css";
import * as mediaStyles from "./styles/media.module.css";
import * as homeStyles from "./styles/homepage.module.css";

const MotionLink = motion(Link);

const showcaseTransition = {
  type: "spring",
  mass: 0.4,
  stiffness: 75,
  duration: 0.35,
};

const bookmarkOffset = 60;

const getSectionId = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");


const ShowcaseCard = ({ item, directory, accentClass, hash, isLast = false }) => {

  const { frontmatter, fields } = item.node;
  const title = frontmatter.title;
  const year =
    frontmatter.year ||
    (frontmatter.year_start && frontmatter.year_end
      ? frontmatter.year_start === frontmatter.year_end
        ? frontmatter.year_end
        : `${frontmatter.year_start} - ${frontmatter.year_end}`
      : frontmatter.year_end || frontmatter.year_start);
  const details = frontmatter.tagline || frontmatter.materials || frontmatter.tags?.join(', ');
  const href = `/${directory}${fields.slug}`;

  return (
    <div
      className={`${containerStyles.card_wrapper} ${containerStyles.vignette} ${accentClass} ${homeStyles.snapSection}`}
    >
      <div className={`${containerStyles.card}`}>
        <FeaturedMedia
          media={frontmatter.featured_media}
          fallbackMedia={frontmatter.featured_image}
          title={title}
          imageClassName={`${containerStyles.card_image} ${mediaStyles.contain} ${mediaStyles.contain_left}`}
          href={href}
        />
      </div>



      <div className={`${homeStyles.cardBody} ${containerStyles.flex_row} ${containerStyles.full_width} ${containerStyles.justify_space_between}`}>
        
        <div className={`${containerStyles.flex_column}`}>
          <a href={href} >
            <h4>{title}</h4>
            {details && <p>{details}</p>}
          </a>
        </div>

      {isLast ? 
        <a href={hash ? `/${directory}/#${hash}` : `/${directory}/`} className={`${containerStyles.flex_row}`}>
          
          <div className={`${generalStyles.tag} ${generalStyles._0_margin}`}>
            <h4 className={generalStyles._0_margin}>All {hash} Projects</h4>
          </div>

        </a>

      : '' }

      </div>
    </div>
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
      className={`${homeStyles.showcaseSection}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={showcaseTransition}
    >

      <div className={homeStyles.cardStack}>
        {cards.map((item, index, array) => {

            const isLast = index === array.length - 1;

            return ( <ShowcaseCard
                key={item.node.id}
                item={item}
                directory="projects"
                accentClass={``}
                hash={section.label}
                isLast={isLast}
              />
            )

          })
        }

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
              featured_media {
                iframe
                scroll
                source {
                  extension
                  publicURL
                  childImageSharp {
                    gatsbyImageData(width: 900, placeholder: BLURRED, formats: AUTO)
                  }
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
    const pageWrapper = document.getElementById("___gatsby");

    if (!pageWrapper) return;

    pageWrapper.classList.add(homeStyles.snapScrollContainer);

    return () => {
      pageWrapper.classList.remove(homeStyles.snapScrollContainer);
    };
  }, []);

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
              className={`${homeStyles.bioCard} ${homeStyles.snapSection} ${generalStyles.profile_card} ${containerStyles.grid} ${containerStyles._25_75} ${containerStyles.align_center}`}
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
                <p className={`${typographyStyles.text_justify} ${generalStyles._0_margin}`}>{`${bio_statement}`}</p>

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
              className={`${homeStyles.snapSection} ${containerStyles.align_center} ${generalStyles.profile_card}`}
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
