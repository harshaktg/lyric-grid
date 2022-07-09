function Navbar() {
  return (
    <div className="bg-white h-20 flex items-center shadow-navbar">
      <nav className="mx-15 flex justify-between w-full">
        <span className="font-semibold text-2xl text-primary-color">
          React Data Grid
        </span>
        <div className="bg-primary-color w-[30px] h-[30px] bg-opacity-20 rounded-full flex items-center justify-center">
          <span className="text-primary-color text-sm font-semibold">CB</span>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
