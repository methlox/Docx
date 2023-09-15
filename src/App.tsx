// import React, { useState } from "react";
// import { Editor } from "slate-react";
// import { Value } from "slate";

// const initialValue = Value.fromJSON({
//   document: {
//     nodes: [
//       {
//         object: "block",
//         type: "paragraph",
//         nodes: [
//           {
//             object: "text",
//             leaves: [
//               {
//                 text: "A line of text in a paragraph."
//               }
//             ]
//           }
//         ]
//       }
//     ]
//   }
// } as any);

// const App = () => {
//   const [value, setValue] = useState(initialValue);

//   return <Editor value={value} onChange={opts => setValue(opts.value)} />;
// };

// export default App;

// Import React dependencies.
import { useMemo, useState } from 'react'
// Import the Slate editor factory.
import { createEditor } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'

// TypeScript users only add this code
import { BaseEditor, Descendant } from 'slate'
import { ReactEditor } from 'slate-react'

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

// Define our app...
const App = () => {

  const initialValue: CustomElement[] = [
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]

  const [editor] = useState(() => withReact(createEditor()))
  const [value, setValue] = useState(initialValue)
  return (
    <Slate
      editor={editor}
      initialValue={value}
      onChange={opts => setValue(opts)}
    >
      <Editable />
    </Slate>
  )
}

export default App;