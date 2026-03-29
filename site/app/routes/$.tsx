import { useNavigate } from "@remix-run/react"
import { useEffect } from "react"

export default function CatchAll() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate("/", { replace: true })
  }, [navigate])
  return null
}
