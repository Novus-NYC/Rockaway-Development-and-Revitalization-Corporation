import { Fragment } from "react"

/** Display text split into words so each one can rise out of its own mask.
 *  The text stays ordinary text for search engines and screen readers. */
export default function Words({ text, start = 0 }: { text: string; start?: number }) {
  return (
    <>
      {text.split(/\s+/).filter(Boolean).map((word, i) => (
        <Fragment key={i}>
          {i ? " " : null}
          <span className="w">
            <span className="w__i" style={{ "--w": start + i } as React.CSSProperties}>
              {word}
            </span>
          </span>
        </Fragment>
      ))}
    </>
  )
}
