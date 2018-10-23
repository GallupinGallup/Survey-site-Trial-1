import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { mapValues } from 'lodash'
import CountryBubble from '../charts/CountryBubble'
import { DIVERGENCE_COLORS } from '../../constants'
import Legends from '../elements/Legends'

const legends = [
    { label: `Lower-than-average usage`, color: DIVERGENCE_COLORS[0] },
    { label: 'Average usage', color: DIVERGENCE_COLORS[1] },
    { label: `Higher-than-average usage`, color: DIVERGENCE_COLORS[2] }
]

export default class WorldwideBlock extends Component {
    static propTypes = {
        tools: PropTypes.arrayOf(PropTypes.string).isRequired,
        countries: PropTypes.arrayOf(PropTypes.object).isRequired,
        all: PropTypes.object.isRequired
    }

    render() {
        const { countries, tools, all } = this.props

        const worldwideAverageData = {
            key: 'Worldwide average',
            ...mapValues(all, bucket => ({
                doc_count: bucket[`I've USED it before, and WOULD use it again`]
            }))
        }

        const data = countries.filter(({ key }) => key !== 'undefined')
        const lowerResponseCount = 100

        return (
            <div className="block block--chart block--worldwide">
                <div className="block__description">
                    <p>
                        Library usage by country (defined as respondents who picked “have used
                        before and would use again”). Red indicates higher compared to worldwide
                        average, blue indicates lower usage compared to worldwide average.
                    </p>
                    <p>
                        Note: only countries which received over {lowerResponseCount} total entries
                        are shown.
                    </p>
                </div>
                <Legends
                    legends={legends}
                    modifier="horizontal"
                    itemStyle={{
                        padding: '9px 0'
                    }}
                />
                <div className="worldwide__grid">
                    <div className="worldwide__grid__item">
                        <div className="worldwide__chart">
                            <CountryBubble
                                keys={tools}
                                data={worldwideAverageData}
                                showDivergence={false}
                            />
                        </div>
                        <h4 style={{ textAlign: 'center' }}>Worldwide Average</h4>
                    </div>
                    {data.map(country => (
                        <div key={country.key} className="worldwide__grid__item">
                            <div className="worldwide__chart">
                                <CountryBubble keys={tools} data={country} showDivergence={true} />
                            </div>
                            <h4 style={{ textAlign: 'center' }}>{country.key}</h4>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
