import React, { useMemo } from "react"
import Theme from "../../lib/Theme"
import { Icon } from "../Icon"

const DAYS_IN_MILLIS = 1000 * 60 * 60 * 24

interface Props {
  date: Date
}

export const StalenessIcon: React.FC<Props> = (props) => {
  const { date } = props
  const stalenessColor = useMemo(() => {
    const staleness = new Date().getTime() - date.getTime()
    if (staleness < 7 * DAYS_IN_MILLIS) {
      return Theme.colors.primary
    } else if (staleness < 30 * DAYS_IN_MILLIS) {
      return Theme.colors.accent
    } else {
      return Theme.colors.error
    }
  }, [date])

  return <Icon color={stalenessColor} type={"clock"} />
}
