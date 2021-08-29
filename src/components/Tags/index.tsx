import React, { useRef, useState } from "react";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import styles from "./styles.module.scss";
import TagCard from "../TagCard";
import PaperCard from "../PaperCard";
import { useData } from "../../hooks/useData";

interface TagType {
  name: string;
  color: string;
  id: string;
  isActive: boolean;
}

const Tags = () => {
  const [paperTag, setPaperTag] = useState(false);
  let tagRefs = useRef<HTMLDivElement | null>(null);

  const { tags } = useData();

  const isActiveTags = tags.reduce(
    (acc, tag) => {
      if (tag.isActive) {
        acc.available.push(tag);
      } else {
        acc.unavailable.push(tag);
      }
      return acc;
    },

    {
      available: [] as TagType[],
      unavailable: [] as TagType[],
    }
  );

  function handleBlur() {
    setPaperTag(false);
  }
  return (
    <>
      <div className={styles.tags}>
        <button
          className={styles.tags__select}
          onClick={() => setPaperTag(true)}
        >
          <LocalOfferIcon /> <span>Select Tag</span>
        </button>

        {paperTag && (
          <PaperCard
            top="3.11"
            left="0"
            handleBlur={handleBlur}
            paperRef={tagRefs}
            color="var(--blue-50)"
          >
            <div className={styles.tags__insidePaper}>
              {isActiveTags.unavailable.length > 0 ? (
                isActiveTags.unavailable.map((tag) => (
                  <TagCard
                    isActive={tag.isActive}
                    id={tag.id}
                    key={tag.id}
                    color={tag.color}
                    name={tag.name}
                    icon={false}
                  />
                ))
              ) : (
                <p className={styles.tags__info}>No tags available</p>
              )}
            </div>
          </PaperCard>
        )}

        {isActiveTags.available.map((tag) => (
          <TagCard
            key={tag.id}
            color={tag.color}
            name={tag.name}
            isActive={tag.isActive}
            id={tag.id}
          />
        ))}
      </div>
    </>
  );
};

export default Tags;
