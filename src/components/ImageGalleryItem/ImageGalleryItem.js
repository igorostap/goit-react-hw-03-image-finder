import { nanoid } from 'nanoid';

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
/**/
