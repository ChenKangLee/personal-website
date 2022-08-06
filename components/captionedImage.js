import Image from 'next/image'

export default function CaptionedImage({ src, caption, scale }) {
    return (
      <div className='place-content-center'>
        <div
          style={{
            "width": scale + "%",
            "marginLeft": "auto",
            "marginRight": "auto",
            "display": "flex",
            "justifyContent": "center"
          }}
        >
          <Image src={src} alt={caption}/>
        </div>
        <p className='text-center text-sm text-slate-600 italic'>{caption}</p>
      </div>
    )
}