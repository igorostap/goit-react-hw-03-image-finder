import PropTypes from 'prop-types';

export function Button({loadmore}){
    return (
        <div className="ButtonCont">
            <button type='button' onClick={loadmore} className='Button'>Load more</button>
        </div>
    )
}
Button.propTypes={
loadmore: PropTypes.func,
}