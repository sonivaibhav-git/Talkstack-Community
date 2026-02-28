const Footer = () => {
  return (
    <footer className="sticky top-full py-2 w-full h-fit bg-neutral-100 border-t-2 border-neutral-300 text-center text-xs text-neutral-900">
      © {new Date().getFullYear()} Talkstack. All rights reserved.
    </footer>
  )
}

export default Footer
