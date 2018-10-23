import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import find from 'lodash/find'
import TweetWidget from '../common/TweetWidget.js'
import TwitterTimeline from '../common/TwitterTimeline.js'
import Sections from '../../../data/sections.yaml'

const TwitterBlock = props => {
    const section = find(Sections, { slug: props.section })
    const url = `http://stateofjs.com/2016/${section.slug}/`
    const text = `The State Of JavaScript: interesting survey results about ${section.name}`

    return (
        <div className={classNames('section', 'section-layout-b', props.className)}>
            <div className="section-contents-wide twitter-block">
                <h2>Join the Conversation!</h2>
                <div className="twitter-timeline-wrapper">
                    <TweetWidget
                        section={props.section}
                        text={text}
                        url={url}
                        hashtag="stateofjs"
                    />
                    <TwitterTimeline query={encodeURIComponent(url)} widgetId={section.widgetId} />
                </div>
            </div>
        </div>
    )
}

TwitterBlock.propTypes = {
    section: PropTypes.string,
    className: PropTypes.string
}

export default TwitterBlock
