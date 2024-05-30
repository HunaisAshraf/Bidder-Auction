export default function Auction() {
  return (
    <div className="mx-6 md:mx-16 lg:mx-32 min-h-[91vh] mt-2 md:mt-5">
      <div className="flex items-center justify-between">
        <h1 className="text-gray-500 text-xl md:text-3xl font-bold">
          Live <span className="text-[#231656]">Auction</span>
        </h1>
        <div className="flex">
          <input
            className="outline-none shadow-md px-4 py-2 rounded-l-full w-[200px] md:w-[400px]"
            placeholder="Search..."
            type="text"
          />
          <button className="bg-[#231656] text-white py-2 px-4 rounded-r-full font-semibold">
            search
          </button>
        </div>
      </div>
    </div>
  );
}
