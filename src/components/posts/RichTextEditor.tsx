import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

type Props = {
  value: string
  onChange: (html: string) => void
}

const RichTextEditor = ({ value, onChange }: Props) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    }
  })

  if (!editor) return null

  return (
    <div className="border rounded-lg overflow-hidden bg-neutral-100">
      {/* Toolbar */}
      <div className="flex gap-2 p-2 border-b bg-neutral-100">
        <button className="w-fit p-1" onClick={() => editor.chain().focus().toggleBold().run()}>B</button>
        <button className="w-fit p-1" onClick={() => editor.chain().focus().toggleItalic().run()}>i</button>
        <button className="w-fit p-1" onClick={() => editor.chain().focus().toggleStrike().run()}>S</button>
        <button className="w-fit p-1" onClick={() => editor.chain().focus().toggleBulletList().run()}>•</button>
        <button className="w-fit p-1" onClick={() => editor.chain().focus().toggleCodeBlock().run()}>{"</>"}</button>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="text-sm h-48 outline-none px-1"
      />
    </div>
  )
}

export default RichTextEditor
