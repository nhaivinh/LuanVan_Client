import { Slide } from "react-slideshow-image";

import slideImages from "./images";

import "react-slideshow-image/dist/styles.css";
import styles from "./Slider.module.css";

export default function Slider() {
  return (
    <div className={styles.container}>
      <Slide easing="ease">
        {slideImages.map((slide, index) => {
          return (
            <div className={styles.slide} key={slide}>
              <div style={{ backgroundImage: `url(${slideImages[index]})` }}>
              </div>
            </div>
          );
        })}
      </Slide>
    </div>
  );
}
