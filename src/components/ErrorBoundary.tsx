import React from "react"
import { Logger } from "../lib/Logger"

// logs any uncaught errors to LoggerService

export class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true }
  }

  componentDidCatch(error: any, errorInfo: any) {
    Logger.error(error)
  }

  render() {
    return this.props.children
  }
}
