// ** React Imports
import { Fragment, useEffect, memo } from "react"
import { StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid'

// ** Third Party Components
import classnames from "classnames"

// ** Store & Actions
import {  useDispatch, useSelector } from "react-redux"

import {
  handleContentWidth,
  handleMenuCollapsed,
  handleMenuHidden
} from "@store/layout"

// ** ThemeConfig
import themeConfig from "@configs/themeConfig"

// ** Styles
import "animate.css/animate.css"

const LayoutWrapper = (props) => {
  // ** Props
  const { children, routeMeta } = props

  // ** Store Vars
  const dispatch = useDispatch()
  const navbarStore = useSelector((state) => state.navbar)
  const layoutStored = useSelector((state) => state.layout?.layout)
  const contentWidth = useSelector((state) => state.layout?.contentWidth)
  const menuCollapsed = useSelector((state) => state.layout.menuCollapsed)
  const menuHidden = useSelector((state) => state.layout.menuHidden)
  
  //** Vars
  const appLayoutCondition =
    (layoutStored?.layout === "horizontal" && !routeMeta) ||
    (layoutStored?.layout === "horizontal" && routeMeta && !routeMeta.appLayout)
  const Tag = appLayoutCondition ? "div" : Fragment

  // ** Clean Up Function
  const cleanUp = () => {
    if (routeMeta) {
      if (
        routeMeta.contentWidth &&
        routeMeta.contentWidth === contentWidth
      ) {
        dispatch(handleContentWidth(themeConfig.layout.contentWidth))
      }
      if (
        routeMeta.menuCollapsed &&
        routeMeta.menuCollapsed === menuCollapsed
      ) {
        dispatch(handleMenuCollapsed(!menuCollapsed))
      }
      if (
        routeMeta.menuHidden &&
        routeMeta.menuHidden === menuHidden
      ) {
        dispatch(handleMenuHidden(!menuHidden))
      }
    }
  }

  useEffect(() => {
    if (routeMeta) {
      if (routeMeta.contentWidth) {
        dispatch(handleContentWidth(routeMeta.contentWidth))
      }
      if (routeMeta.menuCollapsed) {
        dispatch(handleMenuCollapsed(routeMeta.menuCollapsed))
      }
      if (routeMeta.menuHidden) {
        dispatch(handleMenuHidden(routeMeta.menuHidden))
      }
    }
    return () => cleanUp()
  }, [routeMeta])

  return (
    <StyleSheetManager shouldForwardProp={prop => isPropValid(prop)}>
    <div
      className={classnames("app-content content overflow-hidden", {
        [routeMeta ? routeMeta.className : ""]:
          routeMeta && routeMeta.className,
        "show-overlay": navbarStore?.query.length
      })}
    >
      <div className="content-overlay"></div>
      <div className="header-navbar-shadow" />
      <div
        className={classnames({
          "content-wrapper": routeMeta && !routeMeta.appLayout,
          "content-area-wrapper": routeMeta && routeMeta.appLayout,
          "container-xxl p-0": contentWidth === "boxed"
        })}
      >
        <Tag {...(appLayoutCondition ? { className: "content-body" } : {})}>
          {children}
        </Tag>
      </div>
    </div>
    </StyleSheetManager>
  )
}

export default memo(LayoutWrapper)
