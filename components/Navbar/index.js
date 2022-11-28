export default function Navbar(props) {
  return (
    <nav className="top-0 relative w-full flex flex-wrap items-center justify-between px-2 py-3 bg-slate-900 font-bold h-20">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="block static w-auto">
          <a className="text-white text-2xl uppercase leading-relaxed tracking-widest inline-block mr-4 py-2 whitespace-nowrap ">
            SI<span className="text-teal-400">LELANG</span>
          </a>
        </div>
        <div className="text-white w-auto flex flex-grow justify-between items-center text-md">
          <ul className="flex">

          </ul>
          <ul className="flex">
            <li>
                <a href="#" className="inline-block px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-400 hover:bg-white mt-4 lg:mt-0 font-normal">About</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
