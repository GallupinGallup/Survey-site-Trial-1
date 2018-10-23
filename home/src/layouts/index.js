import React from 'react'
import DocumentTitle from 'react-document-title'
import Helmet from 'react-helmet'

import HomeLayout from '../components/HomeLayout'
import classNames from 'classnames'

export default class Layout extends React.Component {
    render() {
        const title = DocumentTitle.peek()
        const description = 'The annual survey about current popular JavaScript technologies.'
        const url = 'http://stateofjs.com'
        const image = 'http://stateofjs.com/images/stateofjs2018-social-media.png'

        const meta = [
            { charset: 'utf-8' },
            { name: 'description', content: description },
            // responsive
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            // facebook
            { property: 'og:type', content: 'article' },
            { property: 'og:url', content: url },
            { property: 'og:image', content: image },
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
            // twitter
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:image:src', content: image },
            { name: 'twitter:title', content: title },
            { name: 'twitter:description', content: description },

        ]

        return (
            <div
                className={classNames('outer-wrapper', {
                    'home-wrapper': this.props.location.pathname === '/',
                })}
            >
                <Helmet meta={meta}>
                    <script src="//js.maxmind.com/js/apis/geoip2/v2.1/geoip2.js" type="text/javascript" />
                </Helmet>
                <link
                    href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono:300,500"
                    rel="stylesheet"
                />
                <HomeLayout {...this.props}>{this.props.children()}</HomeLayout>

            </div>
        )
    }
}

// eslint-disable-next-line no-undef
export const query = graphql`
  query AllProjects {
    allProject {
      edges {
        node {
          ...PeriodicTableFragment
        }
      }
    }
  }
`