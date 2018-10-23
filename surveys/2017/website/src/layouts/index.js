import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'
import Helmet from 'react-helmet'
import HomeLayout from '../components/common/HomeLayout'
import PageLayout from '../components/common/PageLayout'
import classNames from 'classnames'

export default class Layout extends Component {
    render() {
        const title = DocumentTitle.peek()
        const description = 'A short survey about current popular JavaScript technologies.'
        const url = 'http://stateofjs.com'
        const image = 'http://stateofjs.com/images/javascript2017-white.png'

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

            // eslint-disable-next-line react/jsx-key
            <script src="//js.maxmind.com/js/apis/geoip2/v2.1/geoip2.js" type="text/javascript" />
        ]

        return (
            <div
                className={classNames('outer-wrapper', {
                    'home-wrapper': this.props.location.pathname === '/'
                })}
            >
                <Helmet meta={meta}>
                    <script
                        src="//js.maxmind.com/js/apis/geoip2/v2.1/geoip2.js"
                        type="text/javascript"
                    />
                </Helmet>
                <link
                    href="https://fonts.googleapis.com/css?family=Space+Mono:400,400i|Roboto+Slab:300,400,700"
                    rel="stylesheet"
                />
                {this.props.location.pathname === '/' ? (
                    <HomeLayout {...this.props}>{this.props.children()}</HomeLayout>
                ) : (
                    <PageLayout {...this.props}>{this.props.children()}</PageLayout>
                )}
            </div>
        )
    }
}
