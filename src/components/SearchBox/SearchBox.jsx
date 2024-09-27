import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";
import { selectNameFilter } from "../../redux/filters/selectors";

import clsx from "clsx";
import css from "./SearchBox.module.css";

export default function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={clsx(css.container)}>
      <p className={clsx(css.text)}>Find contacts by name or number</p> {/* Підказка для користувачів */}
      <input
        className={clsx(css.input)}
        type="text"
        value={filter} // Встановлюємо значення поля вводу на основі Redux
        onChange={handleChange} // Обробник зміни значення поля вводу
        placeholder="Search by name or number" // Додано підказку для кращого розуміння
      />
    </div>
  );
}