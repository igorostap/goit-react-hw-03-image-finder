import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ item, onClick }) {
  return (
    <li
      className="ImageGalleryItem"
      key={nanoid()}
      onClick={() => onClick(item)}
    >
      <img src={item.webformatURL} alt="" className="ImageGalleryItemImage" />
    </li>
  );
}
ImageGalleryItem.propTypes = {
    item: PropTypes.object,
    onClick: PropTypes.func,
}


