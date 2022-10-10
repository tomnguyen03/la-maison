import React from 'react'
import { Controller } from 'react-hook-form'

function InputField(props) {
  const { form, type, name, placeholder, accept } = props
  const {
    formState: { errors }
  } = form
  const error = errors[name]

  return (
    <div className="relative flex flex-col mt-3">
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
            className="w-full border border-grey-9 text-sm rounded mt-4 px-5 py-3 bg-white shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-red-ee focus:ring-red-ee focus:ring-1"
          />
        )}
      />
      <span className="absolute bottom-[-24px] text-[10px] text-red-ac pl-2">
        {error && error.message}
      </span>
    </div>
  )
}

export default InputField
