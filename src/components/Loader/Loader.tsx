import css from "./Loader.module.css";
import { Orbit } from "@uiball/loaders";

export default function Loader() {
  return (
    <div className={css.wrapper}>
      <p className={css.text}>Loading movies, please wait...</p>
      <Orbit size={40} speed={1.5} color="#007bff" />
    </div>
  );
}
