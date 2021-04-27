import React, { Component } from "react";
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import zoom_in from "./images/zoom-in.svg";
import zoom_out from "./images/zoom-out.svg";
import zoom_reset from "./images/zoom-reset.svg";

export default class App extends Component {
  state = {
    type: true,
    limitToBounds: true,
    panningEnabled: true,
    transformEnabled: true,
    pinchEnabled: true,
    limitToWrapper: false,
    disabled: false,
    dbClickEnabled: true,
    lockAxisX: false,
    lockAxisY: false,
    velocityEqualToMove: true,
    enableWheel: true,
    enableTouchPadPinch: true,
    enableVelocity: true,
    limitsOnWheel: false
  };
  
  toggleSetting = type => {
    this.setState(p => ({ [type]: !p[type] }));
  };
  
  renderSinglePage = (title, content, footer, bgColor, bgColorContent) => {
    return (
      <div style={{ width: '800px', height: '400px', display: 'flex', position: 'relative', flexDirection: 'column' }}>
        <div style={{
          background: bgColor,
          width: '100%',
          height: '20px',
          color: 'white',
          fontWeight: '500',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}>{title}</div>
        <div style={{ background: bgColorContent, height: '100%' }}>{content}</div>
        <div style={{
          background: bgColor,
          width: '100%',
          height: '20px',
          bottom: 0,
          left: 0,
          position: 'absolute',
          color: 'white',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}>{footer}</div>
      </div>
    );
  }
  componentRef;
  
  render() {
    const {
      limitToBounds,
      panningEnabled,
      transformEnabled,
      pinchEnabled,
      limitToWrapper,
      disabled,
      dbClickEnabled,
      lockAxisX,
      lockAxisY,
      velocityEqualToMove,
      enableWheel,
      enableTouchPadPinch,
      enableVelocity,
      limitsOnWheel
    } = this.state;
    return (
      <div className="body">
        <section>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12 order-lg-2 example">
                <ReactToPrint content={() => this.componentRef}>
                  <PrintContextConsumer>
                    {({ handlePrint }) => (
                      <button onClick={handlePrint}>Print</button>
                    )}
                  </PrintContextConsumer>
                </ReactToPrint>
                <TransformWrapper
                  options={{
                    limitToBounds,
                    transformEnabled,
                    disabled,
                    limitToWrapper
                  }}
                  pan={{
                    disabled: !panningEnabled,
                    lockAxisX,
                    lockAxisY,
                    velocityEqualToMove,
                    velocity: enableVelocity
                  }}
                  pinch={{ disabled: !pinchEnabled }}
                  doubleClick={{ disabled: !dbClickEnabled }}
                  wheel={{
                    wheelEnabled: enableWheel,
                    touchPadEnabled: enableTouchPadPinch,
                    limitsOnWheel
                  }}
                >
                  {({
                      zoomIn,
                      zoomOut,
                      resetTransform,
                      setDefaultState,
                      positionX,
                      positionY,
                      scale,
                      previousScale,
                      options: { limitToBounds, transformEnabled, disabled },
                      ...rest
                    }) => (
                    <React.Fragment>
                      <div className="tools">
                        <div className="spacer"/>
                        <button
                          className="btn-gradient cyan small"
                          onClick={zoomIn}
                          data-testid="zoom-in-button"
                        >
                          <img src={zoom_in} alt=""/>
                        </button>
                        <button
                          className="btn-gradient blue small"
                          onClick={zoomOut}
                          data-testid="zoom-out-button"
                        >
                          <img src={zoom_out} alt=""/>
                        </button>
                        <button
                          className="btn-gradient purple small"
                          onClick={resetTransform}
                          data-testid="reset-button"
                        >
                          <img src={zoom_reset} alt=""/>
                        </button>
                      </div>
                      <div className="element">
                        <TransformComponent>
                          <div style={{
                            width: window.innerWidth - 60,
                            height: window.innerHeight - 100,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                               ref={el => (this.componentRef = el)}
                          >
                            {this.renderSinglePage('page1header', 'contentcontentcontent', 'page1footer', '#AB2B70', '#FAFAFA')}
                            {this.renderSinglePage('page2header', 'contentcontentcontent', 'page2footer', '#702758', '#F6F6F6')}
                            {this.renderSinglePage('page3header', 'contentcontentcontent', 'page3footer', '#AB2B70', '#FAFAFA')}
                            {this.renderSinglePage('page4header', 'contentcontentcontent', 'page4footer', '#702758', '#F6F6F6')}
                            {this.renderSinglePage('page5header', 'contentcontentcontent', 'page5footer', '#AB2B70', '#FAFAFA')}
                            {this.renderSinglePage('page6header', 'contentcontentcontent', 'page6footer', '#702758', '#F6F6F6')}
                          </div>
                        </TransformComponent>
                      </div>
                      <div className="info">
                        <h3>State</h3>
                        <h5>
                          <span className="badge badge-secondary">
                            Position x : {positionX}px
                          </span>
                          <span className="badge badge-secondary">
                            Position y : {positionY}px
                          </span>
                          <span className="badge badge-secondary">
                            Scale : {scale}
                          </span>
                          <span className="badge badge-secondary">
                            Previous scale : {previousScale}
                          </span>
                        </h5>
                      </div>
                      <div className="functions">
                        <h3>Functions</h3>
                        <h6>
                          <button
                            className={
                              "btn-gradient grey small" +
                              (disabled ? " active" : "")
                            }
                            onClick={() => this.toggleSetting("disabled")}
                          >
                            <span/> Disable
                          </button>
                          <button
                            className={
                              "btn-gradient grey small" +
                              (limitToBounds ? " active" : "")
                            }
                            onClick={() => this.toggleSetting("limitToBounds")}
                          >
                            <span/> Limit bounds
                          </button>
                          <button
                            className={
                              "btn-gradient grey small" +
                              (limitToWrapper ? " active" : "")
                            }
                            onClick={() => this.toggleSetting("limitToWrapper")}
                          >
                            <span/> Limit to wrapper bounds
                          </button>
                          <button
                            className={
                              "btn-gradient grey small" +
                              (!rest.pan.disabled ? " active" : "")
                            }
                            onClick={() => this.toggleSetting("panningEnabled")}
                          >
                            <span/> Enable panning
                          </button>
                          <button
                            className={
                              "btn-gradient grey small" +
                              (!rest.pinch.disabled ? " active" : "")
                            }
                            onClick={() => this.toggleSetting("pinchEnabled")}
                          >
                            <span/> Enable pinch
                          </button>
                          <button
                            className={
                              "btn-gradient grey small" +
                              (transformEnabled ? " active" : "")
                            }
                            onClick={() =>
                              this.toggleSetting("transformEnabled")
                            }
                          >
                            <span/> Enable transform
                          </button>
                          <button
                            className={
                              "btn-gradient grey small" +
                              (!rest.doubleClick.disabled ? " active" : "")
                            }
                            onClick={() => this.toggleSetting("dbClickEnabled")}
                          >
                            <span/> Double click
                          </button>
                          <button
                            className={
                              "btn-gradient grey small" +
                              (rest.pan.lockAxisX ? " active" : "")
                            }
                            onClick={() => this.toggleSetting("lockAxisX")}
                          >
                            <span/> Lock X axis
                          </button>
                          <button
                            className={
                              "btn-gradient grey small" +
                              (rest.pan.lockAxisY ? " active" : "")
                            }
                            onClick={() => this.toggleSetting("lockAxisY")}
                          >
                            <span/> Lock Y axis
                          </button>
                          <button
                            className={
                              "btn-gradient grey small" +
                              (rest.pan.velocityEqualToMove ? " active" : "")
                            }
                            onClick={() =>
                              this.toggleSetting("velocityEqualToMove")
                            }
                          >
                            <span/> Velocity time based on move
                          </button>
                          <button
                            className={
                              "btn-gradient grey small" +
                              (rest.pan.velocity ? " active" : "")
                            }
                            onClick={() => this.toggleSetting("enableVelocity")}
                          >
                            <span/> Enable velocity
                          </button>
                          <button
                            className={
                              "btn-gradient grey small" +
                              (rest.wheel.wheelEnabled ? " active" : "")
                            }
                            onClick={() => this.toggleSetting("enableWheel")}
                          >
                            <span/> Enable wheel
                          </button>
                          <button
                            className={
                              "btn-gradient grey small" +
                              (rest.wheel.touchPadEnabled ? " active" : "")
                            }
                            onClick={() =>
                              this.toggleSetting("enableTouchPadPinch")
                            }
                          >
                            <span/> Enable touch pad pinch
                          </button>
                          <button
                            className={
                              "btn-gradient grey small" +
                              (rest.wheel.limitsOnWheel ? " active" : "")
                            }
                            onClick={() => this.toggleSetting("limitsOnWheel")}
                          >
                            <span/> Bound limits on wheel
                          </button>
                        </h6>
                      </div>
                    </React.Fragment>
                  )}
                </TransformWrapper>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
