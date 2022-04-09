import { useTheme } from "@rneui/themed"
import React, { useMemo } from "react"
import { Icon } from "../Icon"

const DAYS_IN_MILLIS = 1000 * 60 * 60 * 24

interface Props {
  date: Date
}

export const StalenessIcon: React.FC<Props> = (props) => {
  const { date } = props
  const { theme } = useTheme()
  const stalenessColor = useMemo(() => {
    const staleness = new Date().getTime() - date.getTime()
    if (staleness < 7 * DAYS_IN_MILLIS) {
      return theme.colors.primary
    } else if (staleness < 30 * DAYS_IN_MILLIS) {
      return theme.colors.secondary
    } else {
      return theme.colors.error
    }
  }, [date])

  return <Icon color={stalenessColor} type={"clock"} />
}
