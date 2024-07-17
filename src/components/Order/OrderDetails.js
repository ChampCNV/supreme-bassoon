import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useSession } from 'next-auth/client';
import Link from 'next/link';
import Currency from 'react-currency-formatter';
import axios from 'axios';
import QRCode from 'qrcode';
import NormalToast from '../../util/Toast/NormalToast';

function Order({ _id, id, amount_total, timestamp, items, status, admin }) {
  const [session, loading] = useSession();
  const [disabled, setDisabled] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    if (status === 'QR') {
      generateQrCode(id);
    }
  }, [status]);

  const generateQrCode = async (data) => {
    try {
      const url = await QRCode.toDataURL(data);
      setQrCodeUrl(url);
    } catch (err) {
      console.error(err);
      NormalToast('Failed to generate QR code', true);
    }
  };

  const updateStatus = (e) => {
    setDisabled(true);
    axios
      .post('/api/admin/update-order-status', {
        status: e.target.value,
        _id: _id,
      })
      .then(() => {
        setDisabled(false);
      })
      .catch((err) => {
        console.error(err);
        setDisabled(false);
      });
  };

  const cancelOrder = () => {
    setDisabled(true);
    axios
      .post('/api/cancel-order', { status: 'cancelled', _id: _id })
      .then(() => {
        NormalToast('Order cancelled');
        setDisabled(false);
      })
      .catch((err) => {
        console.error(err);
        NormalToast('Something went wrong', true);
        setDisabled(false);
      });
  };

  return (
    <div>
      <div className="w-full space-x-2">
        {admin ? (
          status && !loading && session && session?.admin ? (
            <select
              className="shadow leading-tight focus:outline-none focus:shadow-outline border xs:text-sm text-xs p-2 bg-blue-500 text-white capitalize border-b-0 rounded-t-md"
              value={status}
              disabled={disabled}
              onChange={updateStatus}
            >
              <option value="loading">Loading</option>
              <option value="QR">QR</option>
            </select>
          ) : null
        ) : status ? (
          <div
  className={`border border-b-0 xs:text-sm text-xs px-4 py-2 rounded-t-md ${
    status === 'cancelled'
      ? 'bg-red-500'
      : status !== 'delivered'
      ? 'bg-blue-500'
      : 'bg-green-500'
  } text-white inline-block capitalize`}
>
  {status}
</div>

        ) : null}
        {status && status !== 'cancelled' ? (
          <button
            className={`button-red border border-b-0 xs:text-sm text-xs px-4 py-2 rounded-t-md rounded-b-none inline-block capitalize ${
              disabled ? 'opacity-50' : ''
            }`}
            onClick={cancelOrder}
            disabled={disabled}
          >
            Cancel order
          </button>
        ) : null}
      </div>
      <Link href={`/${admin && session?.admin ? 'admin/' : ''}order-details/${_id}`}>
        <div
          className={`relative border rounded-md rounded-tl-none cursor-pointer hover:shadow-sm bg-white overflow-hidden ${
            status && status === 'cancelled' ? 'opacity-70' : ''
          }`}
          title="Click to view order details"
         > </div>
          <div className="sm:p-6 p-4 bg-gray-100 sm:text-sm text-xs text-gray-600">
            {status && status === 'cancelled' ? (
              <p className="mb-2 text-red-500">* Money will be refunded within 24 hours</p>
            ) : null}
            <p className="sm:absolute sm:top-2 sm:right-2 sm:w-56 lg:w-72 truncate text-xs whitespace-nowrap sm:mb-0 mb-2 font-medium">
              ORDER # <span className="text-green-500">{id}</span>
            </p>
            <div className="flex sm:items-center sm:gap-6 gap-1 sm:flex-row flex-col">
              <div className="flex items-center sm:gap-6 gap-4">
                <div>
                  <p className="font-bold text-xs">ORDER PLACED</p>
                  <p>{moment(timestamp).format('DD MMM YYYY')}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2  uppercase">Amount</h3>
                  <div className="text-sm text-gray-700">
                    <p>
                      <span className="font-semibold">Subtotal - </span>
                      <Currency
                        quantity={order?.amount_subtotal / 100}
                        currency="INR"
                      />
                    </p>
                    <p className="text-green-500 font-semibold">
                      <span>Shipping - </span>
                      <Currency
                        quantity={order?.total_details?.amount_shipping / 100}
                        currency="INR"
                      />
                    </p>
                    <p className="font-bold text-red-500">
                      <span className="font-semibold">Total - </span>
                      <Currency
                        quantity={order?.amount_total / 100}
                        currency="INR"
                      />
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2  uppercase">Items</h4>
                  {order?.items?.map((item) => (
                    <OrderItem item={item} key={`order-item-${item?._id}`} />
                  ))}
                </div>
                {order?.order_status?.current?.status &&
                  order?.order_status?.current?.status !== "cancelled" ? (
                  <div className="py-4">
                    <button
                      className={`button-red py-2 px-12 capitalize w-full sm:text-base text-sm ${disabled ? "opacity-50" : ""
                        }`}
                      onClick={cancelOrder}
                      disabled={disabled}
                    >
                      Cancel Order
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
           ) : (
            <Skeleton count={30} />
           )
        </div>
      </Link>
    </div>
  );
}

export default Order;
