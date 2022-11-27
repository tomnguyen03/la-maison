import React from 'react'
import { Controller } from 'react-hook-form'

function InputField(props) {
  const { form, type, name, placeholder } = props
  const {
    formState: { errors }
  } = form
  const error = errors[name]

  return (
    <div className="flex flex-col">
      <Controller
        name={name}
        control={form.control}
        render={({ field }) => (
          <input
            type={type}
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            placeholder={placeholder}
            onChange={field.onChange}
            value={form.getValues(name)}
          />
        )}
      />
      <span className="absolute bottom-[-24px] text-[10px] text-red-500 pl-2">
        {error && error.message}
      </span>
    </div>
  )
}

export default InputField
