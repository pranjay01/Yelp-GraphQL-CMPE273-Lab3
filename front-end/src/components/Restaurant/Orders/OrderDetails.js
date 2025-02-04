import React, { Component } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { connect } from 'react-redux';

class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          label: 'Food Item',
          field: 'name',
          sort: 'asc',
        },
        {
          label: 'Count',
          field: 'count',
          sort: 'asc',
        },
        {
          label: 'Price per Unit',
          field: 'price',
          sort: 'asc',
        },
        {
          label: 'Total Price',
          field: 'totalPrice',
          sort: 'asc',
        },
      ],
    };
  }
  handleClick = () => {
    this.props.toggle();
  };
  render() {
    let TopStyle = this.props.modeTop;
    return (
      <div className="modal" style={{ top: '0', left: '0', width: '100%', height: '100%' }}>
        <div
          className="modal_content"
          style={{ top: `${TopStyle}`, left: '20%', width: '60%', height: '70%' }}
        >
          <span className="close" onClick={this.handleClick}>
            &times;{' '}
          </span>
          <MDBTable scrollY maxHeight="100%" striped>
            <MDBTableHead columns={this.state.columns} />
            <MDBTableBody rows={this.props.orderStore.orderDetails} />
          </MDBTable>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { orderStore } = state.orderStoreReducer;
  return {
    orderStore,
  };
};

export default connect(mapStateToProps, null)(OrderDetails);

// export default OrderDetails;
