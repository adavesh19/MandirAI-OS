import * as React from "react"
export const Table = ({ children }: any) => <table>{children}</table>
export const TableHeader = ({ children }: any) => <thead>{children}</thead>
export const TableBody = ({ children }: any) => <tbody>{children}</tbody>
export const TableRow = ({ children }: any) => <tr>{children}</tr>
export const TableHead = ({ children, className }: any) => <th className={className}>{children}</th>
export const TableCell = ({ children, className, colSpan }: any) => <td className={className} colSpan={colSpan}>{children}</td>
