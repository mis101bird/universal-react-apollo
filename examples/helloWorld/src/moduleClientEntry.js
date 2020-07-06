import clientRender from '../../../lib/clientRender'
import React from 'react'
import getModuleClient from '../../../lib/getModuleClient'

import HomeApp from './App'

const MODULE_ID = 'MODULE_1'

clientRender(<HomeApp client={getModuleClient(MODULE_ID)} />)
