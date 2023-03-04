import { useMutation, useQuery } from "@apollo/client"
import { useEffect } from "react"
import { ALL_BOOKS, ME } from "../queries"
const Recommended = ({ show }) => {
  const meResult = useMutation(ME)
  useEffect(() => {
    console.log(meResult.data.me)
  }, [meResult.data])

  if (!show) return

  return <h1>lol</h1>
}
export default Recommended
