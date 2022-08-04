
export default function Keywords({ keywords }) {
return (
    <div className="flex item-center">
        <div className='text-l font-bold'>Keywords:</div>
        <div className="text-l italic ml-2">{keywords}</div>
    </div>
    )
}
