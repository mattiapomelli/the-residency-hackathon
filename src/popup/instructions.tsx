// const shortcuts = [
//   {
//     key: "Opt + E / Alt + E",
//     description: "Toggle focus mode"
//   }
//   // {
//   //   key: "Opt + L / Alt + L",
//   //   description: "Show commands (works only when some text is selected)"
//   // }
// ]

export function Instructions() {
  return (
    <div className="rounded-md border p-4">
      <h3 className="mb-2 text-lg font-bold">Instructions</h3>
      <p className="text-sm">
        Use the shortcut{" "}
        <span className="rounded-[0.3rem] bg-[#dae5f7] px-2 py-1">
          Opt + E / Alt + E
        </span>{" "}
        to activate the extension on any online article.
      </p>
    </div>
  )
}
