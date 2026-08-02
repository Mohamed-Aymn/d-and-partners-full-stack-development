import { useQuery } from "@tanstack/react-query";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: { likes: number; dislikes: number };
  views: number;
}

interface PostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

// 0. don't forget to visit main.tsx for step zero
// 1. Separate fetch function
const fetchPosts = async (): Promise<PostsResponse> => {
  const response = await fetch("https://dummyjson.com/posts");
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};

function ServerState() {
  // 2. Use useQuery hook
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error loading posts: {error.message}</div>;

  return (
    <div>
      <h1>Working Fetch</h1>
      {data.posts.map((item) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  )
}

export default ServerState