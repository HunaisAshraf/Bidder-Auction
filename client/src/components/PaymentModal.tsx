"use client";

import React, { ChangeEvent, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { loadStripe } from "@stripe/stripe-js";
import {PaymentElement,CardElement} from "@stripe/react-stripe-js"

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type FormValues = {
  amount: number;
};

export default function PaymentModal() {
  // {
  //   setChange,
  //   change,
  // }: {
  //   setChange: React.Dispatch<React.SetStateAction<boolean>>;
  //   change: boolean;
  // }
  const [images, setImages] = useState<File[]>([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState<number>();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState,
    getValues,
    setError,
    clearErrors,
  } = useForm<FormValues>();
  const { errors } = formState;

  const addPayment = async (formData: FormValues) => {
    try {
      console.log(formData,process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
      // const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

      // const result = stripe?.redirectToCheckout()
    } catch (error) {
      console.log(error);
    }
  };

  //   const addAuction = async (formValue: FormValues) => {
  //     try {
  //       setLoading(true);

  //       const { data } = await axios.post("/api/s3-upload", formValue, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       });

  //       if (data.success) {
  //         const auction = {
  //           itemName: formValue.name,
  //           basePrice: formValue.price,
  //           description: formValue.description,
  //           startDate: formValue.startDate,
  //           endDate: formValue.endDate,
  //           images: data.uploadedImage,
  //         };

  //         const response = await axiosInstance.post(
  //           "/api/auction/add-auction",
  //           auction
  //         );

  //         if (response?.data?.success) {
  //           setLoading(false);
  //           handleClose();
  //           setChange(!change);
  //           router.push("/profile/auctions");
  //         } else {
  //           setLoading(false);
  //           toast.error("failed to add auction");
  //         }
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       setLoading(false);
  //       toast.error("failed to add auction");
  //     }
  //   };
  //   const handleDelete = async (image: any) => {
  //     const filteredImage = images.filter((img) => img !== image);
  //     setImages(filteredImage);

  //     const transferData = new DataTransfer();

  //     filteredImage.forEach((img) => transferData.items.add(img));
  //     (document.getElementById("image") as HTMLInputElement).files =
  //       transferData.files;
  //   };

  //   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //     const files = e.target.files;
  //     if (files && files.length > 3) {
  //       setError("images", {
  //         type: "max",
  //         message: "only three image should be uploaded",
  //       });
  //     } else if (files) {
  //       clearErrors("images");
  //       setImages(Array.from(files));
  //       console.log(images);
  //     }
  //   };

  return (
    <div>
      <div>
        <Toaster />
        <Button
          onClick={handleOpen}
          className="bg-[#231656] text-white font-semibold px-3 py-2 rounded-full mt-4 hover:bg-[#201744]"
        >
          Add Amount <ArrowForwardIcon />
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit(addPayment)}>
              <h1 className="text-gray-600 font-semibold text-2xl mb-3">
                Add Amount
              </h1>
              <input
                type="number"
                className="outline-none text-gray-600 w-full border px-3 py-2"
                placeholder="$ enter the amount"
                value={amount}
                {...register("amount", {
                  required: "enter the amount",
                  min: {
                    value: 10,
                    message: "Add minimum of 10",
                  },
                })}
              />
{/* <CardElement /> */}
              <PaymentElement />
              
              <p className="text-red-500"> {errors.amount?.message}</p>
              <button className="bg-[#231656] text-white font-semibold px-3 py-2 rounded-full mt-4">
                Add Amount
              </button>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
