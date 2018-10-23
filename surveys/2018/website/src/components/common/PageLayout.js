import React from 'react'
import Link from 'gatsby-link'
import Nav from './Nav'
import PageTitle from './PageTitle'
import Logo from './Logo'

const Spacer = () => <div className="pagelayout__spacer" />

const Close = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g id="Outline_Icons_1_">
            <g
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                id="Outline_Icons"
            >
                <line x1=".5" y1=".5" x2="23.5" y2="23.5" />
                <line x1="23.5" y1=".5" x2=".5" y2="23.5" />
            </g>
        </g>
        <rect fill="none" width="24" height="24" id="Invisible_Shape" />
    </svg>
)

const Menu = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g id="Outline_Icons_1_">
            <g id="Outline_Icons">
                <line
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    x1="19"
                    y1="5.5"
                    x2="4.043"
                    y2="5.5"
                />
                <line
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    x1="19"
                    y1="9.5"
                    x2="4.043"
                    y2="9.5"
                />
                <line
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    x1="19"
                    y1="13.5"
                    x2="4.043"
                    y2="13.5"
                />
                <line
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    x1="19"
                    y1="17.5"
                    x2="4.043"
                    y2="17.5"
                />
            </g>
        </g>
        <rect fill="none" width="24" height="24" id="Invisible_Shape" />
    </svg>
)

export default class PageLayout extends React.PureComponent {
    constructor() {
        super()
        this.state = {
            showSidebar: false
        }
    }

    openSidebar = () => {
        this.setState({
            showSidebar: true
        })
    }

    closeSidebar = () => {
        this.setState({
            showSidebar: false
        })
    }

    render() {
        const sidebarClassName = this.state.showSidebar ? 'sidebar--shown' : 'sidebar--hidden'

        return (
            <div className={`pagelayout ${sidebarClassName}`}>
                <div className="pagelayout__header">
                    <Spacer />
                    <h1 className="pagelayout__logo">
                        <Link to="/">
                            <Logo width={150} />
                        </Link>
                    </h1>
                    <Spacer />
                </div>
                <div className="pagelayout__inner">
                    <a
                        className="sidebar__toggle"
                        href="javascript:void(0)"
                        onClick={this.openSidebar}
                    >
                        <span>
                            <Menu />
                        </span>
                    </a>
                    <div className={`sidebar ${sidebarClassName}`}>
                        <a
                            className="sidebar__close"
                            href="javascript:void(0)"
                            onClick={this.closeSidebar}
                        >
                            <Close />
                        </a>
                        <Nav {...this.props} closeSidebar={this.closeSidebar} />
                    </div>
                    <div className="content">
                        <PageTitle {...this.props} />
                        {this.props.children}
                        <PageTitle {...this.props} mode="pagination" />
                    </div>
                </div>
            </div>
        )
    }
}
