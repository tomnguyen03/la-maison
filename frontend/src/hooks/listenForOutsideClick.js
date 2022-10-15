export default function listenForOutsideClick(menuRef, setIsOpen) {
  if (!menuRef.current) return
  ;[`click`, `touchstart`].forEach(type => {
    document.addEventListener(`click`, evt => {
      const cur = menuRef.current
      const node = evt.target
      if (cur.contains(node)) return
      setIsOpen(false)
    })
  })
}
