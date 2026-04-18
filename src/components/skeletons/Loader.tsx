const Loader = () => {
  return (
    <div className="flex items-center justify-center gap-2 h-screen w-full">
      <div className="w-2 h-6 bg-purple-500 animate-bounce [animation-delay:-0.3s]" />
      <div className="w-2 h-6 bg-purple-500 animate-bounce [animation-delay:-0.15s]" />
      <div className="w-2 h-6 bg-purple-500 animate-bounce" />
    </div>
  )
}

export default Loader