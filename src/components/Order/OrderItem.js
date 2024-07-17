import React, { useState, useEffect } from "react";
import Image from "next/image";
import Currency from "react-currency-formatter";
import axios from "axios";

function OrderItem({ item }) {
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  useEffect(() => {
    const generateQrCode = async () => {
      try {
        const response = await axios.get("https://api.qrserver.com/v1/create-qr-code/", {
          params: {
            data: item?._id || "", // Assuming item._id is the data to encode
            size: "200x200", // Adjust the size as needed
          },
          responseType: "arraybuffer", // Ensure response type is set to arraybuffer
        });

        // Convert array buffer to base64 string
        const base64Img = Buffer.from(response.data, "binary").toString("base64");
        const imageUrl = `data:image/png;base64,${base64Img}`;
        setQrCodeUrl(imageUrl);
      } catch (err) {
        console.error("Failed to generate QR code", err);
      }
    };

    generateQrCode();
  }, [item]);

  return (
    <div className="flex sm:flex-row flex-col-reverse my-4 text-sm text-gray-700 p-6 border border-gray-200 sm:justify-between gap-6">
      <div>
        <span className="font-semibold capitalize">{item?.title}</span>
        <div className="mt-2">
          <p>
            <span>Quantity - </span>
            {item?.qty}
          </p>
          <p className="font-semibold">
            <span className="font-normal">Price - </span>
            <Currency quantity={item?.price} currency="INR" />
          </p>
        </div>
      </div>
      <div className="sm:mx-0 sm:ml-6 min-w-max my-auto mx-auto">
        <Image
          src={item?.image}
          width={120}
          height={120}
          alt=""
          objectFit="contain"
        />
        {qrCodeUrl && (
          <div className="mt-4">
            <img src={qrCodeUrl} alt="QR Code" />
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderItem;
