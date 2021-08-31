import { url } from "inspector";
import React, { useEffect, useState } from "react";
import Started from "../../utils/gettingStarted";
import styles from "./styles.module.scss";

import CircularProgress from "@material-ui/core/CircularProgress";

interface StartedType {
  title: string;
  cover: string;
  icon: string;
  text: string;
}

const GettingStarted = () => {
  const [started, setStarted] = useState({} as StartedType);

  useEffect(() => {
    const getStart = async () => {
      const gettingStarted = new Started();
      const data = await gettingStarted.getGettingStarted();

      setStarted(data as StartedType);
    };

    getStart();
  }, []);

  return (
    <div className={styles.gettingstarted}>
      {started.title ? (
        <>
          <header>
            <img src={started.cover} alt="cover" />
          </header>
          <div className={styles.gettingstarted__body}>
            <img src={started.icon} alt="waving hand" />
            <h1>{started.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: started.text }} />
          </div>
        </>
      ) : (
        <div className={styles.gettingstarted__progress}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default GettingStarted;
