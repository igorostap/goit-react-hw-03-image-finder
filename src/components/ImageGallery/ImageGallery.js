import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';



export default function ImageGallery({gallery,modal,totalHits,page,loadmore,isLoading}) {
   const theRest = (totalHits - page * 12);
    return (
      <div>
        <ul className="ImageGallery">
          {gallery && (
            <div className="ImageGallery">
              {gallery.map(item => (
                <ImageGalleryItem
                  key={nanoid()}
                  item={item}
                  onClick={modal}
                />
              ))}
            </div>
          )}
        </ul>
        {!isLoading && theRest > 0 && <Button loadmore={loadmore} />}
      </div>
    );
  }
ImageGallery.propTypes = {
    gallery: PropTypes.array,
    page: PropTypes.number,
    totalHits: PropTypes.number,
    loadMore: PropTypes.func,
    isLoading: PropTypes.bool,
    ьodal: PropTypes.func
}

