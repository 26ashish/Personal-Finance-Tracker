const Footer = () => {
  return (
    <footer className="bg-white shadow-inner">
      <div className="container mx-auto px-4 py-4">
        <div className="text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Personal Finance Tracker</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

