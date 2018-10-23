import React from 'react'
import bowser from 'bowser'
import ReactGA from 'react-ga'

const getOS = () => {
    const detectedOS = []
    const osList = [
        'mac',
        'windows',
        'windowsphone',
        'linux',
        'chromeos',
        'android',
        'ios',
        'ipod',
        'ipad',
        'iphone',
        'blackberry',
        'firefoxos',
        'webos',
        'touchpad',
        'bada',
        'tizen',
        'sailfish'
    ]

    osList.forEach(os => {
        if (bowser[os]) {
            detectedOS.push(os)
        }
    })

    return detectedOS.join(',')
}

const getDevice = () => {
    const detectedDevices = []
    const deviceList = ['mobile', 'tablet']

    deviceList.forEach(device => {
        if (bowser[device]) {
            detectedDevices.push(device)
        }
    })

    if (detectedDevices.length === 0) {
        detectedDevices.push('desktop')
    }

    return detectedDevices.join(',')
}

export default class TakeSurvey extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    componentDidMount() {
        // eslint-disable-next-line no-undef
        geoip2.city(
            result => {
                console.log(result.city.names.en, result.country.names.en)
                this.setState({
                    location: result.country.names.en,
                    city: result.city.names.en
                })
            },
            error => {
                console.log(error)
            }
        )

        setTimeout(() => {
            // ga id
            if (ReactGA.ga() && ReactGA.ga().getAll) {
                this.setState({
                    gaId: ReactGA.ga()
                        .getAll()[0]
                        .get('clientId')
                })
            }
        }, 200)

        // browser data
        const browserData = {
            device: getDevice(),
            browser: bowser.name,
            version: bowser.version,
            os: getOS(),
            referrer: document.referrer // eslint-disable-line no-undef
        }
        this.setState(browserData)
    }

    render() {
        return (
            <div className="take-survey">
                <a
                    className="button large-button"
                    href={`https://stateofjs.typeform.com/to/S5iLk9?browser=${
                        this.state.browser
                    }&version=${this.state.version}&os=${this.state.os}&referrer=${
                        this.state.referrer
                    }&city=${this.state.city}&location=${this.state.location}&device=${
                        this.state.device
                    }&gaid=${this.state.gaId}`}
                >
                    Take the Survey
                </a>

                <p className="take-survey-note">
                    Note: to improve results relevance, we keep track of anonymous information such
                    as your referrer, location, device, browser, and OS.
                </p>
            </div>
        )
    }
}
