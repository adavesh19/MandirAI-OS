import * as React from "react"
export const Dialog = ({ children, open, onOpenChange }: any) => { return open ? <div>{children}</div> : null }
export const DialogTrigger = ({ children, asChild }: any) => <>{children}</>
export const DialogContent = ({ children }: any) => <div>{children}</div>
export const DialogHeader = ({ children }: any) => <div>{children}</div>
export const DialogTitle = ({ children }: any) => <h2>{children}</h2>
