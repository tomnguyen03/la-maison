export default function listenForOutsideClick(menuRef, setIsOpen) {
  if (!menuRef.current) return
  ;[`click`, `touchstart`].forEach(type => {
    document.addEventListener(`click`, evt => {
      if (menuRef.current && !menuRef.current.contains(evt.target))
        setIsOpen(false)
    })
  })
}
