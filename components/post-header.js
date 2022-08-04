import Avatar from '../components/avatar'
import DateFormatter from '../components/date-formatter'
import CoverImage from '../components/cover-image'
import PostTitle from '../components/post-title'

export default function PostHeader({ title, coverImage, date, photoDescription }) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} height={620} width={1240} />
        <p className='text-right text-slate-400 italic'>{photoDescription}</p>
      </div>
      <div className="mb-6 text-lg">
        <DateFormatter dateString={date} />
      </div>
    </>
  )
}
