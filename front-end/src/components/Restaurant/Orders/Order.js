/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // Call On render
  componentDidMount() {}
  render() {
    const defaultImage =
      'https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_styleguide/bf5ff8a79310/assets/img/default_avatars/user_medium_square.png';
    const text = 'Total Bill:- ';
    return (
      <li className="lemon--li__373c0__1r9wz margin-b3__373c0__q1DuY padding-b3__373c0__342DA border--bottom__373c0__3qNtD border-color--default__373c0__3-ifU">
        <div className="lemon--div__373c0__1mboc review__373c0__13kpL sidebarActionsHoverTarget__373c0__2kfhE arrange__373c0__2C9bH gutter-2__373c0__1DiLQ grid__373c0__1Pz7f layout-stack-small__373c0__27wVp border-color--default__373c0__3-ifU">
          <div className="lemon--div__373c0__1mboc arrange-unit__373c0__o3tjT arrange-unit-grid-column--4__373c0__33Wpc border-color--default__373c0__3-ifU">
            <div className="lemon--div__373c0__1mboc margin-b1__373c0__1khoT border-color--default__373c0__3-ifU">
              <div
                className="lemon--div__373c0__1mboc border-color--default__373c0__3-ifU"
                role="region"
                aria-label="Onelia D."
              >
                <div className="lemon--div__373c0__1mboc arrange__373c0__2C9bH gutter-1__373c0__2l5bx border-color--default__373c0__3-ifU">
                  <div className="lemon--div__373c0__1mboc arrange-unit__373c0__o3tjT border-color--default__373c0__3-ifU">
                    <div className="lemon--div__373c0__1mboc border-color--default__373c0__3-ifU">
                      <div className="lemon--div__373c0__1mboc on-click-container border-color--default__373c0__3-ifU">
                        <a
                          onClick={(event) => this.props.openStaticProfile(event)}
                          className="lemon--a__373c0__IEZFH link__373c0__1G70M photo-box-link__373c0__1YC9Y link-color--blue-dark__373c0__85-Nu link-size--default__373c0__7tls6"
                          href="#"
                          target=""
                          name=""
                          rel=""
                        >
                          <img
                            className="lemon--img__373c0__3GQUb photo-box-img__373c0__35y5v"
                            src={
                              this.props.order.CustomerImageUrl !== null &&
                              this.props.order.CustomerImageUrl.length > 0
                                ? this.props.order.CustomerImageUrl
                                : defaultImage
                            }
                            srcSet={
                              this.props.order.CustomerImageUrl !== null &&
                              this.props.order.CustomerImageUrl.length > 0
                                ? this.props.order.CustomerImageUrl
                                : defaultImage
                            }
                            // src="https://s3-media0.fl.yelpcdn.com/photo/9mASYcGE_pmhSwscsapTrQ/60s.jpg"
                            // srcSet="https://s3-media0.fl.yelpcdn.com/photo/9mASYcGE_pmhSwscsapTrQ/90s.jpg 1.50x,https://s3-media0.fl.yelpcdn.com/photo/9mASYcGE_pmhSwscsapTrQ/168s.jpg 2.80x,https://s3-media0.fl.yelpcdn.com/photo/9mASYcGE_pmhSwscsapTrQ/ms.jpg 1.67x,https://s3-media0.fl.yelpcdn.com/photo/9mASYcGE_pmhSwscsapTrQ/180s.jpg 3.00x,https://s3-media0.fl.yelpcdn.com/photo/9mASYcGE_pmhSwscsapTrQ/120s.jpg 2.00x"
                            alt="Prnjay Sagar."
                            height="60"
                            width="60"
                            loading="lazy"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="lemon--div__373c0__1mboc arrange-unit__373c0__o3tjT arrange-unit-fill__373c0__3Sfw1 border-color--default__373c0__3-ifU">
                    <div className="lemon--div__373c0__1mboc user-passport-info border-color--default__373c0__3-ifU">
                      <span className="lemon--span__373c0__3997G text__373c0__2Kxyz fs-block text-color--blue-dark__373c0__1jX7S text-align--left__373c0__2XGa- text-weight--bold__373c0__1elNz">
                        <a
                          className="lemon--a__373c0__IEZFH link__373c0__1G70M link-color--inherit__373c0__3dzpk link-size--inherit__373c0__1VFlE"
                          href="/#"
                          target=""
                          name=""
                          rel=""
                          onClick={(event) => this.props.openStaticProfile(event)}
                        >
                          {/* Onelia D.*/}
                          {this.props.order.CustomerName}
                        </a>
                      </span>
                      <div className="lemon--div__373c0__1mboc responsive-hidden-small__373c0__2vDff border-color--default__373c0__3-ifU">
                        <span className="lemon--span__373c0__3997G text__373c0__2Kxyz text-color--normal__373c0__3xep9 text-align--left__373c0__2XGa- text-weight--bold__373c0__1elNz text-size--small__373c0__3NVWO">
                          {/*(Campbell, CA)*/}
                          {/*this.props.order.CustomerAddr*/}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lemon--div__373c0__1mboc arrange-unit__373c0__o3tjT arrange-unit-grid-column--8__373c0__2dUx_ border-color--default__373c0__3-ifU">
            <div className="lemon--div__373c0__1mboc margin-t1__373c0__oLmO6 margin-b1__373c0__1khoT border-color--default__373c0__3-ifU">
              <div className="lemon--div__373c0__1mboc arrange__373c0__2C9bH gutter-1__373c0__2l5bx vertical-align-middle__373c0__1SDTo border-color--default__373c0__3-ifU">
                <div
                  className="lemon--div__373c0__1mboc arrange-unit__373c0__o3tjT arrange-unit-fill__373c0__3Sfw1 border-color--default__373c0__3-ifU"
                  style={{ justifyContent: 'space-between', display: 'flex' }}
                >
                  <span className="lemon--span__373c0__3997G text__373c0__2Kxyz text-color--mid__373c0__jCeOG text-align--left__373c0__2XGa-">
                    <p>Current Status:</p>
                    {/* 8/22/2020*/}
                  </span>
                  <span className="lemon--span__373c0__3997G text__373c0__2Kxyz text-color--mid__373c0__jCeOG text-align--left__373c0__2XGa-">
                    {this.props.order.DeliveryStatus}
                    {/* 8/22/2020*/}
                  </span>
                  <span className="lemon--span__373c0__3997G text__373c0__2Kxyz text-color--mid__373c0__jCeOG text-align--left__373c0__2XGa-">
                    {new Intl.DateTimeFormat('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: '2-digit',
                    }).format(this.props.order.OrderedDate)}
                  </span>
                </div>
              </div>
            </div>
            <div className="lemon--div__373c0__1mboc margin-b2__373c0__abANL border-color--default__373c0__3-ifU">
              <p className="lemon--p__373c0__3Qnnj text__373c0__2Kxyz comment__373c0__3EKjH text-color--normal__373c0__3xep9 text-align--left__373c0__2XGa-">
                <span className="lemon--span__373c0__3997G raw__373c0__3rKqk" lang="en">
                  {/*this.props.order.OrderType*/}
                  <form
                    onSubmit={this.props.onSave}
                    className="yform signup-form  city-hidden"
                    id="signup-form"
                  >
                    <div className="js-password-meter-container">
                      <ul className="inline-layout clearfix">
                        <li style={{ width: '30%' }}>
                          <p style={{ margin: '5px' }}>Update Status</p>
                        </li>
                        <li style={{ width: '7%' }}></li>
                        <li style={{ width: '35%' }}>
                          <select
                            placeholder="countryCode"
                            className="form-control"
                            onChange={(event, id) =>
                              this.props.onStatusChangeHandler(event.target.value)
                            }
                            value={this.props.order.tmpStatusID}
                            required
                          >
                            <option className="Dropdown-menu" disabled key="1" value="1">
                              Order Received
                            </option>
                            <option
                              className="Dropdown-menu"
                              disabled={2 <= this.props.order.DeliverStatusID ? true : null}
                              key="2"
                              value="2"
                            >
                              Preparing
                            </option>
                            {this.props.order.OrderType === 'Delivery' && (
                              <option
                                className="Dropdown-menu"
                                key="3"
                                value="3"
                                disabled={3 <= this.props.order.DeliverStatusID ? true : null}
                              >
                                On the way
                              </option>
                            )}
                            {this.props.order.OrderType === 'Delivery' && (
                              <option
                                className="Dropdown-menu"
                                key="5"
                                value="5"
                                disabled={5 <= this.props.order.DeliverStatusID ? true : null}
                              >
                                Delivered
                              </option>
                            )}
                            {this.props.order.OrderType === 'Pick_up' && (
                              <option
                                className="Dropdown-menu"
                                key="4"
                                value="4"
                                disabled={4 <= this.props.order.DeliverStatusID ? true : null}
                              >
                                Pick up Ready
                              </option>
                            )}
                            {this.props.order.OrderType === 'Pick_up' && (
                              <option
                                className="Dropdown-menu"
                                key="6"
                                value="6"
                                disabled={6 <= this.props.order.DeliverStatusID ? true : null}
                              >
                                Picked up
                              </option>
                            )}
                            <option
                              className="Dropdown-menu"
                              key="7"
                              value="7"
                              disabled={
                                7 <= this.props.order.DeliverStatusID ||
                                this.props.order.DeliverStatusID === '5' ||
                                this.props.order.DeliverStatusID === '6' ||
                                this.props.order.DeliverStatusID === 5 ||
                                this.props.order.DeliverStatusID === 6
                                  ? true
                                  : null
                              }
                            >
                              Cancel Order
                            </option>
                          </select>
                        </li>
                        <li style={{ width: '8%' }}></li>
                        <li style={{ width: '20%' }}>
                          <button
                            type="submit"
                            data-ui="add-section"
                            aria-describedby="education_label"
                            className="btn btn-success"
                          >
                            Save
                          </button>
                        </li>
                      </ul>
                    </div>
                  </form>
                </span>
              </p>
            </div>
            <div className="lemon--div__373c0__1mboc margin-t1__373c0__oLmO6 margin-b1__373c0__1khoT border-color--default__373c0__3-ifU">
              <div className="lemon--div__373c0__1mboc arrange__373c0__2C9bH gutter-1__373c0__2l5bx vertical-align-middle__373c0__1SDTo border-color--default__373c0__3-ifU">
                <div
                  className="lemon--div__373c0__1mboc arrange-unit__373c0__o3tjT arrange-unit-fill__373c0__3Sfw1 border-color--default__373c0__3-ifU"
                  style={{ justifyContent: 'space-between', display: 'flex' }}
                >
                  <span className="lemon--span__373c0__3997G text__373c0__2Kxyz text-color--mid__373c0__jCeOG text-align--left__373c0__2XGa-">
                    <button
                      onClick={() => this.props.openOrderDetails()}
                      data-ui="add-section"
                      aria-describedby="education_label"
                      className="_-_-shared-ui-atoms-button-base-___button__button _-_-shared-ui-atoms-button-base-___button__small _-_-shared-ui-atoms-button-secondary-___secondary__default "
                    >
                      View Order Details
                    </button>
                  </span>
                  <span className="lemon--span__373c0__3997G text__373c0__2Kxyz text-color--mid__373c0__jCeOG text-align--left__373c0__2XGa-">
                    {text}
                    <b>{this.props.order.Bill}</b>$
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default Order;
