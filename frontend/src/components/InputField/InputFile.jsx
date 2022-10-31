import React from 'react'
import { Controller } from 'react-hook-form'

function InputFile(props) {
  const { form, name, placeholder, accept } = props
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
            multiple
            accept={accept}
            type="file"
            name={name}
            placeholder={placeholder}
            onChange={field.onChange}
            value={form.getValues(name)}
            className="w-full border border-grey-9 text-sm rounded px-5 py-3 bg-white shadow-sm focus:outline-none focus:border-red-ee focus:ring-red-ee focus:ring-1"
          />
        )}
      />
      <span className="absolute bottom-[-24px] text-[10px] text-red-ac pl-2">
        {error && error.message}
      </span>
    </div>
  )
}

export default InputFile
