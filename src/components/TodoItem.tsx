import { useState, useRef } from 'react'
import { Checkbox, IconButton } from '@carbon/react'
import { Close } from '@carbon/icons-react'

export interface Todo {
  id: string
  text: string
  done: boolean
  createdAt: number
}

interface Props {
  todo: Todo
  onToggle: (id: string) => void
  onRemove: (id: string) => void
  onEdit: (id: string, text: string) => void
}

function timeAgo(ts: number): string {
  const s = Math.floor((Date.now() - ts) / 1000)
  if (s < 60) return 'just now'
  if (s < 3600) return Math.floor(s / 60) + 'm'
  if (s < 86400) return Math.floor(s / 3600) + 'h'
  return Math.floor(s / 86400) + 'd'
}

export default function TodoItem({ todo, onToggle, onRemove, onEdit }: Props) {
  const [removing, setRemoving] = useState(false)
  const labelRef = useRef<HTMLDivElement>(null)

  const handleRemove = () => {
    setRemoving(true)
    setTimeout(() => onRemove(todo.id), 220)
  }

  const beginEdit = () => {
    const el = labelRef.current
    if (!el) return
    el.contentEditable = 'true'
    el.focus()
    const range = document.createRange()
    range.selectNodeContents(el)
    range.collapse(false)
    const sel = window.getSelection()
    sel?.removeAllRanges()
    sel?.addRange(range)
  }

  const handleBlur = () => {
    const el = labelRef.current
    if (!el) return
    el.contentEditable = 'false'
    const v = el.textContent?.trim() ?? ''
    if (!v) { handleRemove(); return }
    if (v !== todo.text) onEdit(todo.id, v)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') { e.preventDefault(); labelRef.current?.blur() }
    if (e.key === 'Escape') {
      if (labelRef.current) labelRef.current.textContent = todo.text
      labelRef.current?.blur()
    }
  }

  return (
    <li className={`item${todo.done ? ' done' : ''}${removing ? ' removing' : ''}`}>
      <Checkbox
        id={`todo-${todo.id}`}
        labelText="Mark complete"
        hideLabel
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        className="todo-checkbox"
      />
      <div
        ref={labelRef}
        className="label"
        role="textbox"
        onDoubleClick={beginEdit}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        suppressContentEditableWarning
      >
        {todo.text}
      </div>
      <span className="stamp">{timeAgo(todo.createdAt)}</span>
      <IconButton
        label="Delete"
        kind="ghost"
        size="sm"
        onClick={handleRemove}
        className="delete-btn"
      >
        <Close />
      </IconButton>
    </li>
  )
}
