import React, { useContext, useEffect, useState } from "react"
import { AccountEntity } from "../api/models/Account"
import { ConnectionEntity } from "../api/models/Connection"
import { Page } from "../api/models/Page"
import { IPageable } from "../api/models/Pageable"
import { ReportModel } from "../api/models/Report"
import { AccountContext } from "./AccountContext"
import database from "@react-native-firebase/database"
import { URLS } from "../lib/DatabaseHelpers"

interface IConnectContext {
  connections: Map<string, ConnectionEntity>
  refresh(): Promise<void>
  deleteConnection(request: ConnectionEntity): Promise<void>
  offendingAccount?: AccountEntity
  setOffendingAccount: (offender: AccountEntity) => void
  reportOffendingAccount: (reason: string) => Promise<any>
}

const ConnectContext = React.createContext<IConnectContext>({} as IConnectContext)

const ConnectProvider: React.FC = (props) => {
  const { loggedInAccount, blockUser } = useContext(AccountContext)
  const [_connections, setConnectiions] = useState<ConnectionEntity[]>([])
  const [offendingAccount, setOffendingAccount] = useState<AccountEntity>()

  const blockedUsers = loggedInAccount?.blockedUsers || []
  const connections = _connections.filter((connection) => {
    return !blockedUsers.find((report) => {
      return report.blockedUserId === connection.partnerA.uid || report.blockedUserId === connection.partnerB.uid
    })
  })

  useEffect(() => {
    if (loggedInAccount) {
      const onConnectionChanged = database()
        .ref(URLS.connectionsForUser(loggedInAccount))
        .on("value", (snapshot) => {
          setConnectiions(snapshot.val())
        })
    }
  }, [])

  useEffect(() => {
    if (!loggedInAccount) {
      setConnectiions([])
    }
  }, [loggedInAccount])

  useEffect(() => {
    refresh()
  }, [loggedInAccount])

  const refresh = (): Promise<void> => {
    if (account !== undefined) {
      const pageable: IPageable = {}
      return connectionService
        .getMine(pageable)
        .then((p) => {
          const page = p as Page<ConnectionEntity>
          setConnectiions(page.content)
          return null
        })
        .catch((error) => LoggerService.instance().error(error, "fetch connections failed"))
    }
    setConnectiions([])
    return Promise.resolve(null)
  }

  const deleteConnection = (connection: ConnectionEntity) => {
    return connectionService.delete(connection).then((value) => {
      setConnectiions(_connections.filter((r) => r !== connection))
      return value
    })
  }

  const reportOffendingAccount = (reason: string) => {
    return accountService.report(offendingAccount, reason).then((report: ReportModel) => addReport(report))
  }

  const value = {
    connections,
    refresh,
    deleteConnection,
    offendingAccount,
    setOffendingAccount,
    reportOffendingAccount,
  }

  return <ConnectContext.Provider value={value}>{props.children}</ConnectContext.Provider>
}

export default ConnectContext
export { ConnectProvider, IConnectContext }
