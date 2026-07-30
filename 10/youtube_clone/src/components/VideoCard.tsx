interface Props {
  title: string;
  description: string;
}

function VideoCard({ title, description }: Props) {
  return (
    <div>
      VideoCard
      <div>{title}</div>
      <p>{description}</p>
    </div>
  )
}

export default VideoCard