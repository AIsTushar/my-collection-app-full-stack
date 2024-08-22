function TagCloud({ tagCloud }) {
  return (
    <section className="px-12 sm:px-48 py-12 mt-12">
      <p className="text-lg text-gray-500 text-center md:text-left">Trending</p>
      <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-400" />

      <div className="flex flex-col items-center sm:gap-3 md:flex-row md:gap-2">
        <div className="flex flex-col items-center justify-start gap-2 cursor-pointer flex-1 sm:flex-row">
          <p className="text-4xl md:text-5xl font-normal">{tagCloud[0].name}</p>
          <p className="text-gray-500 text-sm">
            ({tagCloud[0]._count.items} items)
          </p>
        </div>
        <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-400 md:hidden" />
        <div className="flex flex-col items-center justify-start gap-2 cursor-pointer flex-1 sm:flex-row">
          <p className="text-4xl md:text-5xl font-normal">{tagCloud[1].name}</p>
          <p className="text-gray-500 text-sm">
            ({tagCloud[1]._count.items} items)
          </p>
        </div>
      </div>
      <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-400" />

      <div className="flex flex-col items-center sm:gap-3 md:flex-row md:gap-2">
        <div className="flex flex-col items-center justify-start gap-2 cursor-pointer flex-1 sm:flex-row">
          <p className="text-4xl md:text-5xl font-normal">{tagCloud[2].name}</p>
          <p className="text-gray-500 text-sm">
            ({tagCloud[2]._count.items} items)
          </p>
        </div>
        <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-400 md:hidden" />
        <div className="flex flex-col items-center justify-start gap-2 cursor-pointer flex-1 sm:flex-row">
          <p className="text-4xl md:text-5xl font-normal">{tagCloud[3].name}</p>
          <p className="text-gray-500 text-sm">
            ({tagCloud[3]._count.items} items)
          </p>
        </div>
      </div>
      <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-400" />
      <div className="flex flex-col items-center sm:gap-3 md:flex-row md:gap-2">
        <div className="flex flex-col items-center justify-start gap-2 cursor-pointer flex-1 sm:flex-row">
          <p className="text-4xl md:text-5xl font-normal">{tagCloud[4].name}</p>
          <p className="text-gray-500 text-sm">
            ({tagCloud[4]._count.items} items)
          </p>
        </div>
        <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-400 md:hidden" />
        <div className="flex flex-col items-center justify-start gap-2 cursor-pointer flex-1 sm:flex-row">
          <p className="text-4xl md:text-5xl font-normal">{tagCloud[5].name}</p>
          <p className="text-gray-500 text-sm">
            ({tagCloud[5]._count.items} items)
          </p>
        </div>
      </div>
      <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-400" />
    </section>
  );
}

export default TagCloud;
