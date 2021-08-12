import React, { useRef, useState } from "react";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import styles from "./styles.module.scss";
import TagCard from "../TagCard";
import PaperCard from "../PaperCard";

const Tags = () => {
  const [paperTag, setPaperTag] = useState(false);
  let tagRefs = useRef<HTMLDivElement | null>(null);

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
              <TagCard color="#8B18D1" icon={false} />
              <TagCard color="#3399AF" icon={false} />
              <TagCard color="#D03737" icon={false} />
              <TagCard color="#C2D118" icon={false} />
            </div>
          </PaperCard>
        )}

        <TagCard color="#8B18D1" />
        <TagCard color="#3399AF" />
        <TagCard color="#D03737" />
        <TagCard color="#C2D118" />
        <TagCard color="#33AF47" />
        <TagCard color="#D18718" />
        <TagCard color="#18D183" />
        <TagCard color="#3350B9" />
      </div>
    </>
  );
};

export default Tags;
