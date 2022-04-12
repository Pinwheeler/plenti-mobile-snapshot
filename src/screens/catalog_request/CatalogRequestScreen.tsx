import React from 'react'
import {CatalogRequestProvider} from './CatalogRequestContext'
import CatalogRequestForm from './CatalogRequestForm'

const CatalogRequestScreen = () => {
  return (
    <CatalogRequestProvider>
      <CatalogRequestForm />
    </CatalogRequestProvider>
  )
}

export default CatalogRequestScreen
