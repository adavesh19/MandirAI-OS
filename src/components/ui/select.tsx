import * as React from "react"
export const Select = ({ children, name, required }: any) => <select name={name} required={required}>{children}</select>
export const SelectTrigger = ({ children }: any) => <>{children}</>
export const SelectValue = ({ placeholder }: any) => <option value="" disabled>{placeholder}</option>
export const SelectContent = ({ children }: any) => <>{children}</>
export const SelectItem = ({ children, value }: any) => <option value={value}>{children}</option>
