
export function Button({loadmore}){
    return (
        <div>
            <button type='button' onClick={loadmore} className='Button'>Load more</button>
        </div>
    )
}