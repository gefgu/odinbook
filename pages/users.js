import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Dashboard() {
  const { data, mutate, error } = useSWR("/api/users", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  console.log(data.users);

  return <div>ABC</div>;
}
