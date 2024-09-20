"use client";

interface Data {
  media_url: string; 
  caption: string,
  media_type: string,
  comments_count: number, 
  like_count: number, 
  timestamp: string, 
  id: string
}

interface Props {
  data: Data
}

const Post: React.FC<Props> = ({data}) => {

  const dateObj = new Date(data.timestamp)

  const day = dateObj.getUTCDate();
  const month = dateObj.toLocaleString('default', { month: 'short' });
  const year = dateObj.getUTCFullYear();

  const date = `${month} ${day}, ${year}`;

  const mediaType = (data: string) => {
    switch (data) {
      case "CAROUSEL_ALBUM":
        return "Album";
      case "IMAGE":
        return "Image";
      case "VIDEO":
        return "Video";
      default:
        return "Image";
    }
  };

  return (
    <tr className="border-b">
      <td className="py-4">
      <img className="w-24 h-24 bg-gray-300" src={data.media_url} alt="A description of the image" />
      </td>
      <td className="py-4 max-w-xs">
        <p className="line-clamp-2 overflow-hidden">
          {data.caption}
        </p>
      </td>
      <td className="py-4">{date}</td>
      <td className="py-4">{mediaType(data.media_type)}</td>
      <td className="py-4">2.3k</td>
      <td className="py-4">{data.like_count}</td>
      <td className="py-4">32.6k</td>
      <td className="py-4">{data.comments_count}</td>
    </tr>
  );
};

export default Post;
