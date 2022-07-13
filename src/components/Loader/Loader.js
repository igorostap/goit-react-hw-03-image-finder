import { Audio } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function Loader() {
  return (
    <div className='ButtonCont'>
      <Audio height="100"
    width="100"
    color='grey'
    ariaLabel='loading'/>
    </div>
  );
}
