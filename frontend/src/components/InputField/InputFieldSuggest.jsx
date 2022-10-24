import React from 'react'
import { Controller } from 'react-hook-form'

function InputFieldSuggest(props) {
  const { form, type, name, placeholder, accept } = props
  const {
    formState: { errors }
  } = form
  const error = errors[name]

  return (
    <div className="relative flex flex-col">
      <Controller
        name={name}
        control={form.control}
        render={({ field }) => (
          <input
            accept={accept}
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={field.onChange}
            value={form.getValues(name)}
            className={`${props.className} w-full text-sm py-2 bg-grey-f5 border-b border-grey-7 focus:outline-none `}
          />
        )}
      />
      <span className="absolute bottom-[-24px] text-[10px] text-red-ac pl-2">
        {error && error.message}
      </span>
    </div>
  )
}

export default InputFieldSuggest
