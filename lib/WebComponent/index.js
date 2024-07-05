import WebComponent from "./WebComponent.js"
import Component from "./Component.js"
import Router from "./Router.js"

export default WebComponent

export {
  Component,
  Router,
  WebComponent // This is the default export. It is kept here for backwards compatibility.
               // @Todo: Remove it in the next major version.
}