import React from 'react'
import clone from 'lodash/clone'
import OthersTemplate from '../../components/templates/OthersTemplate'
import * as dto from '../../dto'
import buildData from '../../data/build.json'

const baseTools = dto.othersBase(buildData.experienceByUsers)
const otherTools = clone(buildData.others.buckets).reverse()

const FlavorsOthers = props => (
    <OthersTemplate
        {...props}
        base={baseTools}
        baseKeys={buildData.keys}
        others={otherTools}
        section="Flavors"
    />
)

export default FlavorsOthers
