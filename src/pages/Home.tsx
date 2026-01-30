import { useAuthContext } from "../context/AuthContext";

const Home: React.FC = () => {
  const { user } = useAuthContext();
  return (
    <section className="w-full px-4 sm:px-6 py-8">
      <div className="w-full">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900">
          Welcome  <span className="text-red-500 uppercase">{user?.displayName}</span> to TalkStack
        </h1>

        <p className="mt-3 text-sm sm:text-base text-neutral-600">
          Explore communities, read posts, and join discussions across your
          favorite substacks. Signal over noise. Ideas over scroll-fatigue.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <div className="btn">
            📌 Follow topics you care about
          </div>
          <div className="btn">
            ✍️ Create and publish posts
          </div>
          <div className="btn">
            💬 Join meaningful discussions
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
