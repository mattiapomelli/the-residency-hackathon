const shortcuts = [
  {
    key: "Opt + K / Alt + K",
    description: "Toggle highlighted keywords"
  },
  {
    key: "Opt + L / Alt + L",
    description: "Show commands (works only when some text is selected)"
  }
]

export function Instructions() {
  return (
    <>
      <h3 className="mb-3 text-lg font-bold">Shortcuts</h3>
      <div className="flex flex-col gap-3">
        {shortcuts.map(({ key, description }) => (
          <div key={key} className="flex items-center gap-2">
            <p className="flex-1 text-sm">
              <span className="rounded-[0.3rem] bg-[#dae5f7] px-2 py-1">
                {key}
              </span>{" "}
              : {description}
            </p>
          </div>
        ))}
      </div>
    </>
  )
}
